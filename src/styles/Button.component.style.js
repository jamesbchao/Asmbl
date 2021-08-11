import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const Button = StyleSheet.create({
    defaultButton: {
        width: width * 0.9,
        borderRadius: 16,
        backgroundColor: '#1B0A60',
        alignSelf: 'center',
        paddingVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    defaultButtonLonger: {
        width: width * 0.95,
        borderRadius: 16,
        backgroundColor: '#1B0A60',
        alignSelf: 'center',
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
    },
    defaultButtonShort: {
        width: width * 0.45,
        borderRadius: 16,
        backgroundColor: '#1B0A60',
        alignSelf: 'center',
        paddingVertical: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    defaultText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 24,
        color: '#C6A4FF',
        textAlign: 'center'
    },
    whiteText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: 'white',
        marginLeft: width * 0.01,
    },
    textWithIconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        alignSelf: 'center',
        marginVertical: height * 0.01,
    },
    deleteText: {
        fontFamily: 'Avenir',
        fontSize: 15,
        lineHeight: 19,
        color: '#C42727',
        marginLeft: 5,
        fontWeight: '800'
    },
    editText: {
        fontFamily: 'Avenir',
        fontSize: 15,
        lineHeight: 19,
        color: '#1B0A60',
        marginLeft: 5,
        fontWeight: '800'
    }
});

export default Button;