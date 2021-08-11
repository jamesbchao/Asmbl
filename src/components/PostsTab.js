import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import {API, graphqlOperation } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/* Queries */
import { postsByUserSorted } from '../graphql/queries';

/* Styles */
import Profile from '../styles/Profile.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


var { width, height } = Dimensions.get('window');

export default function PostsTab({user}) {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, [isFocused])

  const getPosts = async() => {
    const postsData = await API.graphql(graphqlOperation(postsByUserSorted, { userID: user.id, sortDirection: 'DESC' }));
    let postsArray = postsData.data.postsByUserSorted.items;

    setPosts(postsArray);
    setLoading(false);
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

  return <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      {posts.map((post) => (
        <TouchableOpacity key={post.id} style={styles.imageContainer} onPress={() => navigation.navigate('PostScreen', { postID: post.id, username: user.user_name })}>
          <Image style={styles.image} source={{uri: post.image}}/>
        </TouchableOpacity>
      ))}
    </ScrollView>  
  </View>;
}

const styles = StyleSheet.create({
  container: {
    height: width * 0.93
  },
    scrollViewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (width * 0.9) + (height * 0.001) * 6,
      alignSelf: 'center',
      marginTop: height * 0.01,
      //overflow: 'hidden'
      //height: (width * 0.9)
    },
    imageContainer: {
      margin: height * 0.001,
    },
    image: {
      width: (width * 0.9) / 3,
      height: (width * 0.9) / 3
    }
})
