import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { createFeedback } from '../../graphql/mutations';

/* Components */
import BasicHeader from '../../components/BasicHeader';

/* Functions */
import { getCurrentUser } from '../../functions/getCurrentUser.function';

/* Styles */
import Input from '../../styles/Input.component.style';
import GlobalStyles from '../../styles/GlobalStyles.component.style';


/* Icons */
import SendIcon from '../../../assets/images/sendIcon';

const { width, height } = Dimensions.get('window');

export default function ContactScreen({}) {

    const [input, setInput] = useState('');

    const handleSubmit = async() => {
        let user = await getCurrentUser();
        let feedbackObj = {
            type: 'Contact',
            userID: user.id,
            username: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            content: input
        }

        let submittedFeedback = await API.graphql(graphqlOperation(createFeedback, { input: feedbackObj }));
        setInput('');
        console.log(submittedFeedback);
        //open success modal
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Contact Asmbl' />
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>We'd love to hear from you!</Text>
                <Text style={styles.text}>Here at Team Asmbl we appreciate any and all user feedback. Let us know what you think about our platform and how improvements could be made.</Text>
                <Text>
                    <Text style={styles.text}>Use the form below or send us an email directly at </Text>
                    <Text style={styles.boldText}>contact@asmbl-app.org.</Text>
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={Input.input}
                    onChangeText={val => setInput(val)}
                    value={input}
                    placeholder='Type your feedback here...'
                    returnKeyType="done"
                    multiline={true}
                    blurOnSubmit={true}
                    textAlignVertical='top'
                />
                <TouchableOpacity style={styles.iconContainer} onPress={() => handleSubmit()}>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    textContainer: {
        marginTop: height * 0.02,
        width: width * 0.9,
        alignSelf: 'center',
        height: height * 0.2,
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 20
    },
    boldText: {
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
    },
    inputContainer: {
        height: height * 0.2,
        width: width * 0.9,
        alignSelf: 'center',
        marginTop: height * 0.02,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: width * 0.02
    }
})