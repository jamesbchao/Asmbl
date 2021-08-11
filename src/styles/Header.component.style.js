import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const Header = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.92,
        alignSelf: 'center',
        marginTop: height * 0.01,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Avenir',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#1B0A60'
    },
    next: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: '#1B0A60'
    },
    nextDisabled: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: '#7F77A2'
    },
    containerAlternate: {
        flexDirection: 'row',
        width: width * 0.95,
        alignSelf: 'center',
        marginTop: height * 0.01,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleBold: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: '#1B0A60'
    },
});

export default Header;