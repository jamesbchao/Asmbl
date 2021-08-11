import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/* Queries */
import { postsByCommunitySorted, postsBySecondCommunity, postsByThirdCommunity, repostsByCommunity } from '../graphql/queries';

/* Components */
import CommunityJoinButton from '../components/CommunityJoinButton';
import TabSelector from '../components/TabSelector';
import Post from '../components/Post';
import ComingSoonBanner from '../components/ComingSoonBanner';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';
import { getRandomInt } from'../functions/getRandomInt.function';
import { promisify } from '../functions/promisify.function';

/* Styles */
import Header from '../styles/Header.component.style';
import Button from '../styles/Button.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import Graphic from '../../assets/images/Graphic';
import BackButton from '../../assets/images/backButton';
import AddNewPostIcon from '../../assets/images/addNewPost';

var { width, height } = Dimensions.get('window');

const tabNames = [
    'Resources',
    'Connect'
]

export default function CommunityScreen({ navigation, route }) {
    let { id, name } = route.params;
    
    const [selectedTab, setSelectedTab] = useState('Resources');

    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [nt1, snt1] = useState('');
    const [nt2, snt2] = useState('');
    const [nt3, snt3] = useState('');
    const [rnt, srnt] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    /* Sorts new posts fetched by chronological order to display the newest first */
    const sortPosts = (arr) => {
        arr.sort(function(a,b) {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
        })
        return arr;
    }

    const fetchPosts = async() => {
        setIsFetching(true);

        /* Fetches initial posts & reposts */
        const postsData1 = await API.graphql(graphqlOperation(postsByCommunitySorted, { communityID: id, limit: 1, sortDirection: 'DESC' }));
        let postsObj1 = postsData1.data.postsByCommunitySorted.items;
        const next1 = postsData1.data.postsByCommunitySorted.nextToken;

        const postsData2 = await API.graphql(graphqlOperation(postsBySecondCommunity, { secondCommunityID: id, limit: 1, sortDirection: 'DESC' }));
        let postsObj2 = postsData2.data.postsBySecondCommunity.items;
        const next2 = postsData2.data.postsBySecondCommunity.nextToken;

        const postsData3 = await API.graphql(graphqlOperation(postsByThirdCommunity, { thirdCommunityID: id, limit: 1, sortDirection: 'DESC' }));
        let postsObj3 = postsData3.data.postsByThirdCommunity.items;
        const next3 = postsData3.data.postsByThirdCommunity.nextToken;

        const repostsData = await API.graphql(graphqlOperation(repostsByCommunity, { communityID: id, limit: 1, sortDirection: 'DESC'}));
        let repostsObj = repostsData.data.repostsByCommunity.items;
        const rnext = repostsData.data.repostsByCommunity.nextToken;

        repostsObj = await promisify(repostsObj, 'repost');

        /* Creates array of all post & repost objects */

        postsObj2.forEach(p2 => {
            postsObj1.push(p2);
        })

        postsObj3.forEach(p3 => {
            postsObj1.push(p3);
        })

        repostsObj.forEach(r => {
            postsObj1.push(r);
        })

        let arr = sortPosts(postsObj1);

        console.log({arr});

        const user = await getCurrentUser();

        if (user.blocked_accounts) {
            user.blocked_accounts.forEach(blocked => {
                postsObj1 = postsObj1.filter(p => p.userID !== blocked);
            })
        }

        snt1(next1);
        snt2(next2);
        snt3(next3);
        srnt(rnext);
        setPosts([...arr]);
        setIsFetching(false);
        setLoading(false);
    }

    /* Fetches more data as the user scrolls */
    const fetchMorePosts = async() => {

        /* If all next tokens are null, we have loaded all the data */
        if (nt1 === null && nt2 === null && nt3 === null && rnt === null) {
            return;
        }

        let arr = [];
        /* Fetches the next batch of posts if applicable */
        if (nt1 !== null) {
            const postsData1 = await API.graphql(graphqlOperation(postsByCommunitySorted, { communityID: id, limit: 1, nextToken: nt1, sortDirection: 'DESC' }));
            let postsObj1 = postsData1.data.postsByCommunitySorted.items;
            const next1 = postsData1.data.postsByCommunitySorted.nextToken;
            snt1(next1);

            postsObj1.forEach(p => {
                arr.push(p);
            })
        }

        if (nt2 !== null) {
            const postsData2 = await API.graphql(graphqlOperation(postsBySecondCommunity, { secondCommunityID: id, limit: 1, nextToken: nt2, sortDirection: 'DESC' }));
            let postsObj2 = postsData2.data.postsBySecondCommunity.items;
            const next2 = postsData2.data.postsBySecondCommunity.nextToken;
            snt2(next2);

            postsObj2.forEach(p => {
                arr.push(p);
            })
        }

        if (nt3 !== null) {
            const postsData3 = await API.graphql(graphqlOperation(postsByThirdCommunity, { communityID: id, limit: 1, nextToken: nt3, sortDirection: 'DESC' }));
            let postsObj3 = postsData3.data.postsByThirdCommunity.items;
            const next3 = postsData3.data.postsByThirdCommunity.nextToken;
            snt3(next3);

            postsObj3.forEach(p => {
                arr.push(p);
            })
        }

        if (rnt !== null) {
            const repostsData = await API.graphql(graphqlOperation(repostsByCommunity, { communityID: id, limit: 1, nextToken: rnt, sortDirection: 'DESC'}));
            let repostsObj = repostsData.data.repostsByCommunity.items;
            const rnext = repostsData.data.repostsByCommunity.nextToken;
            repostsObj = await promisify(repostsObj, 'repost');

            srnt(rnext);

            repostsObj.forEach(p => {
                arr.push(p);
            })
        }

        let arr2 = sortPosts(arr);

        setPosts([...posts, ...arr2]);
    }

    const renderPost = ({ item, index }) => {

        if (posts.length < 3 && index === posts.length - 1) {
            return (
                <View>
                    <Post postInfo={item} repost={ item.type === 'Repost' ? 'repost' : null } />
                    <ComingSoonBanner i={getRandomInt(0, 3)}/>
                </View>
            )
        }


        if (index !== 0 && index % 3 === 0) {

            return (
                <View>
                    <Post postInfo={item} repost={ item.type === 'Repost' ? 'repost' : null } />
                    <ComingSoonBanner i={getRandomInt(0, 3)}/>
                </View>
            )
        }

        return <Post postInfo={item} repost={ item.type === 'Repost' ? 'repost' : null } />
    }


    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>{name}</Text>
                </View>
                <CommunityJoinButton communityID={id} />
            </View>
            <TabSelector tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item alignItems='center' justifyContent='center'>
                    <SkeletonPlaceholder.Item marginTop={height * 0.01} marginBottom={height * 0.005} width={width} />
                    <SkeletonPlaceholder.Item height={19} width={width} marginVertical={height * 0.01}/>
                    <SkeletonPlaceholder.Item height={width} width={width} />
                    <SkeletonPlaceholder.Item height={height * 0.03} width={width} marginVertical={height * 0.01}/>
                    <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.005}/>
                    <SkeletonPlaceholder.Item height={height * 0.01} width={width} marginVertical={height * 0.001}/>
                    <SkeletonPlaceholder.Item marginTop={height * 0.01} marginBottom={height * 0.005} width={width} />
                    <SkeletonPlaceholder.Item height={19} width={width} marginVertical={height * 0.01}/>
                    <SkeletonPlaceholder.Item height={width} width={width} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </SafeAreaView>
    }
    
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>{name}</Text>
                </View>
                <CommunityJoinButton communityID={id} />
            </View>
            <TabSelector tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <View style={styles.mainContainer}>
                {selectedTab === 'Resources' && <View>
                    {posts.length !== 0 ? 
                        <FlatList 
                            data={posts}
                            renderItem={renderPost}
                            keyExtractor={(item, index) => item.id}
                            contentContainerStyle={styles.flatList}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            onEndReached={fetchMorePosts}
                            onEndReachedThreshold={0.5}
                            refreshing={isFetching}
                            onRefresh={fetchPosts}
                        />
                    : <View style={styles.graphicContainer}>
                        <Graphic/>
                        <Text style={styles.text}>There are no posts in this community yet!</Text>
                        <TouchableOpacity style={Button.defaultButtonShort} onPress={() => navigation.navigate('Share')}>
                            <AddNewPostIcon/>
                            <Text style={Button.whiteText}>Add New Post</Text>
                        </TouchableOpacity>
                    </View>}
                </View>}
                {selectedTab == 'Connect' && <View>
                    <View style={styles.mainContainer}>
                        <Text style={styles.connectText}>Users who post regularly in the {name} community will appear here - reach out and connect!</Text>
                        <Text style={styles.connectText}>Coming Soon!</Text>
                    </View>
                </View>}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    mainContainer: {
        height: height * 0.75,
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
    text: {
        fontFamily: 'Avenir',
        color: '#1B0A60'
    },
    mainContainer: {
        paddingBottom: 72,
    },
    connectText: {
        width: width * 0.9,
        alignSelf: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        marginVertical: height * 0.02
    }
})