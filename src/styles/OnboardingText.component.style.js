import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const OnboardingText = StyleSheet.create({
    header: {
        width: width * 0.8,
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 24,
        lineHeight: 32,
        color: '#1B0A60',
        marginTop: height * 0.03,
        marginLeft: 24,
        //marginBottom: 46
    },
    subtitle: {
        width: width * 0.8,
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#1B0A60',
        marginLeft: 24,
        marginTop: 15
    },
    buildFormHeader: {
        width: width * 0.8,
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 24,
        lineHeight: 32,
        color: '#1B0A60',
        marginTop: 35,
        marginLeft: 24,
    }
});

export default OnboardingText;