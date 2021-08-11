import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

/* Queries */
import { updateUser } from '../graphql/mutations';

/* Components */
import BasicHeader from '../components/BasicHeader';

import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Icons */
import UploadNew from '../../assets/images/uploadNew';
import EditProfileIcon from '../../assets/images/myProfileIcons/editProfileIcon';

const { width, height }= Dimensions.get('window');

export default function EditProfileScreen({ navigation }) {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        fetchUser();
    }, [isFocused]);

    const fetchUser = async() => {
        let userObj = await getCurrentUser();
        setUser(userObj);
        setLoading(false);
    }

    const pickImage = async() => {

        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
        })();

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log('picked image: ', result);
    
        if (!result.cancelled) {
            upload(result.uri);
        }   
    };

    const upload = async(image) => {
        try {
            const imageName = image.replace(/^.*[\\\/]/, '');
            fetch(image).then(res => {
                res.blob().then(async blob => {
                    await Storage.put(imageName, blob).then(res => {
                        console.log(res);
                    }).catch(err => console.log('error: ', err));
                });
            });
    
            let userObj = {
                id: user.id,
                profile_picture: 'https://d1751g0d7z7llt.cloudfront.net' + imageName
            }
    
            let updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
            console.log('uploaded picture for user ', updatedUser.data.updateUser.user_name);

            fetchUser();
        } catch (err) {
            console.log('error changing profile picture: ', err);
        }        
    }

    const handleEditName = () => {
        let name = user.first_name + ' ' + user.last_name;
        navigation.navigate('EditUserInfo', { mode: 'Name', param: name, id: user.id });
    }

    const handleEditUsername = () => {
        navigation.navigate('EditUserInfo', { mode: 'Username', param: user.user_name, id: user.id });
    }

    const handleEditBio = () => {
        navigation.navigate('EditUserInfo', { mode: 'Bio', param: user.bio, id: user.id });
    }

    const handleEditInterests = () => {
        navigation.navigate('EditUserInfo', { mode: 'Interests', id: user.id, interests_experience: user.interests_experience, interests_learn_more: user.interests_learn_more });
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Edit My Profile' />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Edit My Profile' />
            <View style={styles.mainContainer}>
                <Text style={styles.sectionHeader}>Profile Picture</Text>
                <View style={styles.profilePictureContainer}>
                    <Image source={{uri: user.profile_picture}} style={styles.image} />
                    <TouchableOpacity style={styles.textContainer} onPress={() => pickImage()}>
                        <UploadNew />
                        <Text style={styles.blueText}>Upload New</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Name</Text>
                    <Text style={styles.userInfoText}>{user.first_name + ' ' + user.last_name}</Text>
                    <TouchableOpacity style={styles.textContainer} onPress={() => handleEditName()}>
                        <EditProfileIcon />
                        <Text style={styles.blueText}>Edit Name</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Bio</Text>
                    <Text style={styles.userInfoText}>{user.bio}</Text>
                    <TouchableOpacity style={styles.textContainer} onPress={() => handleEditBio()}>
                        <EditProfileIcon />
                        <Text style={styles.blueText}>Edit Bio</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Interests</Text>
                    <TouchableOpacity style={styles.textContainer} onPress={() => handleEditInterests()}>
                        <EditProfileIcon />
                        <Text style={styles.blueText}>Edit Interests Section</Text>
                    </TouchableOpacity>
                </View>
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
        width: width * 0.9,
        alignSelf: 'center',
    },
    sectionHeader: {
        marginTop: height * 0.02,
        fontFamily: 'Avenir',
        color: '#4B4B4B',
        fontSize: 16,
    },
    profilePictureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.6,
        justifyContent: 'space-between',
        marginTop: height * 0.015
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 200,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    blueText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        color: '#1B0A60',
        marginLeft: width * 0.02
    },
    sectionContainer: {
        //height: height * 0.12,
        //maxHeight: height * 0.12,
        justifyContent: 'space-between',
        marginVertical: height * 0.01,
    },
    userInfoText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18
    }
})