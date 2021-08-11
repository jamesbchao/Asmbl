import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { getPost, repostByUserPost } from '../graphql/queries';

/* Components */
import PopupMenu from './PopupMenu';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';
import { handleRepost } from '../functions/handleRepost.function';
import { handleSave } from '../functions/handleSave.function';

/* Icons */
import Discussions from '../../assets/images/postActionBar/discussions';
import SavePost from '../../assets/images/postActionBar/savePost';
import SavePostEnabled from '../../assets/images/postActionBar/savePostEnabled';
import Links from '../../assets/images/postActionBar/links';
import Reposts from '../../assets/images/postActionBar/reposts';
import RepostsEnabled from '../../assets/images/postActionBar/repostsEnabled';
import More from '../../assets/images/postActionBar/more';
import EditProfileIcon from '../../assets/images/myProfileIcons/editProfileIcon';

const { width, height } = Dimensions.get('window');

const moreOptions = [
    'Report post',
    'View alt text'
]

export default function PostActionBar({ post, postID, isPostScreen }) {
    const navigation = useNavigation();
    const [owned, setOwned] = useState(false);
    const [id, setID] = useState('');
    const [reposted, setReposted] = useState(false);
    const [saved, setSaved] = useState(false);
    const [controller, setController] = useState(true)

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async() => {
        const user = await getCurrentUser();
        setID(user.id);
        if (postID) {
            let postData = await API.graphql(graphqlOperation(getPost, { id: postID }));
            let userID = postData.data.getPost.userID;
            if (user.id === userID) setOwned(true);
        } else {
            if (user.id === post.userID) setOwned(true);
        }


        const repostData = await API.graphql(graphqlOperation(repostByUserPost, { userID: user.id, postID: { eq: post.id }}));
        if (repostData.data.repostByUserPost.items[0]) setReposted(true);

        let savedPosts;
        if (user.saved_posts) savedPosts = user.saved_posts;
        if (savedPosts && (savedPosts.includes(post.id) || savedPosts.includes(post.postID))) setSaved(true);
        setController(!controller);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.discussionsButton} onPress={() => navigation.navigate('CommentsScreen', { postID: post.id })}>
                <Discussions />
                <Text style={styles.text}>Comments</Text>
            </TouchableOpacity>
            {owned ? 
            <TouchableOpacity style={styles.editPostContainer} onPress={() => navigation.navigate('EditPostScreen', { post: post, isPostScreen: isPostScreen })}>
                <EditProfileIcon/>
                <Text style={styles.editPostText}>Edit Post</Text>
            </TouchableOpacity> :
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => handleSave(saved, setSaved, post)}>
                    {saved? <SavePostEnabled /> : <SavePost />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LinksScreen', { postID: post.id })}>
                    <Links />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRepost(reposted, post, id, setReposted)}>
                    {reposted ? <RepostsEnabled /> : <Reposts />}
                </TouchableOpacity>
                <PopupMenu options={moreOptions} postID={post.id} altText={post.altText}/>
            </View> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: width * 0.95,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.01
    },
    discussionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: height * 0.005,
        paddingHorizontal: width * 0.02,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: width * 0.01,
    },
    iconsContainer: {
        flexDirection: 'row',
        width: width * 0.3,
        justifyContent: 'space-between',
    },
    editPostContainer: {
        flexDirection: 'row'
    },
    editPostText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 19,
        color: '#1B0A60',
        marginLeft: width * 0.01,
    }
})


