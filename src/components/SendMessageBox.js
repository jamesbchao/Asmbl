import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Input from '../styles/Input.component.style';
import SendIcon from '../../assets/images/sendIcon';

const { width, height } = Dimensions.get('window');

export default function SendMessageBox({ input, setInput, handleSubmit }) {
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container} enabled>
            <View style={styles.inner}>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setInput(val)}
                    value={input}
                    placeholder='Type your message here...'
                    returnKeyType="done"
                    multiline={true}
                    blurOnSubmit={true}
                    textAlignVertical='top'
                />
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleSubmit()}>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: height * 0.2,
        width: width * 0.9,
        alignSelf: 'center',
        flex: 1,
    },
    inner: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: width * 0.02
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        //marginVertical: 10,
        //paddingHorizontal: 15,
        //paddingVertical: 10,
        height: height * 0.2, 
        width: width * 0.9,
        //alignSelf: 'center'
    },
})