import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Queries */
import { repostsByUser } from '../graphql/queries';

const { width, height } = Dimensions.get('window');


export default function RepostsTab({ user }) {

    const [reposts, setReposts] = useState([]);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const id = user.id;

    useEffect(() => {
        fetchReposts();
    }, [isFocused]);

    const fetchReposts = async() => {
        try {
            //setLoading(true);
            const repostsData = await API.graphql(graphqlOperation(repostsByUser, { userID: id, sortDirection: 'DESC' }));
            let repostsObj = repostsData.data.repostsByUser.items;

            setReposts(repostsObj);
            setLoading(false);
        } catch (err) {
            console.log('error fetching reposts: ', err);
        }

    }

    const renderRepost = ({ item }) => {
        return (
            <View>
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('PostScreen', { postID: item.post.id, username: item.user.user_name })}>
                    <Image source={{uri: item.post.image}} style={styles.image} />
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
                data={reposts}
                renderItem={renderRepost}
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
