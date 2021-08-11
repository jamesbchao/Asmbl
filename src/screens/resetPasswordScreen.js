import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Auth } from 'aws-amplify'
import LoginButtons from '../styles/LoginButtons.component.style';
import OnboardingText from '../styles/OnboardingText.component.style';
import Forms from '../styles/Forms.component.style';
import Modals from '../styles/Modals.component.style';
import SuccessCheck from '../../assets/images/resetPasswordCheck.svg';

function ResetPasswordScreen({ navigation, route }) {
    let { username, email } = route.params;

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formComplete, setFormComplete] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    const handleError = (error) => {
        setShowErrorMessage(true);
        console.log('error message: ', error);
        switch (error) {
            case 'confirmPassword':
                setErrorMessage("Passwords don't match.");
                break;
            case 'passwordNoUppercase':
                setErrorMessage("Invalid Password.");
                setShowPasswordRequirements(true);
                setNewPassword('');
                setConfirmNewPassword('');
                break;
            case 'passwordLength':
                setErrorMessage("Invalid Password.");
                setShowPasswordRequirements(true);
                setNewPassword('');
                setConfirmNewPassword('');
                break;
            case 'attemptLimit':
                setErrorMessage("Attempt limit exceeded, please try after some time.");
                break;
            default:
                setErrorMessage("");
                break;
        }
        console.log(showErrorMessage, ', ', errorMessage);
      }

    const handleSubmit = async() => {
        if (newPassword !== confirmNewPassword) {
            handleError('confirmPassword');
            return;
        }
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then(data => {
                setSuccessModal(true);
                setTimeout(() => { 
                    setSuccessModal(false);
                    navigation.navigate('SignIn');          
                  }, 1000);
                return () => clearTimeout(timer);
            })
            .catch(err => {
                console.log(err);
                switch (err.message) {
                    case "Password did not conform with policy: Password must have uppercase characters":
                        handleError('passwordNoUppercase');
                        break;
                    case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
                        handleError('passwordLength');
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        handleError('attemptLimit');
                        break;
                    default:
                        handleError('');
                        break;
                  }
            });
    }

    return <View style={styles.container}>
            <Text style={OnboardingText.header}>Reset your password</Text>
            <Text style={OnboardingText.subtitle}>Enter a new password for the account associated with the email {email}</Text>
            <View style={Forms.inputContainer}>
                <Text style={Forms.inputTitle}>
                    <Text>Confirmation Code</Text>
                    <Text style={styles.asterisk}> *</Text>
                </Text>
                <TextInput
                    style={Forms.input}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(value) => setCode(value)}
                    value={code}
                    placeholder="Code sent to email"
                />
                <Text style={Forms.inputTitle}>
                    <Text>New Password</Text>
                    <Text style={styles.asterisk}> *</Text>
                </Text>
                <TextInput
                    style={Forms.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(value) => setNewPassword(value)}
                    value={newPassword}
                    placeholder="Your new password"
                />
                {showPasswordRequirements && 
                    <Text>
                        Your password must be at least 8 letters and contain an uppercase letter, a lowercase letter, and a number.
                    </Text>}
                <Text style={Forms.inputTitle}>
                    <Text>Confirm New Password</Text>
                    <Text style={styles.asterisk}> *</Text>
                </Text>
                <TextInput
                    style={Forms.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(value) => setConfirmNewPassword(value)}
                    onChange={() => {if (newPassword !== '' && code !== '') setFormComplete(true)}}
                    value={confirmNewPassword}
                    placeholder="Retype your new password"
                />
            </View>
            <Modal
                visible={successModal}
                coverScreen={false}
                animationType='fade'
                backdropColor='black'
                transparent={true}
                backdropOpacity={0.70}
                onBackdropPress={() => setOpenResetModal(false)}
            >
                <View style={Modals.successContainer}>
                    <View style={Modals.successTextContainer}>
                        <SuccessCheck style={Modals.successCheck}/>
                        <Text style={Modals.successText}>Password reset</Text>
                    </View>
                </View>
            </Modal>
            <View style={LoginButtons.bottomButtonContainer}>
                <View style={LoginButtons.lowerButtonContainer}>
                <TouchableOpacity style={formComplete ? LoginButtons.lowerButton : LoginButtons.lowerButtonDisabled} onPress={() => handleSubmit()}>
                    <Text style={formComplete ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Reset Password</Text>
                </TouchableOpacity>
                </View>
                {showErrorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        height: 1000,
        backgroundColor: 'white'
    },
    asterisk: {
        color: 'red',
        flex: 1
    },
    errorMessage: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
        marginTop: 10
    },
});

export default ResetPasswordScreen;