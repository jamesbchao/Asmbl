import { StyleSheet, Dimensions } from 'react-native';
import { normalize } from 'react-native-elements';

var { width, height } = Dimensions.get('window');

const Modals = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 16,
        alignSelf: 'center',
        height: 242,
        marginTop: '60%',
        marginHorizontal: '14.3%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
    },
    textContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 24,
        paddingBottom: 18,
    },
    header: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
    },
    centeredHeader: {
      fontFamily: 'Avenir',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 24,
      alignSelf: 'center',
    },
    body: {
        marginTop: height * 0.01,
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 19,
        marginBottom: height * 0.01,
        color: '#4B4B4B',
        // flex: 1,
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 40,
        // flex: 1,
        height: 36,
        width: 250,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#E3E3E3',
    },
    inputBody: {
        flex: 1,
        left: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        width: 289,
        height: 40,
        bottom: 18,
    },
    cancelButtonContainer: {
        flex: 4,
        alignItems: 'flex-start',
        top: 8,
    },
    cancelButton: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        color: '#1B0A60',
    },
    doneButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#1B0A60',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    doneButton: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        color: '#C6A4FF',
        textAlignVertical: 'center',
    },
    doneFaintContainer: {
        backgroundColor: '#7F77A2',
    },
    doneFaint: {
        color: '#E3D1FF',
    },
    successContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 16,
        alignSelf: 'center',
        height: height * 0.2,
        width: width * 0.7,
        marginTop: '60%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
        paddingTop: height * 0.01
    },
    successTextContainer: {
        marginBottom: height * 0.01,
        marginHorizontal: width * 0.1
    },
    successText: {
        fontFamily: 'Avenir',
        fontWeight: 'normal',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#000000',
    },
    successCheck: {
        top: -14,
        alignSelf: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalHeader: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 10
      },
      modalText: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color: '#4B4B4B',
        marginVertical: 10
      },
      modalButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      },
      modalCancelButton: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        color: '#1B0A60'
      },
      disabledModalSubmitButton: {
        backgroundColor: '#7F77A2',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8
      },
      enabledModalSubmitButton: {
        backgroundColor: '#1B0A60',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8
      },
      disabledModalSubmitText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '500',
        color: '#E3D1FF'
      },
      enabledModalSubmitText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '500',
        color: '#C6A4FF'
      },
      modalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: height * 0.4,
      },
      input: {
        borderColor: '#4B4B4B',
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: width * 0.6,
      },
      subtitle: {
        fontFamily: 'Avenir',
        fontSize: 18,
        lineHeight: 24,
        marginTop: height * 0.02,
      },
      logOutContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: height * 0.4,
        height: height * 0.11,
      }
});

export default Modals;