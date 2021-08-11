import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Modal, ScrollView, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import uuid from 'react-native-uuid';

/* Queries */
import { linksByPost, getPost, repostsByPost } from '../graphql/queries';
import { updatePost, deletePost, createLink, updateLink, deleteLink, deleteRepost } from '../graphql/mutations';

/* Components */
import HeaderBar from '../components/HeaderBar';
import ChooseCommunitiesModal from '../components/ChooseCommunitiesModal';
import Community from '../components/Community';
import Link from '../components/Link';
import AddLinkModal from '../components/AddLinkModal';

/* Styles */
import Button from '../styles/Button.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';
import Modals from '../styles/Modals.component.style';

/* Icons */
import ArrowIcon from '../../assets/images/arrowIcon';
import GreenCheckmark from '../../assets/images/greenCheckmark';

var { width, height } = Dimensions.get('window');


export default function EditPostScreen({ navigation, route }) {
    let { post: postInfo, isPostScreen } = route.params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const [communities, setCommunities] = useState([]);

    const [links, setLinks] = useState([]);
    const [newLinks, setNewLinks] = useState([]);
    const [updatedLinks, setUpdatedLinks] = useState([]);
    const [deletedLinks, setDeletedLinks] = useState([]);

    const [caption, setCaption] = useState('');
    const [altText, setAltText] = useState('');

    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [communitiesModalVisible, setCommunitiesModalVisible] = useState(false);
    const [linksModalVisible, setLinksModalVisible] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    useEffect(() => {
        fetchPost();
        //setInitialCommunities();
        //setInitialLinks();
    }, []);

    const fetchPost = async() => {
        let postData = await API.graphql(graphqlOperation(getPost, { id: postInfo.id }));
        let p = postData.data.getPost;
        setCaption(p.caption);
        setAltText(p.altText);
        setPost(p);
        console.log(p);
        setInitialCommunities(p);
    }

    const setInitialCommunities = (p) => {
        let communityArr = [p.community];
        if (p.secondCommunity) communityArr.push(p.secondCommunity);
        if (p.thirdCommunity) communityArr.push(p.thirdCommunity);
        setCommunities(communityArr);
        setInitialLinks(p);
    }

    const setInitialLinks = async(p) => {
        const linksData = await API.graphql(graphqlOperation(linksByPost, { postID: p.id }));
        const linksObj = linksData.data.linksByPost.items;
        linksObj.forEach(link => {
            setLinks([...links, { id: link.id, title: link.title, link: link.link, postID: p.id }]);
        })
        setLinks(linksObj);
        setLoading(false);
    }

    const handleSubmit = async() => {
        let postObj = { 
            id: post.id, 
            communityID: communities[0].id,
            caption: caption, 
            altText: altText, 
            userID: post.userID
        }
        if (communities.length > 1) postObj.secondCommunityID = communities[1].id;
        if (communities.length > 2) postObj.thirdCommunityID = communities[2].id;


        const updatedPost = await API.graphql(graphqlOperation(updatePost, { input: postObj }))
        console.log('updated post: ', updatedPost);

        updatedLinks.forEach(async(link) => {
            await API.graphql(graphqlOperation(updateLink, { input: link }));
        })

        newLinks.forEach(async(link) => {
            await API.graphql(graphqlOperation(createLink, { input: link }));
        })
        
        deletedLinks.forEach(async(id) => {
            await API.graphql(graphqlOperation(deleteLink, { input: { id: id } }))
        })
    }

    const handleDeletePost = async() => {

        const repostsData = await API.graphql(graphqlOperation(repostsByPost, { postID: post.id }));
        let repostsObj = repostsData.data.repostsByPost.items;
        repostsObj.forEach(async(r) => {
           const deletedRepost = await API.graphql(graphqlOperation(deleteRepost, { input: { id: r.id }}));
           console.log('successfully deleted repost: ', deletedRepost);
        })

        const deletedPost = await API.graphql(graphqlOperation(deletePost, { input: { id: post.id }}));
        console.log('successfully deleted post: ', deletedPost);


        if (isPostScreen) {
            navigation.navigate('My Profile');
        } else {
            navigation.goBack();
        }
    }

    const editAltTextButton = () => {
        return (
            <View style={styles.editAltTextButton}>
                <Text style={styles.editAltTextButtonText}>Edit Alt Text</Text>
                <ArrowIcon/>
            </View>
        )
    }

    const addLink = () => {
        if (title === '' || link === '') return;
        setLinksModalVisible(false);
        const linkObj = {
            title: title,
            link: link,
            postID: post.id
        };
        if (id !== '') {
            linkObj.id = id;
            setUpdatedLinks([...updatedLinks, linkObj]);
            const linksArr = links.filter(link => link.id !== id);
            linksArr.push(linkObj);
            setLinks([...linksArr]);
        } else {
            linkObj.id = uuid.v4();
            setNewLinks([...newLinks, linkObj]);
            setLinks([...links, linkObj])
        }
        setID('');
        console.log('new links: ', newLinks);
        console.log('updated links: ', updatedLinks);
    }

    const removeLink = (index) => {
        let linkArr = links;
        let id = linkArr[index].id;
        setDeletedLinks([...deletedLinks, id]);
        linkArr.splice(index, 1);
        setLinks([...linkArr]);
    }

    const editLink = (index) => {
        setEditMode(true);
        let selectedLink = links[index];
        setID(selectedLink.id);
        setTitle(selectedLink.title);
        setLink(selectedLink.link);
        setLinksModalVisible(true);
    }

    const addCommunities = (selectedCommunities) => {
        if (selectedCommunities.length === 0) return;
        setLinksModalVisible(false); 
        setCommunities(selectedCommunities);
    }

    const deleteCommunity = (index) => {
        let communityArr = communities;
        communityArr.splice(index, 1);
        setCommunities([...communityArr]);
    }

    if (loading) {
        return <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <HeaderBar 
                formComplete={false} 
                title='Edit Post' 
                nextTitle='Save'
            />
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator />
            </View>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <HeaderBar 
            formComplete={true} 
            title='Edit Post' 
            nextTitle='Save'
            nextScreen='PostScreen'
            params={{ postID: post.id, username: post.user?.user_name }}
            callback={handleSubmit}
            showSuccessModal={false}
        />
        <ScrollView>
            <View style={styles.imageCaptionContainer}>
                <Image style={styles.image} source={{uri: post.image}} />
                <TextInput
                    style={styles.input}
                    placeholder='Type a caption...'
                    onChangeText={(val) => setCaption(val)}
                    value={caption}
                    multiline={true}
                    textAlignVertical='top'
                    returnKeyType="done"
                    multiline={true}
                    blurOnSubmit={true}
                />
            </View>
            <View style={styles.altTextContainer}>
                <Text style={styles.boldText}>Alt Text</Text>
                <Text style={styles.text}>Asmbl encourages you to add alternative text to your images to make posts more accessible.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddAltText', { altTextReceived: altText, image: post.image })}>
                    {editAltTextButton()}
                </TouchableOpacity>
            </View>
            <View style={styles.communityTextContainer}>
                <Text style={styles.boldText}>Community</Text>
                <Text style={styles.text}>Choose up to three (3) communities you'd like your post to appear in.</Text>
            </View>
            {communities.length !== 0 && communities.map((community, index) => <Community key={community.id} community={community} index={index} deleteCommunity={deleteCommunity}/>)}
            <TouchableOpacity style={Button.defaultButton} onPress={() => setCommunitiesModalVisible(true)}>
                <Text style={Button.defaultText}>Choose Communities</Text>
            </TouchableOpacity>
            {communitiesModalVisible && <ChooseCommunitiesModal modalVisible={communitiesModalVisible} setModalVisible={setCommunitiesModalVisible} addCommunities={addCommunities} />}
            <View style={styles.linksTextContainer}>
                <Text style={styles.boldText}>Links</Text>
                <Text style={styles.text}>Add links to your post - these can be event links, sources, links to additional resources, or other applicable links you see fit.</Text>
            </View>
            <View style={{alignItems: 'center', marginBottom: height * 0.02}}>
                {links.length !== 0 && links.map((link, index) => <Link key={link.id} link={link} index={index} deleteLink={removeLink} editLink={editLink} showButtons={true}/>)}
            </View> 
            {linksModalVisible && <AddLinkModal modalVisible={linksModalVisible} setModalVisible={setLinksModalVisible} editMode={editMode} setTitle={setTitle} title={title} setLink={setLink} link={link} setEditMode={setEditMode} addLink={addLink} />}
            <TouchableOpacity style={Button.defaultButton} onPress={() => setLinksModalVisible(true)}>
                <Text style={Button.defaultText}>Add New Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deletePost} onPress={() => setConfirmationModalVisible(true)}>
                <Text style={styles.deletePostText}>Delete Post</Text>
            </TouchableOpacity>
            {confirmationModalVisible && 
                <Modal
                    visible={confirmationModalVisible}
                    coverScreen={false}
                    animationType='slide'
                    backdropColor='black'
                    transparent={true}
                    backdropOpactiy={0.70}
                    onBackdropPress={() => setConfirmationModalVisible(false)}
                >
                    <View style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.logOutContainer}>
                                <Text style={Modals.header}>Are you sure you want to delete this post?</Text>
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => setConfirmationModalVisible(false)}>
                                        <Text style={Modals.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Modals.enabledModalSubmitButton} onPress={() => {
                                        setConfirmationModalVisible(false);
                                        handleDeletePost();
                                    }}>
                                        <Text style={Modals.enabledModalSubmitText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </ScrollView>
        
    </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    imageCaptionContainer: {
        flexDirection: 'row',
        width: width * 0.92,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 8,
        flex: 1,
        height: height * 0.1,
        marginLeft: height * 0.01,
    },
    altTextContainer: {
        width: width * 0.92,
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: height * 0.1,
        marginTop: height * 0.02
    },
    editAltTextButton: {
        flexDirection: 'row'
    },
    boldText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 19,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#4B4B4B',
    },
    editAltTextButtonText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#1B0A60'
    },
    altTextAddedText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#3C782D',
        marginRight: width * 0.01
    },
    communityTextContainer: {
        width: width * 0.92,
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: height * 0.066,
        marginVertical: height * 0.02,
    },
    linksTextContainer: {
        width: width * 0.92,
        alignSelf: 'center',
        marginTop: height * 0.02,
        justifyContent: 'space-between',
        height: height * 0.066,
        marginBottom: height * 0.02
    },
    deletePost: {
        alignSelf: 'center',
        marginTop: height * 0.05,
        paddingBottom: height * 0.05
    },
    deletePostText: {
        fontWeight: 'bold',
        color: 'red'
    }
})