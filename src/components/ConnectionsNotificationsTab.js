import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { notificationsByUser } from '../graphql/queries';

/* Components */
import FriendRequest from '../components/FriendRequest';

/* Styles */
import Notification from '../styles/Notification.component.style';

/* Icons */
import GreenCheckmark from '../../assets/images/greenCheckmark';

const { width, height } = Dimensions.get('window');

export default function ConnectionsNotificationsTab({id}) {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async() => {

        let filter = {
            or: [
                {
                    type: {
                        eq: 'FriendRequest'
                    }
                },
                {
                    type: {
                        eq: 'AcceptedFriendRequest'
                    }
                }
            ]
        };

        let notificationsData = await API.graphql(graphqlOperation(notificationsByUser, { userID: id, sortDirection: 'DESC', filter: filter }));
        let notificationsObj = notificationsData.data.notificationsByUser.items;
        setNotifications(notificationsObj);
    }

    const acceptedFriendRequest = (notification) => {
        return (
            <View style={Notification.container}>
                <View style={Notification.acceptedFriendRequest}>
                    <GreenCheckmark width={width * 0.075} height={width * 0.075}/>
                    <Text style={Notification.textContainer}>
                        <Text style={Notification.boldText}>@{notification.username}</Text>
                        <Text style={Notification.text}> has accepted your request to connect.</Text>
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {notifications.map(notification => (
                    <View key={notification.id}>
                        {notification.type === 'AcceptedFriendRequest' ? acceptedFriendRequest(notification) : <FriendRequest notification={notification} fetchNotifications={fetchNotifications} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    scrollView: {
        paddingBottom: height * 0.1
    }
})