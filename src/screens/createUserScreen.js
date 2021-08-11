import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Image, Button, Text, SafeAreaView } from 'react-native';
import uuid from 'react-native-uuid';
import { Storage, API, Auth, withSSRContext } from 'aws-amplify';
import { createUser } from '../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';

const initialState = {
    user_name: '',
    first_name: '',
    last_name: '',
    image: null,
    file: '',
    saving: false
};

export default function CreateUser({ navigation }) {
    const [formState, setFormState] = useState(initialState);
    const [showErrorMessage, updateShowErrorMessage] = useState(false);
    const [users, setUsers] = useState([]);

    const setInput = (key, value) => {
        setFormState({...formState, [key]: value});
    };

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log('picked image: ', result);
    
        if (!result.cancelled) {
            setFormState({...formState, image: result.uri});
        }
    };

    const save = async() => {
        try {
            const { user_name, first_name, last_name, image } = formState;
            if (!user_name || !first_name || !last_name || !image) {
                updateShowErrorMessage(true);
                return;
            }
            setFormState({...formState, saving: true});
            
            const imageName = image.replace(/^.*[\\\/]/, '');
            setFormState({...formState, file: imageName});
            console.log('image name: ', imageName);
            fetch(image).then(res => {
                res.blob().then(async blob => {
                    await Storage.put(imageName, blob).then(res => {
                        console.log(res);
                    }).catch(err => console.log('error: ', err));
                });
            });

            const userInfo = { 
                user_name, 
                first_name, 
                last_name, 
                profile_picture: 'https://d1751g0d7z7llt.cloudfront.net' + imageName, 
                email: 'james.b.chao@gmail.com',
                bio: 'hi',
                interests_experience: ['Duck Rights'],
                interests_learn_more: ['Duck Rights'],
                pronouns: 'he/him',
                school: 'Stanford',
                hasNewNotifications: false,

            };

            const createdUser = await API.graphql({
                query: createUser, variables: { input: userInfo }
            });
            console.log('successfully created user: ', createdUser);
            setUsers([...users, {userInfo}])
            //setFormState({...formState, saving: false});
            setFormState(initialState);
        } catch (err) {
            console.log('Error saving user: ', err);
        }
    }

    return <SafeAreaView style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={val => setInput('user_name', val)} 
            value={formState.user_name}
            placeholder="Username"
        />
        <TextInput 
            style={styles.input}
            onChangeText={val => setInput('first_name', val)} 
            value={formState.first_name}
            placeholder="First Name"
        />
        <TextInput 
            style={styles.input}
            onChangeText={val => setInput('last_name', val)} 
            value={formState.last_name}
            placeholder="Last Name"
        />
        <Button title="Choose Image..." onPress={pickImage} />
        {formState.image && <Image style={styles.image} source={{uri: formState.image}}/>}
        <Button title="Create New User" onPress={save}/>
        <Button title="Go to home screen" onPress={() => navigation.navigate('Home')} />
        {formState.saving && <Text style={styles.savingMessage}>Saving post...</Text>}
        {showErrorMessage && <Text style={styles.errorMessage}>Please fill out all fields!</Text>}
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