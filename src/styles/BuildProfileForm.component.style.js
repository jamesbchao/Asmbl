import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');
var waveHeight = 253;


const BuildProfileForm = StyleSheet.create({
    waveText: {
        position: 'absolute',
        width: 327,
        height: 64,
        left: 24,
        top: 102-253,
        fontFamily: 'Avenir',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 24,
        lineHeight: 32,
        color: '#B18EF7',
      },
    progressBar: {
        alignSelf: 'center',
        position: 'absolute',
        top: (59-waveHeight),
    },
    nextButtonDisabled: {
        top: 24,
        marginLeft: 254/375 * width,
        borderRadius: 16,
        backgroundColor: '#7F77A2',
    },
    nextButtonEnabled: {
        top: 24,
        marginLeft: 254/375 * width,
        borderRadius: 16,
        backgroundColor: '#1B0A60',
    },
    nextButtonTextDisabled: {
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#E3D1FF'
    },
    nextButtonTextEnabled: {
        textAlign: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#C6A4FF'
    },
    boldText: {
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        color: '#000000',
        fontFamily: 'Avenir',
        marginBottom: 8,
    },
    bodyText: {
        fontFamily: 'Avenir',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        color: '#000000'
    },
    inputText: {
        fontFamily: 'Avenir',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 24,
        color: '#000000',
        borderBottomWidth: 1,
        width: 243,
    }
});

export default BuildProfileForm;