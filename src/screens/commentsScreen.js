import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'

/* Queries */
import { commentsByPost } from '../graphql/queries';

/* Components */
import AddCommentModal from '../components/AddCommentModal';
import Comment from '../components/Comment';

/* Styles */
import Header from '../styles/Header.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Icons */
import BackButton from '../../assets/images/backButton';
import AddCommentIcon from '../../assets/images/addCommentIcon';

const { width, height } = Dimensions.get('window');

export default function CommentsScreen({ navigation, route }) {
    const { postID, postUserID } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = async() => {
        const commentsData = await API.graphql(graphqlOperation(commentsByPost, { postID: postID, sortDirection: 'DESC' }));
        let commentsObj = commentsData.data.commentsByPost.items;
        setComments([...commentsObj]);
        console.log('commentsObj: ', commentsObj);
    }


    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton/>
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Comments</Text>
                </View>
                <TouchableOpacity style={styles.addCommentButton} onPress={() => setModalVisible(true)}>
                    <AddCommentIcon/>
                    <Text style={styles.addCommentText}>Add Comment</Text>
                </TouchableOpacity>
            </View>
            {modalVisible && <AddCommentModal modalVisible={modalVisible} setModalVisible={setModalVisible} postID={postID} callback={fetchComments}/>}
            <ScrollView contentContainerStyle={styles.commentsContainer}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} callback={fetchComments}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    addCommentButton: {
        flexDirection: 'row',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1B0A60',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    addCommentText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#1B0A60',
        marginLeft: width * 0.01,
    },
    commentsContainer: {
        paddingBottom: height * 0.15,
    }
})
