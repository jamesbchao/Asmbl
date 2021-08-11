import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import Logo from '../../assets/images/logoDark.svg';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

export default function LandingPage({navigation}) {

  //const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async() => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user.username)
      //setLoggedIn(true);
      //console.log(loggedIn);

      setTimeout(() => {
        navigation.navigate('Home');
      }, 750);

    } catch (err) {
      console.log('error: ', err);
      //setLoggedIn(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 750);
    }
/*
    setTimeout(() => { 
      console.log('loggedIn: ', loggedIn)
      loggedIn ? navigation.navigate('Home') : navigation.navigate('Login');                
    }, 750);
*/
  }

  return (
    <View style={styles.container}>
        <Logo style={styles.logo}></Logo>
        <View style={styles.container}>
            <Text style={styles.appName}>Asmbl</Text>
        </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  appName: {
    fontSize: 36,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    position: 'absolute',
    fontStyle: 'normal',
    color: '#1B0A60',
    top: 458,
    left: WIDTH/2 -53,
  },
  container: {
    position: 'absolute',
  },
  logo: {
    zIndex: 1,
    top: 279,
    left: WIDTH / 2 - 86,
    position: 'absolute',
  }
});

