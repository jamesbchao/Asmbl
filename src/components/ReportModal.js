import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import { API, graphqlOperation, Analytics } from 'aws-amplify';

/* Queries */
import { createFeedback } from '../graphql/mutations';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Modals from '../styles/Modals.component.style';

const { width, height } = Dimensions.get('window');

export default function ReportModal({ modalVisible, setModalVisible, postID, userID, setSuccess }) {

    const [input, setInput] = useState('');

    const handleSubmit = async() => {
        if (input === '') return;
        setModalVisible(false);

        let user = await getCurrentUser();

        let feedbackObj = {
            type: 'Report',
            userID: user.id,
            username: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            content: input,
        }

        if (postID) feedbackObj.postID = postID;
        if (userID) feedbackObj.reporteeID = userID;

        let createdFeedback = await API.graphql(graphqlOperation(createFeedback, { input: feedbackObj }));
        Analytics.record('reportPost', { postID: postID, userID: userID, report: input });
        setSuccess(true);
    }

    return (
        <View>
            <Modal
                visible={modalVisible}
                coverScreen={false}
                animationType='slide'
                backdropColor='black'
                transparent={true}
                backdropOpactiy={0.70}
                onBackdropPress={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                    <View style={Modals.modalView}>
                        <View style={Modals.modalContainer}>
                            <Text style={Modals.header}>Report this {postID ? 'post' : 'user'}</Text>
                            <Text style={Modals.body}>Asmbl takes hate speech and misinformation seriously. Please describe your reasoning for reporting below and we will review the {postID ? 'post' : 'user'} promptly. Thank you for being a part of the community!</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder='Type here...'
                                onChangeText={(val) => setInput(val)}
                                value={input} 
                                textAlignVertical='top'
                                multiline={true}
                                returnKeyType="done"
                                blurOnSubmit={true}
                            />
                            <View style={Modals.modalButtonsContainer}>
                                <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                                    setModalVisible(false);
                                    setInput('');
                                }}>
                                    <Text style={Modals.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={input !== '' ? Modals.enabledModalSubmitButton : Modals.disabledModalSubmitButton}
                                    onPress={() => {
                                        handleSubmit();
                                        setInput('');
                                    }}>
                                    <Text style={input !== '' ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
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
        height: height * 0.15, 
    },
})

