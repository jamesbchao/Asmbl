import React, { useEffect, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, ScrollView, Modal, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import uuid from 'react-native-uuid';

/* Queries */
import { updateUser } from '../graphql/mutations';

/* Styles */
import Modals from '../styles/Modals.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Components */
import BasicHeader from '../components/BasicHeader';

const initialState = [
    {name: 'Environment', selected: false},
    {name: 'Labor Rights', selected: false},
    {name: 'LGBTQ+', selected: false},
    {name: 'Police Reform', selected: false},
    {name: 'BLM', selected: false},
    {name: 'Racial Justice', selected: false},
    {name: 'Immigration', selected: false},
    {name: 'Reproductive Rights', selected: false},
    {name: 'Indigenous Rights', selected: false},
    {name: 'Israel', selected: false},
    {name: 'Trans Rights', selected: false},
    {name: 'Prison Reform', selected: false},
    {name: 'Palestinian Rights', selected: false},
    {name: 'Mental Health', selected: false},
];

const initialStateCurious = [
    {name: 'Environment', selected: false},
    {name: 'Labor Rights', selected: false},
    {name: 'LGBTQ+', selected: false},
    {name: 'Police Reform', selected: false},
    {name: 'BLM', selected: false},
    {name: 'Racial Justice', selected: false},
    {name: 'Immigration', selected: false},
    {name: 'Reproductive Rights', selected: false},
    {name: 'Indigenous Rights', selected: false},
    {name: 'Israel', selected: false},
    {name: 'Trans Rights', selected: false},
    {name: 'Prison Reform', selected: false},
    {name: 'Palestinian Rights', selected: false},
    {name: 'Mental Health', selected: false},
];

const { width, height} = Dimensions.get('window');

export default function EditUserInfoScreen({ navigation, route }) {

    let { mode, param, id, interests_experience, interests_learn_more } = route.params;

    const [input, setInput] = useState(param);

    const [interestsExperience, setInterestsExperience] = useState(initialState);
    const [selectedInterestsExperience, setSelectedInterestsExperience] = useState([]);
    const [selectedInterestsExperienceCounter, setSelectedInterestsExperienceCounter] = useState(0);

    const [interestsCurious, setInterestsCurious] = useState(initialStateCurious);
    const [selectedInterestsCurious, setSelectedInterestsCurious] = useState([]);
    const [selectedInterestsCuriousCounter, setSelectedInterestsCuriousCounter] = useState(0);

    const [currentType, setCurrentType] = useState('Experience');
  
    const [modalVisible, setModalVisible] = useState(false);
    const [newInterest, setNewInterest] = useState('');

    const [updated, setUpdated] = useState(false);



    useEffect(() => {
        if (mode === 'Interests') updateSelected();
    }, [])

    const updateSelected = () => {

        setSelectedInterestsExperience([...interests_experience]);
        setSelectedInterestsCuriousCounter(interests_experience.length - 1);
        setSelectedInterestsCurious([...interests_learn_more]);
        setSelectedInterestsCuriousCounter(interests_learn_more.length - 1);

        if (updated) return;
        let arr = initialState;
        arr.forEach(interest => {
            if (interests_experience.includes(interest.name)) {
                interest.selected = true;
            }
            else interest.selected = false;
            return interest;
        });

        interests_experience.forEach(interest => {
            if (!initialState.some(i => i.name === interest)) {
                arr.push({ name: interest, selected: true });
            }
        });

        setInterestsExperience(arr);
        console.log(arr)
        let arr2 = initialStateCurious;

        arr2.forEach(interest => {
            if (interests_learn_more.includes(interest.name)) {
                interest.selected = true;
            }
            else interest.selected = false;
            return interest;
        });

        interests_learn_more.forEach(interest => {
            if (!initialStateCurious.some(i => i.name === interest)) {
                arr2.push({ name: interest, selected: true });
            }
        });

        console.log(arr2)
        setInterestsCurious(arr2)
        console.log(interests_experience, interests_learn_more)
        setUpdated(true);
    }


    const handleInterestSelection = (interest, index, type) => {
        if (type === 'Experience') {
            console.log(selectedInterestsExperienceCounter)
            if (!selectedInterestsExperience.includes(interest)) {
                if (selectedInterestsExperienceCounter >= 5) return;
                let arr = interestsExperience;
                arr[index].selected = !arr[index].selected;
                setInterestsExperience([...arr]);
                setSelectedInterestsExperience([...selectedInterestsExperience, interest]);
                setSelectedInterestsExperienceCounter(selectedInterestsExperienceCounter + 1);
              } else {
                let arr = interestsExperience;
                arr[index].selected = !arr[index].selected;
                setInterestsExperience([...arr]);
                let interestArray = selectedInterestsExperience;
                interestArray = interestArray.filter(str => str !== interest);
                setSelectedInterestsExperience(interestArray);
                setSelectedInterestsExperienceCounter(selectedInterestsExperienceCounter - 1);
              }
        } else {
            console.log(selectedInterestsCuriousCounter)

            if (!selectedInterestsCurious.includes(interest)) {
                if (selectedInterestsCuriousCounter >= 5) return;
                let arr = interestsCurious;
                arr[index].selected = !arr[index].selected;
                setInterestsCurious([...arr]);
                setSelectedInterestsCurious([...selectedInterestsCurious, interest]);
                setSelectedInterestsCuriousCounter(selectedInterestsCuriousCounter + 1);
              } else {
                let arr = interestsCurious;
                arr[index].selected = !arr[index].selected;
                setInterestsCurious([...arr]);
                let interestArray = selectedInterestsCurious;
                interestArray = interestArray.filter(str => str !== interest);
                setSelectedInterestsCurious(interestArray);
                setSelectedInterestsCuriousCounter(selectedInterestsCuriousCounter - 1);
              }
        }

    }

    const handleAddInterest = (type) => {
        setCurrentType(type);
        setModalVisible(true);
    }

    const submitNewInterest = (interest) => {

        if (currentType === 'Experience') {
            let arr = interestsExperience;
            if (selectedInterestsExperienceCounter < 5) {
              arr.push({name: interest, selected: true});
              setSelectedInterestsExperience([...selectedInterestsExperience, interest]);
              setSelectedInterestsExperienceCounter(selectedInterestsExperienceCounter + 1);
            } else {
              arr.push({name: interest, selected: false});
            }
            setInterestsExperience(arr);
        } else {
            let arr = interestsCurious;
            if (selectedInterestsCuriousCounter < 5) {
              arr.push({name: interest, selected: true});
              setSelectedInterestsCurious([...selectedInterestsCurious, interest]);
              setSelectedInterestsCuriousCounter(selectedInterestsCuriousCounter + 1);
            } else {
              arr.push({name: interest, selected: false});
            }
            setInterestsCurious(arr);
        }

      }


    const handleSubmit = async() => {

        let userObj = {
            id: id,
        }
        console.log(id);
        switch (mode) {
            case 'Name':
                let first_name = input.substr(0, input.indexOf(' '));
                let last_name = input.substr(input.indexOf(' ') + 1);
                userObj.first_name = first_name;
                userObj.last_name = last_name;
                break;
            case 'Username':
                changeUsername();
                userObj.user_name = input;
                break;
            case 'Bio':
                userObj.bio = input;
                break;
            case 'Interests':
                userObj.interests_experience = selectedInterestsExperience;
                userObj.interests_learn_more = selectedInterestsCurious;
            default:
                break;
        }

        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
        console.log('successfully updated User: ', updatedUser.data.updateUser.user_name);

        navigation.navigate('EditProfile');
    }

    if (mode === 'Interests') {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <BasicHeader name={'Edit ' + mode} right='Checkmark' callback={handleSubmit}/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    >
                    <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                        <View style={Modals.modalContainer}>
                            <Text style={Modals.modalHeader}>Add a new interest</Text>
                            <TextInput 
                            style={Modals.input}
                            onChangeText={val => setNewInterest(val)}
                            value={newInterest}
                            placeholder="Type here..."
                            />
                            <View style={Modals.modalButtonsContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false);
                                setNewInterest('');
                            }}>
                                <Text style={Modals.modalCancelButton}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={newInterest === '' ? Modals.disabledModalSubmitButton : Modals.enabledModalSubmitButton}
                                onPress={() => {
                                submitNewInterest(newInterest);
                                setModalVisible(false);
                                setNewInterest('');
                                }}>
                                <Text style={newInterest === '' ? Modals.disabledModalSubmitText : Modals.enabledModalSubmitText}>Add</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
                <View style={styles.interestsMainContainer}>
                    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.interestsContainer} enableAutomaticScroll={true}>
                    <Text style={styles.sectionHeading}>I am personally connected to or involved in these areas of advocacy:</Text>
                    {interestsExperience.map((interest, index) => (
                        <View key={uuid.v4()} style={styles.interestContainer}>
                        <TouchableOpacity style={interest.selected ? styles.interestSelected : styles.interest} onPress={() => handleInterestSelection(interest.name, index, 'Experience')}>
                            <Text style={styles.interestText}>{interest.name}</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.interestContainer}>
                        <TouchableOpacity style={interestsExperience.length % 2 === 0 ? styles.addNewButtonAlone : styles.addNewButton} onPress={() => handleAddInterest('Experience')}>
                            <Text style={styles.addNewButtonText}>+ Add New</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionHeading}>I am curious to learn more about these areas of advocacy:</Text>
                    {interestsCurious.map((interest, index) => (
                        <View key={uuid.v4()} style={styles.interestContainer}>
                        <TouchableOpacity style={interest.selected ? styles.interestSelected : styles.interest} onPress={() => handleInterestSelection(interest.name, index, 'Curious')}>
                            <Text style={styles.interestText}>{interest.name}</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.interestContainer}>
                        <TouchableOpacity style={interestsCurious.length % 2 === 0 ? styles.addNewButtonAlone : styles.addNewButton} onPress={() => handleAddInterest('Curious')}>
                            <Text style={styles.addNewButtonText}>+ Add New</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name={'Edit ' + mode} right='Checkmark' callback={handleSubmit}/>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>{mode}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={val => setInput(val)}
                    value={input}
                    placeholder='Type here...'
                    multiline={true}
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
      interestsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        width: width,
        paddingBottom: height * 0.03
      },
      interestContainer: {
        width: width * 0.43,
        marginLeft: 10,
      },
      interest: {
        borderRadius: 16,
        width: width * 0.43,
        marginVertical: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
      },
      interestSelected: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1B0A60',
        width: width * 0.43,
        marginVertical: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
      },
      interestText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10,
      },
      addNewButton: {
        borderRadius: 16,
        width: width * 0.43,
        marginVertical: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
      },
      addNewButtonAlone: {
        left: width / 5,
        borderRadius: 16,
        width: width * 0.43,
        marginVertical: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,  
        elevation: 5,
      },
      addNewButtonText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10,
        color: '#1B0A50',
      },
    scrollViewContainer: {
        width: width,
        alignSelf: 'center',
        marginTop: height * 0.02,
        marginLeft: 24,
        paddingBottom: height * 0.03
    },
    sectionHeading: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        color: '#1A1C23',
        marginVertical: height * 0.02,
    },
    interestsMainContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        height: height * 0.8
    }
    
})