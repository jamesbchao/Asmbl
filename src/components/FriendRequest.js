import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { API, graphqlOperation, Storage } from 'aws-amplify';

/* Queries */
import { userByUsername } from '../graphql/queries';

/* Functions */
import { handleReqAccept } from '../functions/handleReqAccept.function';

/* Styles */
import Notification from '../styles/Notification.component.style';
import Profile from '../styles/Profile.component.style';

/* Icons */
import WhiteCheckmark from '../../assets/images/userProfileIcons/whiteCheckmark';
import WhiteX from '../../assets/images/userProfileIcons/whiteX';

export default function FriendRequest({ notification, fetchNotifications }) {

    const [user, setUser] = useState({});
    const [shown, setShown] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async() => {
        try {
            const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: notification.username }));
            let userObj = userData.data.userByUsername.items[0];

            //let uri = await Storage.get(userObj.profile_picture);
            //userObj.profile_picture = uri;

            setUser(userObj);
        } catch {
            console.log('error fetching user');
        }
    }

    if (shown) return (
        <View style={Notification.container}>
            <View style={Notification.userInfoContainer}>
                <Image source={{uri: user.profile_picture}} style={Notification.profilePicture} />
                <View style={Notification.userBioContainer}>
                    <Text style={Notification.boldText}>{ user.first_name + ' ' + user.last_name }</Text>
                    <Text style={Notification.boldText}>@{user.user_name}</Text>
                    <Text style={Notification.text}>{user.bio}</Text>
                </View>
            </View>
            <View style={Notification.buttonsContainer}>
                <TouchableOpacity style={Notification.acceptButton} onPress={() => {
                    setShown(false);
                    handleReqAccept(true, user.id, fetchNotifications)
                }}>
                    <WhiteCheckmark/>
                    <Text style={Notification.acceptButtonText}>Accept</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={Notification.declineButton} onPress={() => {
                    setShown(false);
                    handleReqAccept(false, user.id, fetchNotifications)
                }}>
                    <WhiteX/>
                    <Text style={Notification.acceptButtonText}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return null;
}