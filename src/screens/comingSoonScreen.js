import React, { useEffect, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, Text, TouchableOpacity, Switch, Modal, TextInput, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { updateEmailList, createFeedback } from '../graphql/mutations';
import { emailListByType } from '../graphql/queries';

/* Components */
import BasicHeader from '../components/BasicHeader';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Modals from '../styles/Modals.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Headers */
import EventsHeader from '../../assets/images/comingSoon/eventsHeader';
import PetitionsHeader from '../../assets/images/comingSoon/petitionsHeader';
import FundraisersHeader from '../../assets/images/comingSoon/fundraisersHeader';

const { width, height } = Dimensions.get('window');

export default function ComingSoonScreen({ navigation, route }) {

    let { mode } = route.params;

    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const [emailList, setEmailList] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        checkSubscribed();
    })

    const checkSubscribed = async() => {

        let user = await getCurrentUser();
        setEmail(user.email);

        let emailListData = await API.graphql(graphqlOperation(emailListByType, { type: mode, sortDirection: 'DESC' }));
        let emailListObj = emailListData.data.emailListByType.items[0];
        setEmailList(emailListObj);

        if (emailListObj.emails && emailListObj.emails.includes(user.email)) setIsEnabled(true);
    }

    const toggleSwitch = async() => {

        setIsEnabled(!isEnabled);

        let arr = [];
        
        if (emailList.emails) arr = emailList.emails;
        
        if (emailList.emails && !emailList.emails.includes(email)) {
            arr.push(email);
        } else {
            arr.splice(arr.indexOf(email), 1);
        }

        let emailListObj = {
            id: emailList.id,
            emails: arr,
        }

        let updatedList = await API.graphql(graphqlOperation(updateEmailList, { input: emailListObj }));
        console.log(updatedList);

    }

    const handleSubmit = async() => {
        if (input === '') return;
        setModalVisible(false);

        let user = await getCurrentUser();

        let feedbackObj = {
            type: 'NewFeature',
            userID: user.id,
            username: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            content: input,
        }

        let createdFeedback = await API.graphql(graphqlOperation(createFeedback, { input: feedbackObj }));
        console.log(createdFeedback);
    }

    const renderHeader = () => {
        switch (mode) {
            case 'Events':
                return <EventsHeader width={width} height={width / 2.5}/>
            case 'Petitions':
                return <PetitionsHeader width={width} height={width / 2.5}/>
            case 'Fundraisers':
                return <FundraisersHeader width={width} height={width / 2.5}/>
            default:
                return null;
        }
    }

    const renderTitle = () => {
        switch (mode) {
            case 'Events':
                return <Text style={styles.title}>Coming Soon: Activist events all in one place</Text>
            case 'Petitions':
                return <Text style={styles.title}>Create, spread, and sign petitions</Text>
            case 'Fundraisers':
                return <Text style={styles.title}>Fundraise in a community of activists</Text>
            default:
                return null;
        }
    }

    const renderBody = () => {
        switch (mode) {
            case 'Events':
                return <Text style={styles.body}>Description of feature</Text>
            case 'Petitions':
                return <Text style={styles.body}>Description of feature</Text>
            case 'Fundraisers':
                return <Text style={styles.body}>Description of feature</Text>
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Coming Soon' />
            {renderHeader()}
            <View style={styles.mainContainer}>
                {renderTitle()}
                {renderBody()}
            </View>
            <View style={styles.centeredContainer}>
                <View style={mode === 'Events' ? styles.blueButton : mode === 'Petitions' ? styles.greenButton : styles.pinkButton}>
                    <Switch 
                        trackColor={{false: 'gray', true: 'green'}}
                        thumbColor={'white'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={mode === 'Fundraisers' ? styles.blueText : styles.whiteText}>Email me updates on this feature</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.underlinedText}>Tell us what you think</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                coverScreen={false}
                animationType='slide'
                backdropColor='black'
                transparent={true}
                backdropOpactiy={0.70}
                onBackdropPress={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                    <View style={Modals.modalView}>
                        <View style={Modals.modalContainer}>
                            <Text style={Modals.header}>Tell us what you think!</Text>
                            <Text style={Modals.body}>We hope you're as excited about these features as we are. Let us know what you think about these features, or suggest your own.</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder='Type here...'
                                onChangeText={(val) => setInput(val)}
                                value={input} 
                                textAlignVertical='top'
                                returnKeyType="done"
                                multiline={true}
                                blurOnSubmit={true}
                            />
                            <View style={Modals.modalButtonsContainer}>
                                <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                                    setModalVisible(false);
                                    setInput('');
                                }}>
                                    <Text style={Modals.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={input !== '' ? Modals.enabledModalSubmitButton : Modals.disabledModalSubmitButton}
                                    onPress={() => {
                                        handleSubmit();
                                        setInput('');
                                    }}>
                                    <Text style={input !== '' ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    mainContainer: {
        width: width * 0.9,
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#1B0A60',
        marginVertical: height * 0.02,
    },
    body: {
        fontFamily: 'Avenir'
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.1
    },
    blueButton: {
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.75,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.03,
        justifyContent: 'space-between',
        backgroundColor: '#1B0A60'
    },
    greenButton: {
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.75,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.03,
        justifyContent: 'space-between',
        backgroundColor: '#3C782D'
    },
    pinkButton: {
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.75,
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.03,
        justifyContent: 'space-between',
        backgroundColor: '#C6A4FF'
    },
    blueText: {
        fontFamily: 'Avenir',
        color: '#1B0A60',
        marginHorizontal: width * 0.03,

    },
    whiteText: {
        fontFamily: 'Avenir',
        color: 'white',
        marginHorizontal: width * 0.03,
    },
    underlinedText: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: height * 0.02
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: height * 0.2, 
    },
})