import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import DotBar from '../../../assets/images/dotBar3.svg';
import UploadPhotoLogo from '../../../assets/images/uploadPhotoLogo.svg';
import OnboardingText from '../../styles/OnboardingText.component.style';
import Modals from '../../styles/Modals.component.style';
import * as ImagePicker from 'expo-image-picker';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { userByUsername } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import GlobalStyles from '../../styles/GlobalStyles.component.style';


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function buildProfile3({ navigation }) {

    const [pictureUploaded, setPictureUploaded] = useState(false);
    const [image, setImage] = useState(null);

    const uploadPicture = async() => {
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

        if (!result.cancelled) {
            setPictureUploaded(true);
            setImage(result.uri);
        }
        
    }

    const handleSubmit = async() => {
        if (!pictureUploaded) return;

        try {
            const imageName = image.replace(/^.*[\\\/]/, '');
            fetch(image).then(res => {
                res.blob().then(async blob => {
                    await Storage.put(imageName, blob).then(res => {
                        console.log(res);
                    }).catch(err => console.log('error: ', err));
                });
            });

            const { username } = await Auth.currentUserInfo();
            const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username}));
            const userObj = userData.data.userByUsername.items[0];

            const user = {id: userObj.id, profile_picture: 'https://d1751g0d7z7llt.cloudfront.net/' + imageName};

            const updatedUser = await API.graphql(graphqlOperation(updateUser, {input: user}));
            console.log('updated user: ', updatedUser);

            navigation.navigate('Home');

        } catch (err) {
            console.log('Error uploading picture: ', err);
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <DotBar style={styles.dotBar}/>
        <Text style={OnboardingText.buildFormHeader}>Finally, upload a profile picture.</Text>
        <View style={styles.centerContainer}>
            {!pictureUploaded ? 
                <TouchableOpacity style={styles.uploadButton} onPress={() => uploadPicture()}>
                    <UploadPhotoLogo />
                    <Text style={styles.uploadButtonText}>Upload from Camera Roll</Text>
                </TouchableOpacity> : 

                <TouchableOpacity>
                    <Image source={{uri: image}} style={styles.uploadedImage} />
                    <Text style={styles.uploadedImageText}>You look amazing. ✨</Text>
                </TouchableOpacity>
        
            }
            
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={Modals.modalCancelButton}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={!pictureUploaded ? Modals.disabledModalSubmitButton : Modals.enabledModalSubmitButton}
            onPress={() => handleSubmit()}>
            <Text style={!pictureUploaded ? Modals.disabledModalSubmitText : Modals.enabledModalSubmitText}>Finish</Text>
          </TouchableOpacity> 
        </View>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height
    },
    dotBar: {
        alignSelf: 'center',
        marginTop: 30
    },
    buttonsContainer: {
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        bottom: height * 0.04,
        alignItems: 'center',
        width: width * 0.9,
        justifyContent: 'space-between',
    },
    centerContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        //alignSelf: 'center',
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: width * 0.15,
        paddingVertical: height * 0.02,
        alignItems: 'center'
    },
    uploadButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
        fontSize: 18,
        fontFamily: 'Avenir',
        lineHeight: 24,
    },
    uploadedImage: {
        borderRadius: 400 / 2,
        width: width * 0.5,
        height: width * 0.5
    },
    uploadedImageText: {
        textAlign: 'center',
        marginTop: 16,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19
    }
});

export default buildProfile3;
