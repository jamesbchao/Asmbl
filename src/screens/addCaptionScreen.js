import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { API, graphqlOperation, Auth, Storage, Analytics } from 'aws-amplify';
import uuid from 'react-native-uuid';

/* Queries */
import { userByUsername } from '../graphql/queries'
import { createPost, createLink } from '../graphql/mutations';

/* Components */
import HeaderBar from '../components/HeaderBar';
import ChooseCommunitiesModal from '../components/ChooseCommunitiesModal';
import Community from '../components/Community';

/* Styles */
import Button from '../styles/Button.component.style';

/* Icons */
import ArrowIcon from '../../assets/images/arrowIcon';
import GreenCheckmark from '../../assets/images/greenCheckmark';

import GlobalStyles from '../styles/GlobalStyles.component.style';

var { width, height } = Dimensions.get('window');

export default function AddCaptionScreen({ navigation, route }) {
    let { image, links, altTextReceived } = route.params;

    const isFocused = useIsFocused();

    const [communities, setCommunities] = useState([]);
    const [caption, setCaption] = useState('');
    const [altText, setAltText] = useState('');
    const [userID, setUserID] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (altTextReceived) setAltText(altTextReceived);
        getCurrentUser();
    }, [route.params, isFocused]);

    const getCurrentUser = async() => {
        const { username } = await Auth.currentUserInfo();
        const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username}));
        const userObj = userData.data.userByUsername.items[0];
        const id = userObj.id;
        setUserID(id);
    }

    const handleSubmit = async() => {
        if (communities.length === 0) return;

        let postID = uuid.v4();

        const imageName = image.replace(/^.*[\\\/]/, '');
        fetch(image).then(res => {
            res.blob().then(async blob => {
                await Storage.put(imageName, blob).then(res => {
                    console.log(res);
                }).catch(err => console.log('error: ', err));
            });
        });

        let postObj = { 
            id: postID, 
            image:  'https://d3hocrlbyehato.cloudfront.net/' + imageName, 
            communityID: communities[0].id, 
            caption: caption, 
            altText: altText, 
            userID: userID,
            type: 'Post'
        }

        if (communities.length > 1) postObj.secondCommunityID = communities[1].id;
        if (communities.length > 2) postObj.thirdCommunityID = communities[2].id;
        console.log('postObj: ', postObj)

        const createdPost = await API.graphql(graphqlOperation(createPost, { input: postObj }))
        console.log(createdPost);
        links.forEach(async(link) => {
            link.postID = postID;
            const createdLink = await API.graphql(graphqlOperation(createLink, { input: link }))
            console.log(createdLink);
        });

        if (links.length > 0) {
            Analytics.record('postedWithLinks', { postID: postID, userID: userID, numLinks: links.length });
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

    const altTextAddedButton = () => {
        return (
            <View style={styles.editAltTextButton}>
                <Text style={styles.altTextAddedText}>Alt Text Added</Text>
                <GreenCheckmark/>
            </View>
        )
    }

    const addCommunities = (selectedCommunities) => {
        if (selectedCommunities.length === 0) return;
        setModalVisible(false); 
        setCommunities(selectedCommunities);
    }

    const deleteCommunity = (index) => {
        let communityArr = communities;
        communityArr.splice(index, 1);
        setCommunities([...communityArr]);
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <HeaderBar 
            formComplete={communities.length !== 0 ? true : false} 
            title='Caption, Alt Text, Community' 
            nextTitle='Post'
            nextScreen='Community'
            params={{id: communities[0]?.id, name: communities[0]?.name}}
            callback={handleSubmit}
            showSuccessModal={true}
            successModalText='Successfully posted! Thanks for sharing resources on Asmbl. 😊'
        />
        <View style={styles.imageCaptionContainer}>
            <Image style={styles.image} source={{uri: image}} />
            <TextInput
                style={styles.input}
                placeholder='Type a caption...'
                onChangeText={(val) => setCaption(val)}
                value={caption}
                returnKeyType="done"
                multiline={true}
                blurOnSubmit={true}
                textAlignVertical='top'
            />
        </View>
        <View style={styles.altTextContainer}>
            <Text style={styles.boldText}>Alt Text</Text>
            <Text style={styles.text}>Asmbl encourages you to add alternative text to your images to make posts more accessible.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddAltText', { altTextReceived: altText, image })}>
                { altText === '' ? editAltTextButton() : altTextAddedButton() }
            </TouchableOpacity>
        </View>
        <View style={styles.communityTextContainer}>
            <Text style={styles.boldText}>Community</Text>
            <Text style={styles.text}>Choose up to three (3) communities you'd like your post to appear in.</Text>
        </View>
        {communities.length !== 0 && communities.map((community, index) => <Community key={community.id} community={community} index={index} deleteCommunity={deleteCommunity}/>)}
        <TouchableOpacity style={Button.defaultButton} onPress={() => setModalVisible(true)}>
            <Text style={Button.defaultText}>Choose Communities</Text>
        </TouchableOpacity>
        {modalVisible && <ChooseCommunitiesModal modalVisible={modalVisible} setModalVisible={setModalVisible} addCommunities={addCommunities} />}
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
        minHeight: height * 0.1,
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
        color: '#4B4B4B'
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
})