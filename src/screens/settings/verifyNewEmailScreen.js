import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Auth } from 'aws-amplify';
import LoginButtons from '../../styles/LoginButtons.component.style.js';
import OnboardingText from '../../styles/OnboardingText.component.style.js';
import GlobalStyles from '../../styles/GlobalStyles.component.style';


import CodeInput from 'react-native-confirmation-code-input';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function VerifyNewEmailScreen({ route, navigation }) {

    const [code, setCode] = useState('');
    //const [showResendCodeConfirmation, setShowResendCodeConfirmation] = useState(false);
    const [formComplete, setFormComplete] = useState(false);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = (error) => {
        setShowErrorMessage(true);
        switch (error) {
            case "confirmed":
                setErrorMessage("Email already confirmed!");
                //setTimeout(() => navigation.navigate('Guidelines'), 500);
                break;
            case "wrongCode":
                setErrorMessage("Invalid code. Please try again.");
                break;
            default:
                setErrorMessage("Unknown Error Verifying");
                break;
        }
    }

    const confirm = async() => {
        try {
            let result = await Auth.verifyCurrentUserAttributeSubmit('email', code);
            console.log(result);
            navigation.navigate('Settings');
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


    return <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Text style={OnboardingText.header}>We'll need to verify your updated email.</Text>
        <Text style={OnboardingText.subtitle}>For your personal safety, we've emailed you a verification code. Please enter it below to re-verify your account.</Text>
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
              onPress={() => confirm()}
            >
              <Text style={formComplete ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Verify</Text>
            </TouchableOpacity>
          </View>
          <Text style={LoginButtons.textBelowButton}>
            <Text style={LoginButtons.boldBelowButton} onPress={() => navigation.goBack()}>
              &#160;Go Back
            </Text>
          </Text>
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