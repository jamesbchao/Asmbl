import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

/* Queries */
import { userByUsername, getPost } from '../graphql/queries';
import { createComment, createNotification, updateUser } from '../graphql/mutations';

/* Styles */
import Modals from '../styles/Modals.component.style';
import Input from '../styles/Input.component.style';

import SendIcon from '../../assets/images/sendIcon'

const { width, height } = Dimensions.get('window');

export default function SendMessageModal({ input, setInput, handleSubmit }) {

    return (
        <Modal
            visible={true}
            coverScreen={false}
            transparent={true}
            animationType='none'
        >
            <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                <View style={Modals.modalView}>
                    <View style={Modals.modalContainer}>
                        <TextInput
                            style={Input.input}
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
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: height * 0.2, 
        width: width * 0.7,
    },
})

