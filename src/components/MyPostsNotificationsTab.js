import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

/* Queries */
import { notificationsByUser } from '../graphql/queries';

/* Styles */
import Notification from '../styles/Notification.component.style';

/* Icons */
import RepostIcon from '../../assets/images/repostIconBlue';
import CommentIcon from '../../assets/images/commentIconBlue';

const { width, height } = Dimensions.get('window');

export default function MyPostsNotificationsTab({id}) {

    const [notifications, setNotifications] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async() => {

        let filter = {
            or: [
                {
                    type: {
                        eq: 'Comment'
                    }
                },
                {
                    type: {
                        eq: 'Repost'
                    }
                }
            ]
        };

        let notificationsData = await API.graphql(graphqlOperation(notificationsByUser, { userID: id, sortDirection: 'DESC', filter: filter }));
        let notificationsObj = notificationsData.data.notificationsByUser.items;

        setNotifications(notificationsObj);

    }

    const renderNotification = ({item}) => {


        return (
            <View style={Notification.myPostsContainer}>
                <Image source={{uri: item.image}} style={Notification.image} />
                <View style={Notification.descriptionContainer}>
                    <View style={{flexDirection: 'row'}}>
                        {item.type === 'Repost' ? <RepostIcon /> : <CommentIcon />}
                        <Text style={Notification.blueText}>{item.type.toLowerCase()}</Text>
                    </View>
                    <Text>
                        <Text style={Notification.boldText}>@{item.username}</Text>
                        <Text style={Notification.text}> {item.type === 'Repost' ? 'reposted your resource.' : 'commented on your resource: '}</Text>
                        {item.type === 'Comment' && <Text style={Notification.italicText}>"{item.content}"</Text>}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatList}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    flatList: {
        paddingBottom: height * 0.15,
        marginBottom: height * 0.15,
    }
})