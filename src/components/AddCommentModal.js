import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';

/* Queries */
import { userByUsername, getPost } from '../graphql/queries';
import { createComment, createNotification, updateUser } from '../graphql/mutations';

/* Styles */
import Modals from '../styles/Modals.component.style';

const { width, height } = Dimensions.get('window');

export default function AddCommentModal({ modalVisible, setModalVisible, postID, callback }) {

    const [input, setInput] = useState('');

    const handleSubmit = async() => {
        if (input === '') return;
        setModalVisible(false);

        const { username } = await Auth.currentUserInfo();
        const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
        const userObj = userData.data.userByUsername.items[0];
        const userID = userObj.id;

        const commentObj = {
            content: input,
            postID: postID,
            userID: userID,
            username: username,
        }

        const createdComment = await API.graphql(graphqlOperation(createComment, { input: commentObj }));
        setInput('');

        //query post from postID
        const postData = await API.graphql(graphqlOperation(getPost, { id: postID }));
        const postObj = postData.data.getPost;

        let notification = {
            type: 'Comment',
            username: username,
            userID: postObj.userID,
            content: input,
            image: postObj.image,
        }

        const createdNotification = await API.graphql(graphqlOperation(createNotification, { input: notification }));


        let user = {
            id: postObj.userID,
            hasNewNotifications: true
        }
        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: user }));
        Analytics.record('createdComment', { id: createdComment.data?.createComment?.id, postID: postID, userID: userID});
        callback();
    }

    return (
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
                        <Text style={Modals.header}>Add a comment</Text>
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
                                }}>
                                <Text style={input !== '' ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Add</Text>
                            </TouchableOpacity>
                        </View>
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

