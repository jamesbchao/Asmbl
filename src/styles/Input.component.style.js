import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Input = StyleSheet.create({
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: height * 0.2, 
        width: width * 0.9,
        alignSelf: 'center'
    },
});

export default Input;