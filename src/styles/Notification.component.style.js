import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const Notification = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        alignSelf: 'center',
        width: width * 0.9,
        alignItems: 'center',
        //paddingLeft: width * 0.02,
        paddingVertical: height * 0.03,
        marginVertical: height * 0.01
    },
    acceptedFriendRequest: {
        flexDirection: 'row'
    },
    textContainer: {
        marginLeft: width * 0.03,
        width: width * 0.7
    },
    boldText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 16,
        maxWidth: width * 0.65,
    },
    italicText: {
        fontFamily: 'Avenir',
        fontStyle: 'italic',
        fontSize: 16,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        width: width * 0.5,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.8,
        paddingBottom: height * 0.02,
    },
    profilePicture: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 200
    },
    userBioContainer: {
        marginLeft: width * 0.05,
        height: height * 0.07,
        justifyContent: 'space-between'
    },
    buttonsContainer: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        width: width * 0.85,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    acceptButton: {
        backgroundColor: '#3C782D',
        width: width * 0.42,
        height: height * 0.035,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    acceptButtonText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: 'white',
        marginLeft: height * 0.01,
    },
    declineButton: {
        backgroundColor: '#C42727',
        width: width * 0.42,
        height: height * 0.035,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    myPostsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        alignSelf: 'center',
        width: width * 0.95,
        alignItems: 'center',
        paddingVertical: height * 0.03
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
    },
    descriptionContainer: {
        marginLeft: width * 0.05,
        width: width * 0.7
    },
    blueText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        color: '#1B0A60',
        fontSize: 18,
        marginBottom: width * 0.02
    }
})

export default Notification;