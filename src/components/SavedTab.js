import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Queries */
import { getPost } from '../graphql/queries';

const { width, height } = Dimensions.get('window');

export default function SavedTab({ user }) {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const id = user.id;

    useEffect(() => {
        fetchPosts();
    }, [isFocused]);

    const fetchPosts = async() => {
        if (!user.saved_posts) {
            setLoading(false); 
            return;
        }

        try {
            let arr = await Promise.all(user.saved_posts.map(async(post) => {
                const postData = await API.graphql(graphqlOperation(getPost, { id: post }));
                let postObj = postData.data.getPost;
                return postObj;
            }))

            setPosts([...arr]);
            setLoading(false);
        } catch (err) {
            console.log('error fetching posts: ', err);
        }

        setLoading(false);
    }

    const renderPost = ({ item }) => {
        return (
            <View>
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('PostScreen', { postID: item.id, username: item.user.user_name })}>
                    <Image source={{uri: item.image}} style={styles.image} />
                </TouchableOpacity>
            </View>
        )
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection='row' flexWrap='wrap' width={(width * 0.9) + (height * 0.001) * 12} alignSelf='center' marginTop={height * 0.01}>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
                <SkeletonPlaceholder.Item width={width * 0.3} height={width * 0.3} margin={height * 0.001}/>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </SafeAreaView>
    }

    return (
        <View style={styles.container}>
           {loading ? <Text>loading...</Text> : <FlatList 
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
           /> }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {

    },
    flatList: {
        width: width * 0.93,
        flexDirection: 'column',
    },
    imageContainer: {
        margin: height * 0.001,
    },
    image: {
        width: (width * 0.9) / 3,
        height: (width * 0.9) / 3
    }
})
