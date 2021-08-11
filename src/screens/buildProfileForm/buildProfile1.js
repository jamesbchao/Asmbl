import React, { useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView } from 'react-native';
import DotBar from '../../../assets/images/dotBar1.svg';
import BuildProfileForm from '../../styles/BuildProfileForm.component.style';
import OnboardingText from '../../styles/OnboardingText.component.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { userByUsername } from '../../graphql/queries';
import { updateUser, createFeedback } from '../../graphql/mutations';
import GlobalStyles from '../../styles/GlobalStyles.component.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCurrentUser } from '../../functions/getCurrentUser.function';

var waveHeight = 253;
const originalHeight = 970; {/* original: 942 */}
const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const heightOverflowPercent = (originalHeight/windowHeight) * 100;

const initialState = [
    { prompt: 'I fight for ', placeholder: 'ex. the environment, trans rights', key: '1', checked: false, response: ''},
    { prompt: 'In the past, I have worked with/at ', placeholder: 'ex. ACLU, Unicef, Amnesty International', key: '2', checked: false, response: ''},
    { prompt: 'I currently work for ', placeholder: 'ex. Black Lives Matter, Freedom Fund', key: '3', checked: false, response: ''},
    { prompt: 'I am a relentless advocate for ', placeholder: 'ex. trans rights, police reform, Palestine', key: '4', checked: false, response: ''},
];

function BuildProfile1({ navigation }) {
    const [bioPrompt, setBioPrompt] = useState(initialState);
    const [bioResponse, setBioResponse] = useState("default");

    const [pronouns, setPronouns] = useState('');
    const [school, setSchool] = useState('');

    const [endEditing, setEndEditing] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const setChecked = (key) => {
        let prompts = bioPrompt;
        const index = key - 1;
        prompts[index].checked = !prompts[index].checked;
        setBioPrompt(prompts);
    }

    const handleChangeText = (val, key) => {
        let prompts = bioPrompt;
        const index = key - 1;
        prompts[index].response = val;
        setBioPrompt(prompts);
    }

    const handleEndEditing = () => {
        setEndEditing(true);
        bioPrompt.every(prompt => {
            if (prompt.checked) {
                let bio = prompt.prompt + prompt.response;
                
                if (bio.charAt(bio.length - 1) !== '.') {
                    bio = bio + '.';
                }
                
                setBioResponse(bio);
                return false;
            }
            return true;
        });
    }

    const handleSubmit = async() => {
        setLoading(true);
        console.log({bioResponse, pronouns, school});

        try {
            const userObj = await getCurrentUser();

            //create update user object
            let user = {id: userObj.id, bio: bioResponse, pronouns: pronouns };
            if (school !== '') {
                user.school = school;
            }
    
            const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: user }));
            console.log('updated user:', updatedUser);
            setLoading(false);
            navigation.navigate('BuildProfile2');
        } catch (err) {
            let feedback = {
                type: 'Bug',
                userID: userObj.id,
                username: userObj.user_name,
                first_name: userObj.first_name,
                last_name: userObj.last_name,
                content: err
            }
            setLoading(false);
            setError(err);
            await API.graphql(graphqlOperation(createFeedback, { input: feedback }));
            
        }

    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <DotBar style={styles.dotBar}/>
            <Text style={OnboardingText.buildFormHeader}>Thanks for verifying! Let’s start building your profile.</Text>
            <KeyboardAwareScrollView
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                    enableAutomaticScroll={true}
                    extraHeight={50}
                >
                <View style={styles.bodyContainer}>
                    <View style={styles.questionsContainer}>
                        <View style={styles.question}>
                            <Text style={BuildProfileForm.boldText}>What are your preferred pronouns?</Text>
                            <TextInput 
                                style={BuildProfileForm.inputText}
                                onChangeText={(val) => setPronouns(val)}
                                value={pronouns}
                                placeholder="Ex. she/her, they/them"
                            />
                        </View>
                        <View style={styles.question}>
                            <Text style={BuildProfileForm.boldText}>(Optional) What school do you attend?</Text>
                            <TextInput 
                                style={BuildProfileForm.inputText}
                                onChangeText={(val) => setSchool(val)}
                                value={school}
                                placeholder="Ex. UCLA, Ridge High School"
                            />
                        </View>
                    </View>
                    <Text style={BuildProfileForm.boldText}>Choose one of the prompts below and fill in the blanks.</Text>
                    <Text style={BuildProfileForm.bodyText}>This will serve as your bio.</Text>
                    <View style={styles.promptsContainer}>
                        {bioPrompt.map((prompt) => (
                            <View style={styles.listContainer} key={prompt.key}>
                                <BouncyCheckbox 
                                    size={25}
                                    fillColor="#1B0A60"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "#1B0A60" }}
                                    textStyle={{ fontFamily: "Avenir" }}
                                    onPress={() => setChecked(prompt.key)}
                                />
                                <View style={styles.promptContainer}>
                                    <Text style={styles.listText}>{prompt.prompt}</Text>
                                    <TextInput 
                                        style={BuildProfileForm.inputText}
                                        autoCapitalize="none"
                                        onChangeText={val => handleChangeText(val, prompt.key)}
                                        defaultValue={prompt.response}
                                        placeholder={prompt.placeholder}
                                        onEndEditing={() => handleEndEditing()}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {loading && <ActivityIndicator style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,}} size='large'/>}
            {error !== '' && <Text style={{fontFamily: 'Avenir', fontWeight: '500', fontSize: 16, color: 'red'}}>{error}</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={endEditing ? BuildProfileForm.nextButtonEnabled : BuildProfileForm.nextButtonDisabled} onPress={() => handleSubmit()}>
                    <Text style={endEditing ? BuildProfileForm.nextButtonTextEnabled : BuildProfileForm.nextButtonTextDisabled}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    dotBar: {
        alignSelf: 'center',
        marginTop: 30
    },
    scrollView: {
        marginTop: windowHeight * 0.01,
        //backgroundColor: 'red'
    },
    scrollViewContainer: {
        height: `${heightOverflowPercent + 2}%`,
    },
    bodyContainer: {
        //marginTop: 35,
        marginHorizontal: 24,
    },
    questionsContainer: {
        //marginBottom: 36,
    },
    question: {
        marginBottom: 36,
    },
    listContainer: {
        marginTop: 16,
        flexDirection: 'row'
    },
    list: {
        paddingVertical: 27,
        paddingHorizontal: 17,
    },
    listTextContainer: {
        borderBottomWidth: 1,
        paddingVertical: 1,
    },
    listText: {
        fontFamily: 'Avenir',
    },
    promptsContainer: {
        justifyContent: 'space-between',
        height: 300
    },
    buttonContainer: {
        position: 'absolute',
        bottom: windowHeight * 0.05,
        right: width * 0.05
    }
});

export default BuildProfile1;