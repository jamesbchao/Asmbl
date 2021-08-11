import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const Forms = StyleSheet.create({
    inputContainer: {
        //marginTop: 40,
        marginLeft: 24
    },
    inputTitle: {
        // // position: 'static',
        // width: 118,
        // height: '113%',
        // left: 0,
        // top: 0,
        /* Title */
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        /* identical to box height, or 133% */
        /* Neutral/Black */
        color: '#000000',
        marginBottom: 8,
        marginTop: 32,
    },
    input: {
        width: 243,
        height: 24,
        left: 0,
        top: 0,
    
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 24,
        color: '#4B4B4B',
        marginBottom: 8,
        borderBottomWidth: 1.5,
        borderBottomColor: '#4B4B4B',
    },
    forgotPassword: {
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        color: '#000000',
    }
});

export default Forms;