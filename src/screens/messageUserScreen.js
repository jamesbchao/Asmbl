import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ActivityIndicator, Keyboard, KeyboardAvoidingView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';

/* Queries */
import { createConversation, createMessage, updateConversation } from '../graphql/mutations';
import { conversationByUsers, messagesByConversation, getUser, getConversation } from '../graphql/queries';

/* Components */
import BasicHeader from '../components/BasicHeader';
import Message from '../components/Message';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import GlobalStyles from '../styles/GlobalStyles.component.style';
import Input from '../styles/Input.component.style';
import MessageStyle from '../styles/MessageStyle.component.style';

/* Icons */
import SendIcon from '../../assets/images/sendIcon';
import ForwardIcon from '../../assets/images/forwardButton';

const { width, height } = Dimensions.get('window');

export default function MessageUserScreen({ navigation, route }) {

    let { userID } = route.params;

    const ref = useRef();     

    const [currentUserID, setCurrentUserID] = useState('');
    const [friend, setFriend] = useState(null);
    const [messages, setMessages] = useState(null);
    const [conversationID, setConversationID] = useState('');
    const [isSender, setIsSender] = useState(true);
    const [previousDates, setPreviousDates] = useState([]);

    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConversation();
    }, []);

    const fetchConversation = async() => {

        let fd = await API.graphql(graphqlOperation(getUser, { id: userID }));
        let f = fd.data.getUser;

        let finfo = {
            id: f.id,
            profile_picture: f.profile_picture,
            username: f.user_name,
            name: f.first_name + ' ' + f.last_name
        }
        setFriend(finfo);

        let user = await getCurrentUser();
        setCurrentUserID(user.id);
        let cd = await API.graphql(graphqlOperation(conversationByUsers, { senderID: user.id, recipientID: { eq: userID }}));
        let cd2 = await API.graphql(graphqlOperation(conversationByUsers, { senderID: userID, recipientID: { eq: user.id }}));

        if (cd.data.conversationByUsers.items[0]) {
            setConversationID(cd.data.conversationByUsers.items[0].id);
            
            let md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: cd.data.conversationByUsers.items[0].id, sortDirection: 'ASC'}));
            let mo = md.data.messagesByConversation.items;

            let arr = [];
            arr = await Promise.all(mo.map(m => {
                return m;
            }));

            setMessages([...arr]);

            setLoading(false);
            setTimeout(() => ref?.current?.scrollToEnd(), 50);
            return;
        }

        if (cd2.data.conversationByUsers.items[0]) {
            setIsSender(false);
            setConversationID(cd2.data.conversationByUsers.items[0].id);

            let md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: cd2.data.conversationByUsers.items[0].id, sortDirection: 'ASC'}));
            let mo = md.data.messagesByConversation.items;

            let arr = [];
            arr = await Promise.all(mo.map(m => {
                return m;
            }));

            setMessages([...arr]);

            setLoading(false);
            setTimeout(() => ref?.current?.scrollToEnd(), 50);

            return;
        }

        try {
            let conversationInfo = {
                senderID: user.id,
                recipientID: userID,
                senderNewMessages: false,
                recipientNewMessages: false,
            }
            let createdConversation = await API.graphql(graphqlOperation(createConversation, { input: conversationInfo }));
            console.log(createdConversation);
            setConversationID(createdConversation.data.createConversation.id);
            setLoading(false);
        } catch (err) {
            console.log('error creating conversation: ', err);
        }

    }

    const handleSubmit = async() => {

        let msgarr = [];
        if (messages) msgarr = messages;
        let now = new Date();
        msgarr.push({createdAt: now, sender: currentUserID, content: input});
        setMessages([...msgarr]);


        let messageInfo = {
            sender: currentUserID,
            conversationID: conversationID,
            content: input,
        }
        setInput('');

        let createdMessage = await API.graphql(graphqlOperation(createMessage, { input: messageInfo }));
        console.log('created message: ', createdMessage);

        let conversationInfo = {
            id: conversationID,
        }

        if (isSender) conversationInfo.recipientNewMessages = true;
        else conversationInfo.senderNewMessages = true;

        let updatedConversation = await API.graphql(graphqlOperation(updateConversation, { input: conversationInfo }));
        console.log('updated conversation: ', updatedConversation);


        fetchConversation();
    }

    const renderMessage = ({ item }) => {
        return <Message message={item} previousDates={previousDates} setPreviousDates={setPreviousDates} recipientID={userID} />
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='New Message' />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "null"} enabled>
                        <BasicHeader name="New Message" />
                        <View style={{flex: 2.5}}>
                        <TouchableOpacity style={MessageStyle.friendContainer} onPress={() => navigation.navigate('UserProfileScreen', { username: friend.username })}>
                            <View style={MessageStyle.infoContainer}>
                                <Image source={{uri: friend.profile_picture}} style={MessageStyle.profilePicture} />
                                <View style={MessageStyle.bioContainer}>
                                    <Text style={MessageStyle.boldText}>{friend.name}</Text>
                                    <Text style={MessageStyle.boldText}>@{friend.username}</Text>
                                </View>
                                <ForwardIcon />
                            </View>
                        </TouchableOpacity>
                        {messages && 
                                <FlatList 
                                    style={{flex: 1}}
                                    ref={ref} 
                                    data={messages} 
                                    initialScrollIndex={messages.length - 1} 
                                    onScrollToIndexFailed={() => {}}
                                    renderItem={renderMessage} 
                                    keyExtractor={(item, index) => index}
                                    onContentSizeChange={() => {
                                        ref?.current?.scrollToEnd();
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={val => setInput(val)}
                                value={input}
                                placeholder='Type your message here...'
                                returnKeyType="done"
                                multiline={true}
                                blurOnSubmit={true}
                                textAlignVertical='top'
                                onFocus={() => setTimeout(() => ref?.current?.scrollToEnd(), 50)}
                            />
                            <TouchableOpacity style={styles.iconContainer} onPress={() => {
                                Keyboard.dismiss();
                                handleSubmit()
                            }}>
                                <SendIcon />
                            </TouchableOpacity>
                        </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height * 0.42
    },
    inputContainer: {
        height: height * 0.2,
        width: width * 0.9,
        alignSelf: 'center',
        marginBottom: height * 0.01,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: width * 0.02
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        //marginTop: 10,
        marginBottom: height * 0.1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: height * 0.2,
        width: width * 0.9,
        alignSelf: 'center'
    },
})