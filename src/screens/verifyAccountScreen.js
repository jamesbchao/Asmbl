import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser } from '../graphql/mutations';
import LoginButtons from '../styles/LoginButtons.component.style.js';
import OnboardingText from '../styles/OnboardingText.component.style.js';

import CodeInput from 'react-native-confirmation-code-input';

import GlobalStyles from '../styles/GlobalStyles.component.style';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default VerifyAccountScreen = ({ route, navigation }) => {

    const { username, password, first_name, last_name, profile_picture, email, id } = route.params;
    const [code, setCode] = useState('');
    const [showResendCodeConfirmation, setShowResendCodeConfirmation] = useState(false);
    const [formComplete, setFormComplete] = useState(false);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = (error) => {
        setShowErrorMessage(true);
        switch (error) {
            case "confirmed":
                setErrorMessage("User already confirmed!");
                setTimeout(() => navigation.navigate('Guidelines'), 500);
                break;
            case "wrongCode":
                setErrorMessage("Invalid code. Please try again.");
                break;
            default:
                setErrorMessage("Unknown Error Verifying");
                break;
        }
    }

    const confirmSignUp = async() => {
        try {
            let verifyCode = code;
            console.log('code: ', verifyCode);
            await Auth.confirmSignUp(username, verifyCode);
            setShowResendCodeConfirmation(false);
            console.log('successfully verified!');
            await Auth.signIn(username, password);
            let userInfo = { user_name: username, first_name, last_name, email, id, profile_picture, hasNewNotifications: false };
            let createdUser = await API.graphql(graphqlOperation(createUser, { input: userInfo }));
            console.log(createdUser);
            navigation.navigate('Guidelines');
        } catch (error) {
            setFormComplete(false);
            setCode('');
            console.log('error confirming sign up', error);

            switch (error.message) {
                case "User cannot be confirmed. Current status is CONFIRMED":
                    handleError('confirmed');
                    break;
                case "Invalid verification code provided, please try again.":
                    handleError('wrongCode');
                    break;
                default:
                    handleError('');
                    break;
            }
        }
    }

    const resendCode = async() => {
        try {
            await Auth.resendSignUp(username);
            setShowResendCodeConfirmation(true);
            console.log('Code Resent Successfully');
        } catch (err) {
            console.log('error resending code: ', err)
        }
    }


    return <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Text style={OnboardingText.header}>We're honored to have you on our platform!</Text>
        <Text style={OnboardingText.subtitle}>For your personal safety, we've emailed you a verification code. Please enter it below to verify your account.</Text>
        <View style={styles.inputWrapper1}>
            <CodeInput
              autoFocus={true}
              className={'border-b'}
              space={20}
              size={30}
              containerStyle={styles.codeInputContainer}
              codeInputStyle={styles.codeInputText}
              codeLength={6}
              inactiveColor="black"
              activeColor='#1B0A60'
              inputPosition='left'
              keyboardType="number-pad"
              onFulfill={(code) => {
                  setCode(code);
                  setFormComplete(true)}}
              onCodeChange={(val) => setCode(val)}
            />
          </View>
        <View style={LoginButtons.bottomButtonContainer}>
          <View style={LoginButtons.lowerButtonContainer}>
            <TouchableOpacity
              style={formComplete ? LoginButtons.lowerButton : LoginButtons.lowerButtonDisabled}
              onPress={() => confirmSignUp()}
            >
              <Text style={formComplete ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Verify</Text>
            </TouchableOpacity>
          </View>
          <Text style={LoginButtons.textBelowButton}>Didn't receive a code?
            <Text style={LoginButtons.boldBelowButton} onPress={() => resendCode()}>
              &#160;Resend
            </Text>
          </Text>
          {showResendCodeConfirmation && <Text style={styles.resendCodeConfirmation}>Code sent!</Text>}
          {showErrorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    wave: {
        flex: 1,
        width: 900,
        height: 900,
        resizeMode: 'contain',
    },
    purpleText: {
        marginLeft: 24,
        marginTop: 69,
        fontWeight: '800',
        fontSize: 24,
        fontFamily: 'Avenir',
        color: '#1B0A60',
        width: width * 0.8,
    },
    regularText: {
        width: width * 0.8,
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#1B0A60',
        marginLeft: 24,
        marginTop: 15
    },
    resendCodeConfirmation: {
        color: 'green',
        textAlign: 'center',
        marginTop: 10
    },
    inputWrapper1: {
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    codeInputContainer: {
        marginTop: height / 20
    },
    codeInputText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        color: '#1B0A60'
    },
    container: {
        backgroundColor: 'white'
    },
    errorMessage: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
        marginTop: 10
    },
});