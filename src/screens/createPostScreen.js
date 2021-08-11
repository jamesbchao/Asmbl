import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/* Styles */
import Profile from '../styles/Profile.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import AsmblLogoBlue from '../../assets/images/createPost/asmblLogoBlue';
import CanvaLogo from '../../assets/images/createPost/canvaLogo';
import CreatePostIcon from '../../assets/images/createPost/createPostIcon';
import ImageIcon from '../../assets/images/createPost/imageIcon';

const { width, height } = Dimensions.get('window');

export default function CreatePostScreen({ navigation }) {

  const handlePickImage = async() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.navigate('AddLinks', {
        image: result.uri
      })
    }
  }

  const handleCanvaButton = async() => {
    console.log('canva button');
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={Profile.headerContainer}>
        <Text style={Profile.headerText}>Add a Post</Text>
        <View style={Profile.headerIconsContainer}>
          <AsmblLogoBlue />
          <Text style={Profile.headerText}>Asmbl</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <CreatePostIcon />
        </View>
        <Text style={styles.text}>Share your resource, information, event, or infographic on Asmbl.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handlePickImage()}>
            <ImageIcon/>
            <Text style={styles.buttonText}>Upload from Camera Roll</Text>
          </TouchableOpacity>
        </View>
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
    display: 'flex',
    justifyContent: 'space-between',
    height: height * 0.55
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: height * 0.05
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Avenir',
    lineHeight: 24,
    color: '#1B0A60',
  },
  buttonsContainer: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: height * 0.1
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#1B0A60',
    //width: width * 0.7
  },
  canvaButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#1B0A60',
    width: width * 0.5,
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    color: 'white',
    marginLeft: 10
  }
});