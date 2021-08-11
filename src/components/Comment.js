import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { deleteComment, updateComment } from '../graphql/mutations';

/* Functions */
import { renderDate } from '../functions/renderDate.function';

/* Styles */
import Button from '../styles/Button.component.style';

/* Icons */
import XButton from '../../assets/images/addLinks/xButton';
import EditButton from '../../assets/images/addLinks/editButton';

const { width, height } = Dimensions.get('window');

export default function Comment({ comment, callback }) {

    const [owned, setOwned] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState(comment.content);

    useEffect(() => {
        fetchCurrentUser();
    },[]);

    const fetchCurrentUser = async() => {
        let { username } = await Auth.currentUserInfo();
        if ( username === comment.username) setOwned(true);
    }

    const handleDeleteComment = async() => {
        const deletedComment = await API.graphql(graphqlOperation(deleteComment, { input: { id: comment.id } }));

        callback();
    }

    const handleEditComment = async() => {
        setEditMode(true);
    }

    const handleUpdateComment = async() => {
        let newComment = {
            id: comment.id,
            content: input,
            postID: comment.postID,
            userID: comment.userID,
        }

        const updatedComment = await API.graphql(graphqlOperation(updateComment, { input: newComment }));

        setEditMode(false);
        callback();
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.username}>@{comment.username}</Text>
                <Text style={styles.date}>{renderDate(comment.createdAt)}</Text>
            </View>
            {editMode ? <View>
                <TextInput 
                    style={styles.input}
                    placeholder='Type here...'
                    onChangeText={(val) => setInput(val)}
                    value={input}
                    textAlignVertical='top'
                    returnKeyType="done"
                    multiline={true}
                    blurOnSubmit={true}
                />
            </View> : 
            <Text style={styles.content}>{comment.content}</Text>
            }
            {owned && !editMode && <View style={Button.buttonContainer}>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => handleDeleteComment()}>
                        <XButton/>
                        <Text style={Button.deleteText}>Delete comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => handleEditComment()}>
                        <EditButton/>
                        <Text style={Button.editText}>Edit comment</Text>
                    </TouchableOpacity>
            </View>}
            {editMode && <View style={Button.buttonContainer}>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => setEditMode(false)}>
                        <Text style={Button.deleteText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => handleUpdateComment()}>
                        <Text style={Button.editText}>Save</Text>
                    </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        width: width * 0.95,
        marginTop: 20,
        alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        width: width * 0.85,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: height * 0.02,
    },
    username: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 19,
        color: '#4B4B4B'
    },
    date: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#4B4B4B'
    },
    content: {
        width: width * 0.85,
        alignSelf: 'center',
        marginBottom: height * 0.02,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: width * 0.02
    },
    
})