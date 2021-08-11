import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Functions */
import { handleReqAccept } from '../functions/handleReqAccept.function';

/* Styles */
import Profile from '../styles/Profile.component.style';

/* Icons */
import MyNetworkIcon from '../../assets/images/myProfileIcons/myNetworkIcon';
import EditProfileIcon from '../../assets/images/myProfileIcons/editProfileIcon';
import MessageIcon from '../../assets/images/userProfileIcons/message';
import ConnectIcon from '../../assets/images/userProfileIcons/connect';
import ConnectIconDisabled from '../../assets/images/userProfileIcons/connectDisabled';
import WhiteCheckmark from '../../assets/images/userProfileIcons/whiteCheckmark';
import WhiteX from '../../assets/images/userProfileIcons/whiteX';
import PurpleCheckmark from '../../assets/images/userProfileIcons/purpleCheckmark';

export default function ProfileButtons({ mode, handleConnect, requestedOutgoing, requestedIncoming, userID, connected, callback }) {

    const [status, setStatus] = useState('Connect');

    useEffect(() => {
        if (requestedOutgoing) setStatus('Outgoing');
        if (requestedIncoming) setStatus('Incoming');
        if (connected) setStatus('Connected');
    }, []);


    const navigation = useNavigation();

    const handleMessage = () => {
        navigation.navigate('MessageUser', { userID: userID });
    }

    const handleMyNetwork = () => {
        navigation.navigate('MyNetwork')
    }

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    }

    if (mode === 'User') {

        if (status === 'Connected') {
            return (
                <View style={Profile.userProfileButtonsContainer}>
                    <TouchableOpacity style={Profile.myNetworkButton}>
                        <PurpleCheckmark/>
                        <Text style={Profile.myNetworkText}>Connected</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={Profile.editProfileButton} onPress={() => handleMessage()}>
                        <MessageIcon/>
                        <Text style={Profile.editProfileText}>Message</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        if (status === 'Outgoing') {
            return (
                <View style={Profile.userProfileButtonsContainer}>
                    <TouchableOpacity style={Profile.myNetworkButtonDisabled}>
                        <ConnectIconDisabled/>
                        <Text style={Profile.myNetworkTextDisabled}>Requested</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={Profile.editProfileButton} onPress={() => handleMessage()}>
                        <MessageIcon/>
                        <Text style={Profile.editProfileText}>Message</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        if (status === 'Incoming') {
            return (
                <View style={Profile.userProfileButtonsContainer}>
                    <TouchableOpacity style={Profile.acceptButton} onPress={() => {
                        setStatus('Connected');
                        handleReqAccept(true, userID, callback, userID)
                    }}>
                        <WhiteCheckmark/>
                        <Text style={Profile.acceptButtonText}>Accept</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={Profile.declineButton} onPress={() => {
                        setStatus('Connect');
                        handleReqAccept(false, userID, callback, userID)
                    }}>
                        <WhiteX/>
                        <Text style={Profile.acceptButtonText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            )
        }


        return (
            <View style={Profile.userProfileButtonsContainer}>
                <TouchableOpacity style={Profile.myNetworkButton} onPress={() => {
                    setStatus('Outgoing');
                    handleConnect();
                }}>
                    <ConnectIcon/>
                    <Text style={Profile.myNetworkText}>Connect</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={Profile.editProfileButton} onPress={() => handleMessage()}>
                    <MessageIcon/>
                    <Text style={Profile.editProfileText}>Message</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={Profile.userProfileButtonsContainer}>
            <TouchableOpacity style={Profile.myNetworkButton} onPress={() => handleMyNetwork()}>
                <MyNetworkIcon/>
                <Text style={Profile.myNetworkText}>My Network</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={Profile.editProfileButton} onPress={() => handleEditProfile()}>
                <EditProfileIcon/>
                <Text style={Profile.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})