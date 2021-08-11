import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView, FlatList, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';

/* Queries */
import { friendshipByFriend, friendshipByUser, getUser } from '../graphql/queries';

/* Components */
import SearchBar from '../components/SearchBar';
import BasicHeader from '../components/BasicHeader';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Header from '../styles/Header.component.style';
import Notification from '../styles/Notification.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Icons */
import BackButton from '../../assets/images/backButton';

const { width, height } = Dimensions.get('window');


const Friend = ({ friend, navigation }) => (
    <TouchableOpacity style={Notification.container} onPress={() => navigation.navigate('UserProfileScreen', { username: friend.user_name })}>
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


export default function MyNetworkScreen({ navigation }) {

    const [friends, setFriends] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async() => {
        const user = await getCurrentUser();
        const id = user.id;

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

    const renderFriend = ({ item }) => {
        if (searchInput === '') {
            return <Friend friend={item} navigation={navigation} />
        }
        let search = searchInput.toLowerCase();
        if (item.first_name.toLowerCase().startsWith(search) || item.last_name.toLowerCase().startsWith(search) || item.user_name.toLowerCase().startsWith(search)) {
            return <Friend friend={item} navigation={navigation} />
        }
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='My Network' />
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
                    <Text style={Header.titleBold}>My Network</Text>
                </View>
            </View>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Search your network'/>
            <View style={styles.mainContainer}>
                <FlatList
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

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    mainContainer: {
        height: height * 0.7
    }
})