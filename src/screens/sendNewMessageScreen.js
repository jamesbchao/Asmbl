import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Keyboard, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Queries */
import { createConversation, createMessage, updateConversation } from '../graphql/mutations';
import { conversationByUsers, messagesByConversation, getUser, getConversation, friendshipByFriend, friendshipByUser,  } from '../graphql/queries';

/* Components */
import BasicHeader from '../components/BasicHeader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import GlobalStyles from '../styles/GlobalStyles.component.style';
import Input from '../styles/Input.component.style';
import MessageStyle from '../styles/MessageStyle.component.style';
import Notification from '../styles/Notification.component.style';


/* Icons */
import SendIcon from '../../assets/images/sendIcon';
import ForwardIcon from '../../assets/images/forwardButton';
import BlockedUserIcon from '../../assets/images/blockedUserIcon';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function SendNewMessageScreen({ navigation }) {

    const ref = useRef();     

    const [currentUserID, setCurrentUserID] = useState('');
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState(null);
    const [conversationID, setConversationID] = useState('');
    const [isSender, setIsSender] = useState(true);
    const [previousDates, setPreviousDates] = useState([]);
    const [chooseRecipient, setChooseRecipient] = useState(false);
    const [userChosen, setUserChosen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    const [input, setInput] = useState('');

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async() => {
        const userObj = await getCurrentUser();
        const id = userObj.id;

        const friendDataFriend = await API.graphql(graphqlOperation(friendshipByFriend, { friendID: id, sortDirection: 'DESC' }));
        const friendDataUser = await API.graphql(graphqlOperation(friendshipByUser, { userID: id, sortDirection: 'DESC' }));
        let friendObjFriend = friendDataFriend.data.friendshipByFriend.items;
        let friendObjUser = friendDataUser.data.friendshipByUser.items;

        let arr = [];
        friendObjFriend = await Promise.all(friendObjFriend.map(async(friend) => {
            let userData = await API.graphql(graphqlOperation(getUser, { id: friend.userID }));
            let userObj = userData.data.getUser;
            let userInfo = {
                id: userObj.id,
                profile_picture: userObj.profile_picture,
                user_name: userObj.user_name,
                first_name: userObj.first_name,
                last_name: userObj.last_name,
                bio: userObj.bio,
            }
            arr.push(userInfo);
        }));

        friendObjUser = await Promise.all(friendObjUser.map(async(friend) => {
            let userData = await API.graphql(graphqlOperation(getUser, { id: friend.friendID }));
            let userObj = userData.data.getUser;
            let userInfo = {
                id: userObj.id,
                profile_picture: userObj.profile_picture,
                user_name: userObj.user_name,
                first_name: userObj.first_name,
                last_name: userObj.last_name,
                bio: userObj.bio,
            }
            arr.push(userInfo);
        }));

        setFriends(arr);
        setLoading(false);

    }

    const fetchConversation = async(userID) => {
        console.log('friend : ', user);
        console.log('userID: ', userID)

        let userObj = await getCurrentUser();
        setCurrentUserID(userObj.id);
        let cd = await API.graphql(graphqlOperation(conversationByUsers, { senderID: userObj.id, recipientID: { eq: userID }}));
        let cd2 = await API.graphql(graphqlOperation(conversationByUsers, { senderID: userID, recipientID: { eq: userObj.id }}));

        if (cd.data.conversationByUsers.items[0]) {
            setConversationID(cd.data.conversationByUsers.items[0].id);
            
            let md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: cd.data.conversationByUsers.items[0].id, sortDirection: 'ASC'}));
            let mo = md.data.messagesByConversation.items;

            let arr = [];
            arr = await Promise.all(mo.map(m => {
                return m;
            }));

            setMessages([...arr]);
            setTimeout(() => ref?.current?.scrollToEnd(), 50);
            setLoading(false);
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
            setTimeout(() => ref?.current?.scrollToEnd(), 50);
            setLoading(false);
            return;
        }

        try {
            let conversationInfo = {
                senderID: userObj.id,
                recipientID: userID,
                senderNewMessages: false,
                recipientNewMessages: false,
            }
            let createdConversation = await API.graphql(graphqlOperation(createConversation, { input: conversationInfo }));
            setConversationID(createdConversation.data.createConversation.id);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log('error creating conversation: ', err);
        }
        setLoading(false);
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

        let conversationInfo = {
            id: conversationID,
        }

        if (isSender) conversationInfo.recipientNewMessages = true;
        else conversationInfo.senderNewMessages = true;

        let updatedConversation = await API.graphql(graphqlOperation(updateConversation, { input: conversationInfo }));


        fetchConversation(user.id);
    }

    const renderMessage = ({ item }) => {
        return <Message message={item} previousDates={previousDates} setPreviousDates={setPreviousDates} recipientID={user.id} />
    }

    const renderFriend = ({ item }) => {
        if (searchInput === '') {
            return <Friend friend={item} />
        }
        let search = searchInput.toLowerCase();
        if (item.first_name.toLowerCase().startsWith(search) || item.last_name.toLowerCase().startsWith(search) || item.user_name.toLowerCase().startsWith(search)) {
            return <Friend friend={item} />
        }
    }

    const Friend = ({ friend }) => (
        <TouchableOpacity style={Notification.container} onPress={() => {
            setUserChosen(true);
            setChooseRecipient(false);
            console.log('friend: ', friend);
            setUser(friend);
            fetchConversation(friend.id);
        }}>
            <View style={Notification.userInfoContainer}>
                <Image source={{uri: friend.profile_picture}} style={Notification.profilePicture} />
                <View style={Notification.userBioContainer}>
                    <Text style={Notification.boldText}>{ friend.first_name + ' ' + friend.last_name }</Text>
                    <Text style={Notification.boldText}>@{friend.user_name}</Text>
                    <Text style={Notification.text}>{friend.bio.length > 53 ? friend.bio.slice(0, 53) + '...' : friend.bio}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Send New Message' />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    if (chooseRecipient) {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <BasicHeader name="Choose Recipient" />
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Search your network'/>
                <View style={styles.networkContainer}>
                    <FlatList
                        contentContainerStyle={styles.networkContentContainer}
                        data={friends}
                        renderItem={renderFriend}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        )
    }

    if (userChosen) return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "null"} enabled>
                        <BasicHeader name={"Messages with @" + user.user_name} />
                        <View style={{flex: 2.5}}>
                        <TouchableOpacity style={MessageStyle.friendContainer} onPress={() => navigation.navigate('UserProfileScreen', { username: user.user_name })}>
                            <View style={MessageStyle.infoContainer}>
                                <Image source={{uri: user.profile_picture}} style={MessageStyle.profilePicture} />
                                <View style={MessageStyle.bioContainer}>
                                    <Text style={MessageStyle.boldText}>{user.first_name + ' ' + user.last_name}</Text>
                                    <Text style={MessageStyle.boldText}>@{user.user_name}</Text>
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

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "null"} enabled>
                    <BasicHeader name="Send New Message" />
                    <View style={{flex: 2.5}}>
                    <TouchableOpacity style={MessageStyle.friendContainer} onPress={() => setChooseRecipient(true)}>
                        <View style={MessageStyle.infoContainer}>
                            <BlockedUserIcon />
                            <View style={MessageStyle.bioContainer}>
                                <Text style={MessageStyle.boldText}>Choose recipient</Text>
                            </View>
                            <ForwardIcon />
                        </View>
                    </TouchableOpacity>
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
    networkContainer: {
        maxHeight: height * 0.7,
    },
    networkContentContainer: {
        paddingBottom: height * 0.2,
    },
    inputContainer: {
        flex: 1,
        height: height * 0.2,
    },
    iconContainer: {
        position: 'absolute',
        bottom: height * 0.035,
        right: width * 0.07,
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        //marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: height * 0.2,
        width: width * 0.9,
        alignSelf: 'center'
    },
})