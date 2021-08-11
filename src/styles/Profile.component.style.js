import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const Profile = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.95,
        alignSelf: 'center',
        marginTop: 20
    },
    headerContainerPost: {
        flexDirection: 'row',
        width: width * 0.95,
        alignSelf: 'center',
        marginTop: 20,
        //alignItems: 'center'
    },
    headerIconsContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        //width: width * 0.15
    },
    headerText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: '#1B0A60',
        marginLeft: width * 0.02,
    },
    userInfoContainer: {
        flexDirection: 'row',
        width: width * 0.9,
        alignSelf: 'center',
        marginTop: height * 0.02,
    },
    profilePicture: {
        height: height * 0.15,
        width: height * 0.15,
        borderRadius: 200
    },
    userInfoTextContainer: {
        marginLeft: width * 0.08,
        width: width * 0.5
    },
    userInfoBoldText: {
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        fontSize: 18,
        lineHeight: 24,
    },
    userInfoText: {
        marginTop: height * 0.01,
        fontFamily: 'Avenir',
        fontSize: 18,
        lineHeight: 24,
    },
    userProfileButtonsContainer: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        width: width * 0.9,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    myNetworkButton: {
        backgroundColor: '#1B0A60',
        width: width * 0.44,
        height: height * 0.04,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    myNetworkText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#C6A4FF',
        marginLeft: height * 0.01,
    },
    myNetworkButtonDisabled: {
        backgroundColor: '#7F77A2',
        width: width * 0.44,
        height: height * 0.04,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    myNetworkTextDisabled: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#E3D1FF',
        marginLeft: height * 0.01,
    },
    editProfileButton: {
        backgroundColor: '#C6A4FF',
        width: width * 0.44,
        height: height * 0.04,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editProfileText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#1B0A60',
        marginLeft: height * 0.01,
    },
    acceptButton: {
        backgroundColor: '#3C782D',
        width: width * 0.44,
        height: height * 0.04,
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
        width: width * 0.44,
        height: height * 0.04,
        borderRadius: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabSelectionButtonsContainer: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        width: width * 0.9,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    tabSelectionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabSelectionButtonFocused: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingBottom: 4,
        width: width * 0.225
    },
    tabSelectionText: {
        marginLeft: width * 0.01,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#4B4B4B'
    },
    tabSelectionTextFocused: {
        marginLeft: width * 0.01,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: 'black',
        fontWeight: '800'
    },
    mainContainer: {
        width: width * 0.9,
        alignSelf: 'center'
    },
    mainInterestsContainer: {
        paddingBottom: height * 0.05,
        width: width * 0.95,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    interestsScrollView: {
        width: width * 0.95,
        alignSelf: 'center',
    },
    interestHeader: {
        marginTop: height * 0.01,
        width: width * 0.9,
        alignSelf: 'center',
        fontFamily: 'Avenir',
        fontWeight: '800',
        color: '#1B0A60',
        fontSize: 14,
        lineHeight: 19,
    },
    interestsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        width: width * 0.95,
    },
    interestContainer: {
        width: width * 0.43,
        marginLeft: 10,
    },
    interest: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1B0A60',
        width: width * 0.43,
        marginVertical: height * 0.01,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
    },
    interestLast: {
        left: width / 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1B0A60',
        width: width * 0.43,
        marginVertical: height * 0.01,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
    },
    interestText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 7,
    },
});

export default Profile;