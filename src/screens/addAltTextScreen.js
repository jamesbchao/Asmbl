import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
import HeaderBar from '../components/HeaderBar';

import GlobalStyles from '../styles/GlobalStyles.component.style';


var { width, height } = Dimensions.get('window');

export default function AddAltTextScreen({ navigation, route }) {
    let { altTextReceived, image } = route.params;

    const [altText, setAltText] = useState('');

    useEffect(() => {
        if (altTextReceived) setAltText(altTextReceived);
        console.log('altText: ', altText);
    }, [])

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <HeaderBar 
                formComplete={true} 
                title='Alt Text for Photo 1 of 1' 
                nextTitle='Done'
                nextScreen='AddCaption'
                params={{ altTextReceived: altText }}
            />
            <KeyboardAwareScrollView extraHeight={500}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: image}}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Add alternative text here. Describe the image and all elements as specifically as possible.'
                        onChangeText={(val) => setAltText(val)}
                        value={altText}
                        textAlignVertical='top'
                        returnKeyType="done"
                        multiline={true}
                        blurOnSubmit={true}
                        textAlignVertical='top'
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1.25,
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'stretch'
    },
    imageTransparent: {
        width: width,
        height: width,
        resizeMode: 'stretch',
        opacity: 0.3,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 8,
        height: height * 0.2,
        width: width * 0.95,
        alignSelf: 'center',
    },
})