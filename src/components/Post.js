import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, /*Image,*/ TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import { useNavigation } from '@react-navigation/native';

/* Components */
import PostActionBar from './PostActionBar';

/* Functions */
import { renderDate } from '../functions/renderDate.function';

/* Styles */
import PostStyle from '../styles/Post.component.style';

/* Icons */
import RepostIcon from '../../assets/images//smallRepostIcon';

const NUM_LINES = 2;

const initialState = {
    user: {
        user_name: ''
    },
    createdAt: '',
    image: 'd',
    caption: '',
}

const { width, height } = Dimensions.get('window');

export default function Post({ postInfo, repost, isPostScreen }) {

    const navigation = useNavigation();

    const [post, setPost] = useState(initialState);

    const [truncated, setTruncated] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);

    const onTextLayout = useCallback(e => {
        setTruncated(e.nativeEvent.lines.length >= NUM_LINES);
    }, []);

    useEffect(() => {
        if (repost) console.log('post:', postInfo);
        setPost(postInfo);
    }, []);

    if (repost) {
        return (
            <View style={styles.container}>
                <View style={PostStyle.repostContainer}>
                    <RepostIcon />
                    <Text onPress={() => navigation.navigate('UserProfileScreen', { username: post.reposter })} style={PostStyle.boldTextMargin}>reposted by @{post.reposter}</Text>
                </View>
                <View style={PostStyle.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', { username: post.username})}>
                        <Text style={PostStyle.boldText}>@{post.username}</Text>
                    </TouchableOpacity>
                    <Text style={PostStyle.text}>{post.date}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { postID: post.postID, username: post.username})}>
                    <Image indicator={ProgressCircle} style={PostStyle.image} source={{uri: post.post?.image}}/>
                </TouchableOpacity>
                <PostActionBar post={{...postInfo.post, type: 'repost'}} postUsername={post.username} postID={post.id} isPostScreen={isPostScreen}/>
                <View style={PostStyle.captionContainer}>
                <Text numberOfLines={showReadMore ? null : NUM_LINES} onTextLayout={onTextLayout}>
                    <Text style={PostStyle.boldText}>@{post.username} </Text>
                    <Text style={PostStyle.text}>{post.caption}</Text>
                </Text>
                {truncated && <Text style={PostStyle.readMore} onPress={() => setShowReadMore(!showReadMore)}>{showReadMore ? 'Read Less' : 'Read More'}</Text>}
                </View>
            </View>
        )
    }
    

    return (
        <View style={styles.container}>
            <View style={PostStyle.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', { username: post.user.user_name})}>
                    <Text style={PostStyle.boldText}>@{post.user.user_name}</Text>
                </TouchableOpacity>
                <Text style={PostStyle.text}>{renderDate(post.createdAt)}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { postID: post.id, username: post.user.user_name})}>
                <Image indicator={ProgressCircle} style={PostStyle.image} source={{uri: post.image}}/>
            </TouchableOpacity>
            <PostActionBar post={postInfo} postUsername={post.user.user_name} postID={post.postID} isPostScreen={isPostScreen}/>
            <View style={PostStyle.captionContainer}>
            <Text numberOfLines={showReadMore ? null : NUM_LINES} onTextLayout={onTextLayout}>
                <Text style={PostStyle.boldText}>@{post.user.user_name} </Text>
                <Text style={PostStyle.text}>{post.caption}</Text>
            </Text>
            {truncated && <Text style={PostStyle.readMore} onPress={() => setShowReadMore(!showReadMore)}>{showReadMore ? 'Read Less' : 'Read More'}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: height * 0.02,
    }
})