import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');
const buttonWidth = width * (327/375);
const buttonHeight = height * (48/812);

const LoginButtons = StyleSheet.create({
    container: {

    },
    buttonsContainer: {
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        top: height - 40

    },
    upperButtonContainer: {

    },
    upperButton: {
        display: 'flex',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: '#C6A4FF',
        borderRadius: 16,
        justifyContent: 'center',
        marginBottom: 10,
    },
    upperButtonText: {
        display: 'flex',
        fontSize: 18,
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#1B0A60'
    },
    lowerButtonContainer: {

    },
    lowerButton: {
        display: 'flex',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: '#1B0A60',
        borderRadius: 16,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    lowerButtonText: {
        display: 'flex',
        fontSize: 18,
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#C6A4FF'
    },
    lowerButtonDisabled: {
        display: 'flex',
        width: buttonWidth,
        height: buttonHeight,
        backgroundColor: '#7F77A2',
        borderRadius: 16,
        justifyContent: 'center',
    },
    lowerButtonTextDisabled: {
        display: 'flex',
        fontSize: 18,
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: '#E3D1FF'
    },
    bottomButtonContainer: {
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        top: height - (height * 0.15),
        height: '70.14%',
      },
      textBelowButton: {
        display: 'flex',
        fontFamily: 'Avenir',
        fontWeight: '800',
        textAlign: 'center',
        top: 11,
      },
      boldBelowButton: {
        fontWeight: 'bold',
        color: '#1B0A60',
      }
});

export default LoginButtons;