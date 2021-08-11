import React from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import Wave from '../../assets/images/wave-top.svg';
import Objects from '../../assets/images/OBJECTS.svg';
import Graphic from '../../assets/images/Graphic.svg';
import LoginButtons from '../styles/LoginButtons.component.style';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
    return <View style={styles.container}>
        <Graphic style={styles.graphic}/>
        <Text style={styles.text}>Made by change-makers, for change-makers.</Text>
        <View style={styles.buttonsContainer}>
            <View style={styles.signInButtonContainer /*Sign In Button */}>
                <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signUpButtonContainer /*Sign Up Button */}>
                <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  }

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#1B0A60'
    },
    graphic: {
        alignSelf: 'center',
        position: 'absolute',
        top: height * 0.4 - 230,
    },
    buttonsContainer: {
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        top: height - (height * 0.2)

    },
    signInButtonContainer: {

    },
    signInButton: {
        display: 'flex',
        width: width * 0.872,
        height: width * 0.872 * 0.147,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        marginBottom: 10,
    },
    signInButtonText: {
        display: 'flex',
        fontWeight: '500',
        fontSize: 18,
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: 'white'
    },
    signUpButtonContainer: {

    },
    signUpButton: {
        display: 'flex',
        width: width * 0.872,
        height: width * 0.872 * 0.147,
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
    },
    signUpButtonText: {
        display: 'flex',
        fontWeight: '500',
        fontSize: 18,
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#1B0A60'
    },
    text: {
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        top: height * 0.4,
        width: width * 0.8,
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center',
        color: '#FFFFFF'
    },
})

export default LoginScreen;