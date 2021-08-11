import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text, SafeAreaView, ScrollView, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useIsFocused } from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';

/* Queries */
import { announcementsByType, listCommunitys } from '../graphql/queries';
import { createFeedback } from '../graphql/mutations';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Profile from '../styles/Profile.component.style';
import Modals from '../styles/Modals.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Icons */
import AsmblLogoBlue from '../../assets/images/createPost/asmblLogoBlue';
import HomeFeedButton from '../../assets/images/homeFeedButton';
import GreenCheckmark from '../../assets/images/greenCheckmark';
import SuggestNewCommunity from '../../assets/images/suggestNewCommunity';

var { width, height } = Dimensions.get('window');

const Announcement = ({ announcement, setAnnouncementVisible }) => (
    <TouchableOpacity style={styles.announcement} onPress={() => setAnnouncementVisible(false)}>
        <TextTicker
            style={styles.announcementText}
            scrollSpeed={15}
            loop
            repeatSpacer={100}
        >
            {announcement + ' (tap to close).'}
        </TextTicker>
    </TouchableOpacity>
)

export default function CommunitiesScreen({ navigation }) {

    const [announcement, setAnnouncement] = useState('');
    const [announcementVisible, setAnnouncementVisible] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        getCommunities();
        //fetchAnnouncement();    
    }, []);
/*
    useEffect(() => {
        setAnnouncementVisible(true);
    }, [isFocused]);
*/
    const getCommunities = async() => {
        let communityData = await API.graphql({ query: listCommunitys });
        let communityArray = communityData.data.listCommunitys.items;

        let user = await getCurrentUser();
        let joinedCommunities = user?.joined_communities;

        communityArray = await Promise.all(communityArray.map(async(community) => {
            community.joined = false;
            if (joinedCommunities && joinedCommunities.includes(community.id)) {
                community.joined = true;
            }
            return community;
        }))
        communityArray.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        setCommunities([...communityArray]);
    }

    const fetchAnnouncement = async() => {
        let ad = await API.graphql(graphqlOperation(announcementsByType, { type: 'BugFix', sortDirection: 'DESC' }));
        let ao = ad.data.announcementsByType.items[0];
        setAnnouncement(ao.content);
    }

    const selectCommunity = (index) => {
        let communityArr = communities;
        let id = communityArr[index].id;
        let name = communityArr[index].name;

        navigation.navigate('Community', {id: id, name: name});
    }

    const handleSubmit = async() => {
        if (input === '') return;
        setModalVisible(false);

        let user = await getCurrentUser();

        let feedbackObj = {
            type: 'NewCommunity',
            userID: user.id,
            username: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            content: input,
        }

        let createdFeedback = await API.graphql(graphqlOperation(createFeedback, { input: feedbackObj }));
        console.log(createdFeedback);
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Profile.headerContainer}>
                <Text style={Profile.headerText}>Communities</Text>
                <View style={Profile.headerIconsContainer}>
                    <AsmblLogoBlue />
                    <Text style={Profile.headerText}>Asmbl</Text>
                </View>
            </View>
            {announcementVisible && <Announcement announcement={announcement} setAnnouncementVisible={setAnnouncementVisible} />}
            <TouchableOpacity style={styles.homeButtonContainer} onPress={() => navigation.navigate('HomeFeed')}>
                <HomeFeedButton width={width * 0.95}/>
            </TouchableOpacity>
            <View style={styles.mainContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.communitiesContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {communities.length !== 0 && communities.map((community, index) => (
                        <TouchableOpacity key={index} style={styles.community} onPress={() => selectCommunity(index)}>
                            <View style={styles.label}>
                                <Image style={styles.image} source={{uri: community.picture}} />
                                <Text style={styles.text}>{community.name}</Text>
                            </View>
                            {community.joined && <GreenCheckmark width={width * 0.1} height={width * 0.1}/>}
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.community} onPress={() => setModalVisible(true)}>
                        <View style={styles.label}>
                            <SuggestNewCommunity width={width * 0.1} height={width * 0.1}/>
                            <Text style={styles.suggestNewCommunity}>Suggest New Community</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Modal
                visible={modalVisible}
                coverScreen={false}
                animationType='slide'
                backdropColor='black'
                transparent={true}
                backdropOpactiy={0.70}
                onBackdropPress={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                    <View style={Modals.modalView}>
                        <View style={Modals.modalContainer}>
                            <Text style={Modals.header}>Did we miss something?</Text>
                            <Text style={Modals.body}>Asmbl is a space for every person to advocate around issues they care about. Tell us what you are passionate about so we can add it to our Communities page!</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder='Suggest a community...'
                                onChangeText={(val) => setInput(val)}
                                value={input} 
                            />
                            <View style={Modals.modalButtonsContainer}>
                                <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                                    setModalVisible(false);
                                    setInput('');
                                }}>
                                    <Text style={Modals.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={input !== '' ? Modals.enabledModalSubmitButton : Modals.disabledModalSubmitButton}
                                    onPress={() => {
                                        handleSubmit();
                                        setInput('');
                                    }}>
                                    <Text style={input !== '' ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Suggest</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    homeButtonContainer: {
        alignItems: 'center',
        //marginTop: height * 0.01,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
    },
    mainContainer: {
        height: (width * 0.1 + height * 0.02) * 9 + 10,
        paddingBottom: Platform.OS === 'android' ? 72 : 0,
    },
    scrollView: {
        alignSelf: 'center',
        width: width,
    },
    communitiesContainer: {
        width: width,
        alignItems: 'center',
        paddingBottom: height * 0.15,
    },
    community: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.01,
        width: width * 0.9,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: 8,
        marginRight: width * 0.05,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        lineHeight: 19
    },
    suggestNewCommunity: {
        fontFamily: 'Avenir',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 'bold',
        marginLeft: width * 0.05,
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    announcement: {
        backgroundColor: '#C6A4FF',
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.01,
    },
    announcementText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#1B0A60',
        //maxWidth: width * 0.8,
        //marginHorizontal: width * 0.02,
    }
})