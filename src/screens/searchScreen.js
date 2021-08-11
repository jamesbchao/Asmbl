import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage, } from 'aws-amplify';

/* Queries */
import { listUsers, searchUsers } from '../graphql/queries';

/* Components */
import SearchBar from '../components/SearchBar';


/* Styles */
import Notification from '../styles/Notification.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';
import Profile from '../styles/Profile.component.style';

/* Icons */
import AsmblLogoBlue from '../../assets/images/createPost/asmblLogoBlue';

const { width, height } = Dimensions.get('window');


const Friend = ({ friend, navigation }) => (
    <TouchableOpacity style={Notification.container} onPress={() => navigation.navigate('UserProfileScreen', { username: friend.user_name })}>
        <View style={Notification.userInfoContainer}>
            <Image source={{uri: friend.profile_picture}} style={Notification.profilePicture} />
            <View style={Notification.userBioContainer}>
                <Text style={Notification.boldText}>{ friend.first_name + ' ' + friend.last_name }</Text>
                <Text style={Notification.boldText}>@{friend.user_name}</Text>
                <Text style={Notification.text}>{friend.bio?.length > 53 ? friend.bio?.slice(0, 53) + '...' : friend.bio}</Text>
            </View>
        </View>
    </TouchableOpacity>
)


export default function SearchScreen({ navigation }) {

    const [friends, setFriends] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async() => {  
  
        let search = searchInput.toLowerCase();
        let ud;

        let filter = {
          or: [
              {
                  user_name: {
                      contains: search
                  }
              },
              {
                  first_name: {
                      contains: search
                  }
              },
              {
                  last_name: {
                    contains: search
                }
            }
          ]
      };

        if (search === '') {
          ud = await API.graphql(graphqlOperation(listUsers, { limit: 25 }));
        } else {
          ud = await API.graphql(graphqlOperation(listUsers, { filter: filter, limit: 25 }));
        }

        let uo = ud.data.listUsers.items;
        
        let arr = [];
        arr = await Promise.all(uo.map(async(u) => {
          return {
            id: u.id,
            profile_picture: u.profile_picture,
            user_name: u.user_name,
            first_name: u.first_name,
            last_name: u.last_name,
            bio: u.bio
          }
        }))

        setFriends([...arr]);
        setLoading(false);

    }

    const fetchMoreUsers = async(val) => {
        setLoading(true);
        //let search = val.toLowerCase();
        let search = val;
        console.log('search: ', search);

        let filter = {
            or: [
                {
                    user_name: {
                        contains: search
                    }
                },
                {
                    first_name: {
                        contains: search
                    }
                },
                {
                    last_name: {
                      contains: search
                  }
              }
            ]
        };

        const ud = await API.graphql(graphqlOperation(listUsers, { filter: filter, limit: 25 }));
        let uo = ud.data.listUsers.items;
        let arr = [];
        uo.forEach(u => {
            arr.push({
                id: u.id,
                profile_picture: u.profile_picture,
                user_name: u.user_name,
                first_name: u.first_name,
                last_name: u.last_name,
                bio: u.bio
            })
        });
        console.log(arr);
        setFriends([...arr]);
        setLoading(false);
    }

    const renderFriend = ({ item }) => {
        return <Friend friend={item} navigation={navigation} />
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Profile.headerContainer}>
                <Text style={Profile.headerText}>Search</Text>
                <View style={Profile.headerIconsContainer}>
                    <AsmblLogoBlue />
                    <Text style={Profile.headerText}>Asmbl</Text>
                </View>
            </View>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} callback={fetchMoreUsers} placeholder='Search users'/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Profile.headerContainer}>
                <Text style={Profile.headerText}>Search</Text>
                <View style={Profile.headerIconsContainer}>
                    <AsmblLogoBlue />
                    <Text style={Profile.headerText}>Asmbl</Text>
                </View>
            </View>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} callback={fetchMoreUsers} placeholder='Search users'/>
            <View style={styles.mainContainer}>
                <FlatList
                    data={friends}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatList}
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
        height: height * 0.9,
    },
    flatList: {
      paddingBottom: height * 0.2,
    }
})