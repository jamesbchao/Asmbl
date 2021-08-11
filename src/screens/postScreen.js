import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useIsFocused } from '@react-navigation/native';

/* Queries */ 
import { getPost, getRepost } from '../graphql/queries';

/* Components */
import Post from '../components/Post';
import BasicHeader from '../components/BasicHeader';

import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Functions */
import { renderDate } from '../functions/renderDate.function';

const { width, height } = Dimensions.get('window');
const NUM_LINES = 2;

const initialState = {
  image: 'fds',
  caption: '',
  createdAt: '',
}

export default function PostScreen({ navigation, route }) {
  const { postID } = route.params;

  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentPost();
  }, [])

  const getCurrentPost = async() => {
    const postData = await API.graphql(graphqlOperation(getPost, { id: postID }));
    let postObj = postData.data.getPost;

    if (!postObj) {
      const repostData = await API.graphql(graphqlOperation(getRepost, { id: postID }));
      const repostObj = repostData.data.getRepost;
      try {
        const post = await API.graphql(graphqlOperation(getPost, { id: repostObj.postID }));
        postObj = post.data.getPost;
      } catch (err) {
        console.log('error: ', err);
      }
    }

  
    setPost(postObj);
    setLoading(false);
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <BasicHeader name="Post" />
      {loading ? <ActivityIndicator /> : <View>
          <Post postInfo={post} isPostScreen={true}/>
        </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white'
  },
})

