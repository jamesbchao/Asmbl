import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser'

/* Components */
import BasicHeader from '../../components/BasicHeader';

import GlobalStyles from '../../styles/GlobalStyles.component.style';


const { width, height } = Dimensions.get('window');

const URL = 'https://www.pulsepolicy.com/policy-center/60d63915a4551f0004852d1b';

export default function PrivacyPolicyScreen({ navigation }) {

    const handleOpenWebBrowser = async() => {
        WebBrowser.openBrowserAsync(URL);
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Asmbl Privacy & Legal Policy' />
            <TouchableOpacity onPress={() => handleOpenWebBrowser()}>
                <Text style={styles.text}>Press here to view Asmbl's privacy policy.</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    text: {
        fontFamily: 'Avenir',
        width: width * 0.9,
        alignSelf: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#4B4B4B',
        marginTop: height * 0.01
    }
})