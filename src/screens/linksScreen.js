import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation, Analytics } from 'aws-amplify'
import * as WebBrowser from 'expo-web-browser';

/* Queries */
import { linksByPost } from '../graphql/queries';

/* Components */
import Link from '../components/Link';
import ReportModal from '../components/ReportModal';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Header from '../styles/Header.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import BackButton from '../../assets/images/backButton';
import MoreIconBlue from '../../assets/images/moreIconBlue';
import ReportIcon from '../../assets/images/reportIcon';

const { width, height } = Dimensions.get('window');

export default function LinksScreen({ navigation, route }) {

    let { postID } = route.params;

    const [links, setLinks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [morePressed, setMorePressed] = useState(false);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async() => {
        const linksData = await API.graphql(graphqlOperation(linksByPost, { postID }));
        const linksObj = linksData.data.linksByPost.items;
        setLinks([...linksObj]);
    }

    const handleOpenWebBrowser = async(link) => {
        console.log('opening ', link);
        let user = await getCurrentUser();
        Analytics.record('openLink', { username: user.user_name, link: link });
        try {
            await WebBrowser.openBrowserAsync(link);
        } catch (err) {
            console.log(err);
        }
        /*
        if (!link.includes('https://www.' || 'www.')) {
            const newLink = 'https://www.' + link;
            console.log('new link: ', newLink);
            try {
                await WebBrowser.openBrowserAsync(newLink);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await WebBrowser.openBrowserAsync(link);
            } catch (err) {
                console.log(err);
            }
        }
        */
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Links</Text>
                </View>
                <View style={styles.moreButtonContainer}>
                    <TouchableOpacity style={morePressed ? styles.moreButtonPressed : styles.moreButton } onPress={() => setMorePressed(!morePressed)}>
                        <MoreIconBlue/>
                    </TouchableOpacity>
                    {morePressed && <TouchableOpacity style={styles.reportButton} onPress={() => setModalVisible(true)}>
                        <ReportIcon />
                        <Text style={styles.reportText}>Report</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            {modalVisible && <ReportModal modalVisible={modalVisible} setModalVisible={setModalVisible} setMorePressed={setMorePressed}/>}
            <ScrollView contentContainerStyle={styles.linksContainer}>
                {links.map((link) => (
                    <TouchableOpacity key={link.id} onPress={() => handleOpenWebBrowser(link.link)}>
                        <Link link={link} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white',
    },
    linksContainer: {
        alignItems: 'center'
    },
    moreButtonContainer: {
        height: height * 0.045
    },
    reportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#4B4B4B',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        position: 'relative',
        bottom: height * 0.015,
        right: width * 0.04,
        justifyContent: 'flex-end'

    },
    reportText: {
        fontFamily: 'Avenir',
        marginLeft: width * 0.01
    },
    moreButtonPressed: {
        //position: 'relative',
        //left: width * 0.1,
        //top: width * 0.01,
        alignSelf: 'flex-end'
    },
})