// import * as React from 'react';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, TextInput, ProgressViewIOSComponent } from 'react-native';
import WaveLarge from '../components/WaveLarge.js';
import LoginButtons from '../styles/LoginButtons.component.style.js';
import OnboardingText from '../styles/OnboardingText.component.style.js';
import Forms from '../styles/Forms.component.style.js';
import ResetPasswordModal from '../components/ResetPasswordModal'
import { Auth, Analytics } from 'aws-amplify';
import GlobalStyles from '../styles/GlobalStyles.component.style';


function SignInScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [textPressed, setTextPressed] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formComplete, setFormComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const handleError = (error) => {
    setShowErrorMessage(true);
    switch (error) {
      case 'User is not confirmed.':
        navigation.navigate('VerifyAccount', {
          username: username
        });
        break;
      case 'Incorrect username or password.':
        setErrorMessage(error);
        break;
      default:
        setErrorMessage('Unknown error signing in');
        break;
    }
  }

  const handleSubmit = async() => {
    
    try {
      const user = await Auth.signIn(username, password);
      Analytics.record('userSignIn', { username: username});
      navigation.navigate('Home');

    } catch (error) {
      console.log('error signing in: ', error);
      handleError(error.message);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>     
      <Text style={OnboardingText.header}>Welcome back to Asmbl!</Text>

      <View style={Forms.inputContainer}>
        <Text style={Forms.inputTitle}>
          <Text>Username</Text>
          <Text style={styles.asterisk}> *</Text>
        </Text>
        <TextInput
          style={Forms.input}
          autoCapitalize="none"
          onChangeText={(value) => setUsername(value)}
          value={username}
          placeholder="Your username"
        />
        <Text style={Forms.inputTitle}>
          <Text>Password</Text>
          <Text style={styles.asterisk}> *</Text>
        </Text>
        <TextInput
          style={Forms.input}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="Your password"
          onChange={() => setFormComplete(true)}
        />
        <Text style={Forms.forgotPassword} onPress={()=> setModalVisible(true)}>
                Forgot your password?
        </Text>
        {modalVisible && <ResetPasswordModal navigation={navigation}/>}
      </View>
      
      <View style={LoginButtons.bottomButtonContainer}>
        <View style={LoginButtons.lowerButtonContainer /*Sign In Button */}>
          <TouchableOpacity style={formComplete ? LoginButtons.lowerButton : LoginButtons.lowerButtonDisabled} onPress={() => handleSubmit()}>
              <Text style={formComplete ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={LoginButtons.textBelowButton}>Don't have an account yet?
          <Text style={LoginButtons.boldBelowButton} onPress={()=> navigation.navigate('SignUp')}> 
              &#160;Sign Up
          </Text>
        </Text>
        {showErrorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    backgroundColor: 'white'
  },
  asterisk: {
    color: 'red',
    flex: 1
  },
  forgotPasswordDisabled: {
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 19
  },
  forgotPasswordEnabled: {
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 19,
    color: '#1B0A60'
  },
  errorMessage: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
});

export default SignInScreen;