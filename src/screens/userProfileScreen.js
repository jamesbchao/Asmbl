import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, } from "react-native";
import { Auth, API, graphqlOperation, Analytics } from 'aws-amplify';
import { useIsFocused } from '@react-navigation/native';

/* Queries */
import { userByUsername, friendshipByIDs, friendrequestByIDs } from "../graphql/queries";
import { createFriendRequest, createNotification, updateUser } from '../graphql/mutations';

/* Components */
import TabSelector from '../components/TabSelector';
import ProfileButtons from '../components/ProfileButtons';
import PopupMenu from '../components/PopupMenu';
import BasicHeader from '../components/BasicHeader';

/* Functions */
import renderTab from '../functions/renderTab.function';
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Profile from '../styles/Profile.component.style';
import Header from '../styles/Header.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import BackButton from '../../assets/images/backButton';
import MoreIconBlue from '../../assets/images/moreIconBlue';
import ReportIcon from '../../assets/images/reportIcon';

var { width, height } = Dimensions.get('window');

const initialState = {
  user_name: '',
  first_name: '',
  last_name: '',
  profile_picture: null,
  bio: '',
  interests_experience: [],
  interests_learn_more: [],
}

const tabNames = [
    'Interests',
    'Posts',
    'Reposts',
]

const moreOptions = [
    'Report user',
    'Block user'
]

//pass in user info as a property

//custom hook: const user = useCurrentUser()
export default function UserProfileScreen({ navigation, route }) {

    let { username } = route.params;

    const isFocused = useIsFocused();
    const [startTime, setStartTime] = useState(null);

    const [user, setUser] = useState(initialState);
    const [selectedTab, setSelectedTab] = useState('Interests');
    const [morePressed, setMorePressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    /* Friendship */
    const [requestedOutgoing, setRequestedOutgoing] = useState(false);
    const [requestedIncoming, setRequestedIncoming] = useState(false);
    const [connected, setConnected] = useState(false);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        handleTrackTimeSpent(isFocused);
    }, [isFocused]);

    const handleTrackTimeSpent = async(isFocused) => {
        if (isFocused) {
            let now = new Date();
            setStartTime(now);
        } else {
            const u = await getCurrentUser();
            let now = new Date();
            let diff = now - startTime;
            console.log(diff);
            Analytics.record('timeSpentUserProfile', { currentUsername: u.user_name, currentUserID: u.id, profileUsername: user.user_name, profileID: user.id }, { timeSpent: diff });
        }
    }

    const fetchUser = async() => {

        let currentUserObj = await Auth.currentUserInfo();
        if (currentUserObj.username === username) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'My Profile'}]
            })
            navigation.navigate('My Profile');
        }

        const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
        const userObj = userData.data.userByUsername.items[0];

        const userInfo = {
        id: userObj.id,
        user_name: userObj.user_name,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        profile_picture: userObj.profile_picture,
        bio: userObj.bio,
        interests_experience: userObj.interests_experience,
        interests_learn_more: userObj.interests_learn_more,
        }
        setUser(userInfo);
        fetchFriendStatus(userObj.id, userObj.user_name);
    }

    const fetchFriendStatus = async(id) => {

        //friend reqs
        let currentUserObj = await Auth.currentUserInfo();
        const currentUsername = currentUserObj.username;
        const currentUserData = await API.graphql(graphqlOperation(userByUsername, { user_name: currentUsername }));
        currentUserObj = currentUserData.data.userByUsername.items[0];
        const currentUserID = currentUserObj.id;
        //const id = user.id;


        const friendReqDataSender = await API.graphql(graphqlOperation(friendrequestByIDs, { senderID: currentUserID, receiverID: { eq: id }}));
        const friendReqDataReceiver = await API.graphql(graphqlOperation(friendrequestByIDs, { senderID: id, receiverID: {eq: currentUserID }}));
        let friendReqObjSender = friendReqDataSender.data.friendrequestByIDs.items;
        let friendReqObjReceiver = friendReqDataReceiver.data.friendrequestByIDs.items;

        if (friendReqObjSender.length > 0) setRequestedOutgoing(true);
        if (friendReqObjReceiver.length > 0) setRequestedIncoming(true);


        //friends
        const friendDataUser = await API.graphql(graphqlOperation(friendshipByIDs, { friendID: id, userID: { eq: currentUserID }}));
        const friendDataFriend = await API.graphql(graphqlOperation(friendshipByIDs, { friendID: currentUserID, userID: { eq: id }}));
        const friendObjUser = friendDataUser.data.friendshipByIDs.items;
        const friendObjFriend = friendDataFriend.data.friendshipByIDs.items;

        if ( friendObjUser.length > 0 || friendObjFriend.length > 0) setConnected(true);

        setLoading(false);
    }

    const handleConnect = async() => {
        setRequestedOutgoing(true);
        console.log('connect');
        let currentUserObj = await Auth.currentUserInfo();
        const currentUsername = currentUserObj.username;
        const currentUserData = await API.graphql(graphqlOperation(userByUsername, { user_name: currentUsername }));
        currentUserObj = currentUserData.data.userByUsername.items[0];
        const currentUserID = currentUserObj.id;

        const id = user.id;

        let friendRequestObj = {
            senderID: currentUserID,
            friendRequestSenderId: currentUserID,
            receiverID: id,
            friendRequestReceiverId: id,
        }

        let createdFriendRequest = await API.graphql(graphqlOperation(createFriendRequest, { input: friendRequestObj }));
        console.log(createdFriendRequest);

        let notification = {
            type: 'FriendRequest',
            userID: id,
            friendReqID: createdFriendRequest.data.createFriendRequest.id,
            username: currentUserObj.user_name
        }

        let createdNotification = await API.graphql(graphqlOperation(createNotification, { input: notification }));
        console.log('created notification: ', createdNotification);

        let userObj = {
            id: id,
            hasNewNotifications: true
        }

        let updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
        console.log('udpated user: ', updatedUser);

        fetchFriendStatus(id);
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Profile</Text>
                </View>
                <PopupMenu options={moreOptions} userID={user.id} blue={true} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Profile</Text>
                </View>
                <PopupMenu options={moreOptions} userID={user.id} blue={true} />
            </View>
        <View style={Profile.userInfoContainer}>
            <Image source={{uri: user.profile_picture}} style={Profile.profilePicture}/>
            <View style={Profile.userInfoTextContainer}>
                <Text style={Profile.userInfoBoldText}>{user.first_name + ' ' + user.last_name}</Text>
                <Text style={Profile.userInfoBoldText}>@{user.user_name}</Text>
                <Text style={Profile.userInfoText}>{user.bio}</Text>
            </View>
        </View>
        <ProfileButtons 
            mode='User' 
            handleConnect={handleConnect} 
            requestedOutgoing={requestedOutgoing} 
            requestedIncoming={requestedIncoming}
            userID={user.id}
            callback={fetchFriendStatus}
            connected={connected}
        />
        <TabSelector tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        <View style={Profile.mainContainer}>
            {renderTab(user, selectedTab)}
        </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white'
  },
  moreButtonContainer: {
    height: height * 0.045
},
});



