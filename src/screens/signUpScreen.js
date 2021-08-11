import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Svg, TextInput, ScrollView, SafeAreaView, onContentSizeChange } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { API, Auth, Storage, graphqlOperation } from 'aws-amplify';
import { createUser } from '../graphql/mutations';


import LoginButtons from '../styles/LoginButtons.component.style.js';
import Forms from '../styles/Forms.component.style.js';
import OnboardingText from '../styles/OnboardingText.component.style.js';
import GlobalStyles from '../styles/GlobalStyles.component.style';


const initialState = {
  email: '',
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
}

const { width, height } = Dimensions.get('window');


function SignUpScreen({ navigation }) {
  const [formState, setFormState] = useState(initialState);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const [formComplete, setFormComplete] = useState(false);


  useEffect(() => {
  }, []);


  const handleError = (error) => {
    setShowErrorMessage(true);
    console.log('error message: ', error);
    switch (error) {
      case 'confirmPassword':
        setErrorMessage("Passwords don't match.");
        break;
      case 'usernameTaken':
        setErrorMessage("That username is already taken. Please try a different one, or sign in.");
        break;
      case 'usernameEmpty':
        setErrorMessage("Username cannot be empty.");
        break;
      case 'lowerCase':
        setErrorMessage("Username must be all lowercase.");
        setFormState({...formState, username: ''});
        break;
      case 'passwordNoUppercase':
        setErrorMessage("Invalid Password.");
        setShowPasswordRequirements(true);
        setFormState({...formState, password: '', confirmPassword: ''});
        break;
      case 'passwordLength':
        setErrorMessage("Invalid Password.");
        setShowPasswordRequirements(true);
        setFormState({...formState, password: '', confirmPassword: ''});
        break;
      case 'noUser':
        setErrorMessage("No Current User.");
        break;
      default:
        setErrorMessage(error);
        setShowPasswordRequirements(true);
        setFormState({...formState, password: '', confirmPassword: ''});
        break;
    }
    console.log(showErrorMessage, ', ', errorMessage);
  }

  const handleSubmit = () => {

      if (formState.password !== formState.confirmPassword) {
        handleError('confirmPassword');
        return;
      }

      if (formState.username !== formState.username.toLowerCase()) {
        handleError('lowerCase');
        return;
      }

      signUp();

  }

  const signUp = async() => {
    try {
      let { email, username, password, name } = formState;

      username = username.toLowerCase();

      let first_name = name.substr(0, name.indexOf(' '));
      let last_name = name.substr(name.indexOf(' ') + 1);

      const { userSub } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        }
      });
      console.log(userSub);
      navigation.navigate('VerifyAccount', {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
        profile_picture: 'https://d1751g0d7z7llt.cloudfront.net/myProfile.png',
        id: userSub
      })
    } catch (err) {
      console.log(err.message);
      switch (err.message) {
        case "User already exists":
          handleError('usernameTaken');
          break;
        case "Username cannot be empty":
          handleError('usernameEmpty');
          break;
        case "Password did not conform with policy: Password must have uppercase characters":
          handleError('passwordNoUppercase');
          break;
        case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
          handleError('passwordLength');
          break;
        case "No current user":
          //handleError('noUser');
          break;
        default:
          handleError(err.message);
          break;
      }
      console.log('error signing up: ', err);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={OnboardingText.header}>Welcome to Asmbl!</Text>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
          enableOnAndroid={true}
          extraHeight={height * 0.01}
          extraScrollHeight={height * 0.01}
        >
          <View style={Forms.inputContainer}>
            <Text style={Forms.inputTitle}>
              <Text>Email</Text>
              <Text style={styles.asterisk}> *</Text>
            </Text>
            <TextInput
                  style={Forms.input}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  onChangeText={(value) => setFormState({...formState, email: value})}
                  value={formState.email}
                  placeholder="Your email address"
                />
            <Text style={Forms.inputTitle}>
              <Text>Username</Text>
              <Text style={styles.asterisk}> *</Text>
            </Text>
            <TextInput
                  style={Forms.input}
                  autoCapitalize="none"
                  onChangeText={(value) => setFormState({...formState, username: value.toLowerCase()})}
                  value={formState.username}
                  placeholder="Your public username"
                />
            <Text style={Forms.inputTitle}>
              <Text>Full Name</Text>
              <Text style={styles.asterisk}> *</Text>
            </Text>
            <TextInput
                  style={Forms.input}
                  onChangeText={(value) => setFormState({...formState, name: value})}
                  value={formState.name}
                  placeholder="Your first and last name"
                />
            <Text style={Forms.inputTitle}>
              <Text style={showPasswordRequirements && {color: 'red'}}>Password</Text>
              <Text style={styles.asterisk}> *</Text>
            </Text>
            <TextInput
                  style={Forms.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  //keyboardType='visible-password'
                  onChangeText={(value) => setFormState({...formState, password: value})}
                  value={formState.password}
                  placeholder="Your password"
                />
            {showPasswordRequirements && 
              <Text>
                Your password must be at least 8 letters and contain an uppercase letter, a lowercase letter, and a number.
              </Text>}
            <Text style={Forms.inputTitle}>
              <Text>Confirm Password</Text>
              <Text style={styles.asterisk}> *</Text>
            </Text>
            <TextInput
                  style={Forms.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={(value) => setFormState({...formState, confirmPassword: value})}
                  value={formState.confirmPassword}
                  placeholder="Retype your password"
                  onChange={() => setFormComplete(true)}
            />
          </View>
        </KeyboardAwareScrollView>
      <View style={LoginButtons.bottomButtonContainer}>
          <View style={LoginButtons.lowerButtonContainer}>
            <TouchableOpacity
              style={formComplete ? LoginButtons.lowerButton : LoginButtons.lowerButtonDisabled}
              onPress={() => handleSubmit()}
            >
              <Text style={formComplete ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={LoginButtons.textBelowButton}>Already have an account?
            <Text style={LoginButtons.boldBelowButton} onPress={() => navigation.navigate('SignIn')}>
              &#160;Sign In
            </Text>
          </Text>
          {showErrorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  headerText: {
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 32,
    color: '#1B0A60',
  //marginTop: 69,
    marginLeft: 24,
    marginBottom: 46
  },
  scrollView: {
    //height: '100%',
    //width: '100%',
    //alignSelf: 'center',
    //marginTop: 46
  },
  scrollViewContainer: {
    //top: -190,
    //height: '120%',
    //flexGrow: 1,
    //alignItems: 'center',
  },
  errorMessage: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  asterisk: {
    color: 'red',
    flex: 1
  },
});

export default SignUpScreen;