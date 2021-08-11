import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

/* Components */
import BasicHeader from '../../components/BasicHeader';

import GlobalStyles from '../../styles/GlobalStyles.component.style';


const { width, height } = Dimensions.get('window');

export default function ChangePasswordScreen({ navigation, route }) {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState(false);

    const handleSubmit = async() => {

        if (newPassword !== confirmPassword) {
            setError(true);
            return;
        }

        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then(data => {
                console.log(data);
                navigation.navigate('Settings');
            })
            .catch(err => console.log(err));
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Change Password' right='Checkmark' callback={handleSubmit}/>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setOldPassword(val)}
                    value={oldPassword}
                    placeholder='Your current password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <Text style={styles.text}>New Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setNewPassword(val)}
                    value={newPassword}
                    placeholder='Your new password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <Text style={styles.text}>Retype New Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setConfirmPassword(val)}
                    value={confirmPassword}
                    placeholder='Your new password retyped'
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                {error && <Text style={styles.errorMessage}>New password and confirm password must match</Text>}
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
        marginTop: height * 0.04,
    },
    text: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
    },
    input: {
        marginVertical: height * 0.02,
        borderBottomWidth: 1,
        paddingBottom: height * 0.005,
    },
    errorMessage: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        color: 'red'
    }
});