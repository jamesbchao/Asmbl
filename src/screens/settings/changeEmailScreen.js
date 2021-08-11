import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { updateUser } from '../../graphql/mutations';

/* Functions */
import { getCurrentUser } from '../../functions/getCurrentUser.function';

import GlobalStyles from '../../styles/GlobalStyles.component.style';


/* Components */
import BasicHeader from '../../components/BasicHeader';

const { width, height } = Dimensions.get('window');

export default function ChangeEmailScreen({ navigation, route }) {

    let { email } = route.params;

    const [input, setInput] = useState(email);

    const handleSubmit = async() => {

        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
            'email': input,
        });

        console.log(result);

        let { id } = await getCurrentUser();

        let userObj = {
            id: id,
            email: input,
        }

        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
        console.log(updatedUser);

        navigation.navigate('VerifyNewEmail');
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name='Change Email' right='Checkmark' callback={handleSubmit}/>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setInput(val)}
                    value={input}
                    placeholder='Type here...'
                />
            </View>
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
        alignSelf: 'center',
        marginTop: height * 0.04,
    },
    text: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
    },
    input: {
        marginTop: height * 0.02,
        borderBottomWidth: 1,
        paddingBottom: height * 0.005,
    },
});