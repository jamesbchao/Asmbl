import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/* Queries */
import { postsByType } from '../graphql/queries';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Components */
import BasicHeader from '../components/BasicHeader';
import CommunityBar from '../components/CommunityBar';
import Post from '../components/Post';
import { ComingSoonBanner } from '../components/ComingSoonBanner';

/* Styles */
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import Graphic from '../../assets/images/Graphic';

var { width, height } = Dimensions.get('window');

export default function HomeFeedScreen({  }) {

    useEffect(() => {
        fetchData();
    }, [])

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    const [nextToken, setNextToken] = useState('');
    const [repostNextToken, setRepostNextToken] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [filter, setFilter] = useState(null);
    const [noCommunities, setNoCommunities] = useState(false);

    /* Sorts new posts fetched by chronological order to display the newest first */
    const sortPosts = (arr) => {
        arr.sort(function(a,b) {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
        })
        return arr;
    }

    /* Fetches the initial data */
    const fetchData = async() => {
        setIsFetching(true);

        const user = await getCurrentUser();
        let joinedCommunities = user.joined_communities;

        if (!joinedCommunities) {
            setNoCommunities(true);
            setLoading(false);
            return;
        }

        let cids = [];

        /* Creates the filter by allowing only posts from joined communities to be fetched */
        joinedCommunities.forEach((c) => {
            cids.push({
                communityID: {
                    eq: c
                }
            });
            cids.push({
                secondCommunityID: {
                    eq: c
                }
            });
            cids.push({
                thirdCommunityID: {
                    eq: c
                }
            });
        });

        const filterObj = {
            or: cids
        };
        setFilter(filterObj);


        /* Fetches initial posts & reposts */
        const postsData = await API.graphql(graphqlOperation(postsByType, { type: 'Post', limit: 2, filter: filterObj, sortDirection: 'DESC' }));
        let postsObj = postsData.data.postsByType.items;
        const nt = postsData.data.postsByType.nextToken;

        const repostsData = await API.graphql(graphqlOperation(postsByType, { type: 'Repost', limit: 2, filter: filterObj, sortDirection: 'DESC' }));
        const repostsObj = repostsData.data.postsByType.items;
        const rnt = repostsData.data.postsByType.nextToken;

        /* Creates array of all post & repost objects */
        repostsObj.forEach(r => {
            postsObj.push(r);
        })
        let arr = sortPosts(postsObj);

        /* Sets next tokens for pagination */
        setNextToken(nt);
        setRepostNextToken(rnt);
        setData([...arr]);
        setIsFetching(false);
        setLoading(false);
    }

    /* Fetches more data as the user scrolls */
    const fetchMoreData = async() => {
        setLoadingMore(true);

        /* If both next tokens are null, we have loaded all the data */
        if (nextToken === null && repostNextToken === null) {
            setLoadedAll(true);
            setLoadingMore(false);
            console.log('loaded all posts');
            return;
        }

        let arr = [];
        /* Fetches the next batch of posts if applicable */
        if (nextToken !== null) {
            const postsData = await API.graphql(graphqlOperation(postsByType, { type: 'Post', limit: 2, filter: filter, nextToken: nextToken, sortDirection: 'DESC' }));
            let postsObj = postsData.data.postsByType.items;
            const nt = postsData.data.postsByType.nextToken;
            setNextToken(nt);

            postsObj.forEach(p => {
                arr.push(p);
            })
        }

        /* Fetches the next batch of reposts if applicable */
        if (repostNextToken !== null) {
            const repostsData = await API.graphql(graphqlOperation(postsByType, { type: 'Repost', limit: 2, filter: filter, nextToken: repostNextToken, sortDirection: 'DESC' }));
            const repostsObj = repostsData.data.postsByType.items;
            const rnt = repostsData.data.postsByType.nextToken;
            setRepostNextToken(rnt);

            repostsObj.forEach(r => {
                arr.push(r);
            });
        }


        let arr2 = sortPosts(arr);
        console.log({nextToken, repostNextToken});
        console.log({arr2});

        setData([...data, ...arr2]);
        setLoadingMore(false);

    }

    /* Renders each post/repost */
    const renderItem = ({ item }) => (
        <View>
            <CommunityBar id={item.communityID} />
            <Post postInfo={item} repost={ item.type === 'Repost' ? 'repost' : null } />
        </View>
    )

    if (noCommunities) {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <BasicHeader name='Home Feed' />
                <Text style={styles.text}>Your Home Feed shows posts from all communities you've joined.</Text>
                <View style={styles.graphicContainer}>
                    <Graphic/>
                    <Text style={styles.graphicText}>You haven't joined any communities yet!</Text>
                </View>
            </SafeAreaView>
        )
    }


    if (loading) {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <BasicHeader name='Home Feed'/>
                <Text style={styles.text}>Your Home Feed shows posts from all communities you've joined.</Text>
                <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item alignItems='center' justifyContent='center'>
                        <SkeletonPlaceholder.Item height={height * 0.05} width={width} marginTop={height * 0.01} />
                        <SkeletonPlaceholder.Item height={19} width={width} marginVertical={height * 0.01}/>
                        <SkeletonPlaceholder.Item height={width} width={width} />
                        <SkeletonPlaceholder.Item height={height * 0.03} width={width} marginVertical={height * 0.01}/>
                        <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.005}/>
                        <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.001}/>
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item alignItems='center' justifyContent='center'>
                        <SkeletonPlaceholder.Item height={height * 0.05} width={width} marginTop={height * 0.01} />
                        <SkeletonPlaceholder.Item height={19} width={width} marginVertical={height * 0.01}/>
                        <SkeletonPlaceholder.Item height={width} width={width} />
                        <SkeletonPlaceholder.Item height={height * 0.03} width={width} marginVertical={height * 0.01}/>
                        <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.005}/>
                        <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.001}/>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Home Feed' />
            <Text style={styles.text}>Your Home Feed shows posts from all communities you've joined.</Text>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.5}
                refreshing={isFetching}
                onRefresh={fetchData}
            />
            {loadingMore && <ActivityIndicator size='large'/>}
            {loadedAll && <Text style={{fontSize: 24, color: 'red'}}>LOADED ALL POSTS</Text>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        width: width * 0.9,
        alignSelf: 'center',
        marginVertical: height * 0.01,
    },
    graphicText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        width: width * 0.9,
        alignSelf: 'center',
        marginVertical: height * 0.01,
        textAlign: 'center',
    },
    mainContainer: {
        height: height * 0.76,
    },
    flatList: {
        paddingBottom: height * 0.05
    },
    graphicContainer: {
        alignItems: 'center',
        marginVertical: height * 0.15,
        height: height * 0.3,
        justifyContent: 'space-between'
    },
})
