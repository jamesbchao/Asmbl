import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage} from 'aws-amplify';
import { useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/* Queries */
import { conversationBySender, conversationByRecipient, messagesByConversation, getUser } from '../graphql/queries';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import GlobalStyles from '../styles/GlobalStyles.component.style';
import Profile from '../styles/Profile.component.style';
import Button from '../styles/Button.component.style';
import MessageStyle from '../styles/MessageStyle.component.style';

/* Icons */
import MessagesIcon from '../../assets/images/tabNavIcons/messagesFocused';
import AsmblLogoBlue from '../../assets/images/createPost/asmblLogoBlue';
import ForwardIcon from '../../assets/images/forwardButton';

const { width, height } = Dimensions.get('window');

const Conversation = ({ item, navigation }) => (
    <TouchableOpacity style={MessageStyle.friendContainer} onPress={() => navigation.navigate('MessageScreen', { conversationID: item.conversationID, userID: item.userID})}>
        <View style={MessageStyle.infoContainer}>
            <Image source={{uri: item.profile_picture}} style={MessageStyle.profilePicture} />
            <View style={MessageStyle.bioContainer}>
                <Text style={MessageStyle.boldText}>{item.name}</Text>
                <Text style={MessageStyle.boldText}>@{item.username}</Text>
            </View>
            <ForwardIcon />
        </View>
        {item.notification && <View style={MessageStyle.notificationContainer}>
            <View style={MessageStyle.notificationIcon} />
            <Text style={MessageStyle.notificationText}>{item.message}</Text>
        </View>}
    </TouchableOpacity>
)

export default function MessagesScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        fetchConversations();
    }, [isFocused]);

    const fetchConversations = async() => {
        let user = await getCurrentUser();
        let cd = await API.graphql(graphqlOperation(conversationBySender, { senderID: user.id, sortDirection: 'DESC' }));
        let cd2 = await API.graphql(graphqlOperation(conversationByRecipient, { recipientID: user.id, sortDirection: 'DESC' }));
        let co = cd.data.conversationBySender.items;
        let co2 = cd2.data.conversationByRecipient.items;

        console.log('conversations: ', co.length + co2.length);

        let arr = [];
        if (co.length > 0) {
            arr = await Promise.all(co.map(async(c) => {
                let ud = await API.graphql(graphqlOperation(getUser, { id: c.recipientID }));
                let u = ud.data.getUser;
                
                let retVal =  {
                    conversationID: c.id,
                    currentUserID: c.senderID,
                    userID: c.recipientID,
                    profile_picture: u.profile_picture,
                    name: u.first_name + ' ' + u.last_name,
                    username: u.user_name,
                    notification: c.senderNewMessages,
                };

                if (c.senderNewMessages) {
                    let md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: c.id, sortDirection: 'DESC' }));
                    let m = md.data.messagesByConversation.items[0].content;
                    retVal.message = m;
                }

                return retVal;
            }))
        }
        let arr2 = [];
        if (co2.length > 0) {
            arr2 = await Promise.all(co2.map(async(c) => {
                let ud = await API.graphql(graphqlOperation(getUser, { id: c.senderID }));
                let u = ud.data.getUser;
                
                let retVal =  {
                    conversationID: c.id,
                    currentUserID: c.recipientID,
                    userID: c.senderID,
                    profile_picture: u.profile_picture,
                    name: u.first_name + ' ' + u.last_name,
                    username: u.user_name,
                    notification: c.recipientNewMessages,
                };

                if (c.recipientNewMessages) {
                    let md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: c.id, sortDirection: 'DESC' }));
                    let m = md.data.messagesByConversation.items[0].content;
                    retVal.message = m;
                }

                return retVal;
            }))

            arr2.forEach(a => arr.push(a));
        }
        console.log('arr: ', arr)
        setConversations([...arr]);
        setLoading(false);
    }

    const renderItem = ({ item }) => {
        return <Conversation item={item} navigation={navigation} />
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Profile.headerContainer}>
                <Text style={Profile.headerText}>Messages</Text>
                <View style={Profile.headerIconsContainer}>
                    <AsmblLogoBlue />
                    <Text style={Profile.headerText}>Asmbl</Text>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Profile.headerContainer}>
                <Text style={Profile.headerText}>Messages</Text>
                <View style={Profile.headerIconsContainer}>
                    <AsmblLogoBlue />
                    <Text style={Profile.headerText}>Asmbl</Text>
                </View>
            </View>
            <TouchableOpacity style={Button.defaultButtonLonger} onPress={() => navigation.navigate('SendNewMessage')}>
                <View style={{marginRight: width * 0.03}}><MessagesIcon /></View>
                <Text style={Button.whiteText}>Send New Message</Text>
            </TouchableOpacity>
            <View style={styles.mainContainer}>
                <FlatList
                    data={conversations}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />  
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: width * 0.95,
        alignSelf: 'center',
        marginTop: height * 0.01,
        paddingBottom: height * 0.15,
        minHeight: height * 0.7
    }
})