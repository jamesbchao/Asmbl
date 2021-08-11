import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, Modal } from 'react-native';
import DotBar from '../../../assets/images/dotBar2.svg';
import BuildProfileForm from '../../styles/BuildProfileForm.component.style';
import OnboardingText from '../../styles/OnboardingText.component.style';
import Modals from '../../styles/Modals.component.style';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { userByUsername } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import GlobalStyles from '../../styles/GlobalStyles.component.style';


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const originalHeight = 970; {/* original: 942 */}
const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const heightOverflowPercent = (originalHeight/windowHeight) * 100;

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

function BuildProfile2({ navigation }) {

  const [interests, setInterests] = useState(initialState);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedInterestsCounter, setSelectedInterestsCounter] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const handleInterestSelection = (interest, index) => {
    let arr = interests;
    arr[index].selected = !arr[index].selected;
    setInterests(arr);

    if (!selectedInterests.includes(interest)) {
      if (selectedInterestsCounter >= 5) return;
      setSelectedInterests([...selectedInterests, interest]);
      setSelectedInterestsCounter(selectedInterestsCounter + 1);
    } else {
      let interestArray = selectedInterests;
      interestArray = interestArray.filter(str => str !== interest);
      setSelectedInterests(interestArray);
      setSelectedInterestsCounter(selectedInterestsCounter - 1);
    }
  }

  const handleAddInterest = () => {
    setModalVisible(true);
  }

  const submitNewInterest = (interest) => {
    let arr = interests;
    console.log(interest);
    console.log(selectedInterestsCounter);
    if (selectedInterestsCounter < 5) {
      arr.push({name: interest, selected: true});
      setSelectedInterests([...selectedInterests, interest]);
      setSelectedInterestsCounter(selectedInterestsCounter + 1);
    } else {
      arr.push({name: interest, selected: false});
    }
    setInterests(arr);
  }

  const handleSubmit = async() => {
    if (selectedInterestsCounter === 0) return;
    console.log(selectedInterests);

    const { username } = await Auth.currentUserInfo();
    const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username}));
    const userObj = userData.data.userByUsername.items[0];

    const arr = selectedInterests;

    const user = {id: userObj.id, interests_experience: arr};
    const updatedUser = await API.graphql(graphqlOperation(updateUser, {input: user}));
    console.log('updated user: ', updatedUser);

    navigation.navigate('BuildProfile2b');
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <DotBar style={styles.dotBar}/>
        <Text style={OnboardingText.buildFormHeader}>Great! Next, indicate your interests.</Text>
        <Text style={styles.boldText}><B>I am personally connected to or involved in these areas of advocacy:</B></Text>
        <Text style={styles.text}>Choose up to 5. This information will appear on your profile to help other activists get to know you.</Text>
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
        <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.interestsContainer} enableAutomaticScroll={true}>
          {interests.map((interest, index) => (
            <View key={interest.name} style={styles.interestContainer}>
              <TouchableOpacity style={interest.selected ? styles.interestSelected : styles.interest} onPress={() => handleInterestSelection(interest.name, index)}>
                <Text style={styles.interestText}>{interest.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.interestContainer}>
              <TouchableOpacity style={interests.length % 2 === 0 ? styles.addNewButtonAlone : styles.addNewButton} onPress={() => handleAddInterest()}>
                <Text style={styles.addNewButtonText}>+ Add New</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={Modals.modalCancelButton}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={selectedInterestsCounter === 0 ? Modals.disabledModalSubmitButton : Modals.enabledModalSubmitButton}
            onPress={() => handleSubmit()}>
            <Text style={selectedInterestsCounter === 0 ? Modals.disabledModalSubmitText : Modals.enabledModalSubmitText}>Next</Text>
          </TouchableOpacity> 
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: windowHeight
  },
  dotBar: {
    alignSelf: 'center',
    marginTop: 30
  },
  boldText: {
    marginLeft: 24,
    marginTop: windowHeight * 0.02,
    width: width * 0.9,
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 24
  },
  text: {
    marginLeft: 24, 
    marginTop: 8,
    width: width * 0.9
  },
  scrollViewContainer: {
    height: `${heightOverflowPercent + 2}%`,
    width: width,
    alignSelf: 'center',
    marginTop: windowHeight * 0.02,
    marginLeft: 24,
  },
  interestsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: width,
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
  buttonsContainer: {
    display: 'flex',
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: windowHeight * 0.04,
    alignItems: 'center',
    width: width * 0.9,
    justifyContent: 'space-between',
  }
});

export default BuildProfile2;