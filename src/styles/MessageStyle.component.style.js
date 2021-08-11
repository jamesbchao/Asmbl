import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    friendContainer: {
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
        paddingVertical: height * 0.015,
        marginVertical: height * 0.01
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.8,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    profilePicture: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: 200
    },
    bioContainer: {
        marginLeft: width * 0.05,
        height: height * 0.04,
        width: width * 0.5
        //justifyContent: 'space-between'
    },
    boldText: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16
    },
    notificationContainer: {
        flexDirection: 'row',
        width: width * 0.7,
        alignItems: 'center',
        marginTop: width * 0.02,
    },
    notificationIcon: {
        borderRadius: 200,
        backgroundColor: '#1B0A60',
        width: width * 0.025,
        height: width * 0.025,
    },
    notificationText: {
        marginLeft: width * 0.04,
        fontFamily: 'Avenir',
        color: '#4B4B4B',
        fontSize: 16
    }
})