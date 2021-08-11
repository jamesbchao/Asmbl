import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Image, Button, SafeAreaView } from 'react-native';
import uuid from 'react-native-uuid';
import { Storage, API, Auth, withSSRContext } from 'aws-amplify';
import { createCommunity } from '../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../styles/GlobalStyles.component.style';

export default function CreateCommunityScreen({ navigation }) {
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log('picked image: ', result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const save = async() => {
        try {
            const name = input;
            const picture = image;

            if (!name || !picture) {
                return;
            }

            const id = uuid.v4();
            
            const imageName = picture.replace(/^.*[\\\/]/, '');
            console.log('image name: ', imageName);
            fetch(picture).then(res => {
                res.blob().then(async blob => {
                    await Storage.put(imageName, blob).then(res => {
                        console.log(res);
                    }).catch(err => console.log('error: ', err));
                });
            });

            const communityInfo = { name, picture: 'https://d1751g0d7z7llt.cloudfront.net' + imageName, id };
            let community = await API.graphql({
                query: createCommunity, variables: { input: communityInfo }
            });

            console.log('successfully created community: ', community);

            setInput('');
            setImage(null);
        } catch (err) {
            console.log('Error saving community: ', err);
        }
    }

    return <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <TextInput 
            style={styles.input}
            onChangeText={val => setInput(val)} 
            value={input}
            placeholder="Name"
        />
        <Button title="Choose Image..." onPress={pickImage} />
        {image && <Image style={styles.image} source={{uri: image}}/>}
        <Button title="Create New Community" onPress={save}/>
        <Button title="Go to create post screen" onPress={() => navigation.navigate('CreatePost')} />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {

    },
    savingMessage: {
        marginBottom: 0,
    },
    image: {
        height: 120,
        marginHorizontal: 10,
        marginVertical: 0,
        resizeMode: 'contain',
    },
    input: {
        marginBottom: 10,
        padding: 7,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        borderRadius: 4,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
    }
})