import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, TextInput, useWindowDimensions, ScrollView } from "react-native";
import uuid from 'react-native-uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import { getCommunity, listUsers } from '../graphql/queries';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import tabNavCom from '../../assets/images/tabNavCom.svg';
import PostScreen from './postScreen';
import SourceIcon from '../../assets/images/sourceIcon.svg';
import TagIcon from '../../assets/images/tagIcon.svg';
import XButton from '../../assets/images/xButton.svg';
import UserIcon from '../../assets/images/userIcon.svg';


const TagType = {
  USER: 1,
  EVENT: 2,
}

const initialPostState = {
  id: null,
  caption: '',
  image: null,
  altText: '',
  communityID: '',
  userID: '',
  comments: [],
  sources: [],
  tags: [],
}

DropDownPicker.setListMode('FLATLIST')

const CreatePostScreen = ({ navigation }) => {

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => {
          setFormState({...formState, tags: tags});
          setFormState({...formState, sources: sources});
          setFormState({...formState, id: postID});
          //navigation.navigate('AddCaption');
          navigation.navigate('SignUp');
        }} title="Next" />
      )
    })
  }, [navigation])

  const [formState, setFormState] = useState(initialPostState);

  const setInput = (key, value) => {
    setFormState({...formState, [key]: value});
  }

  //const [image, setImage] = useState(null);
  const [postID, setPostID] = useState('');
  const [file, setFile] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityID, setCommunityID] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'User', value: 'user', icon: () => <UserIcon />},
    {label: 'Event', value: 'event', icon: () => <TagIcon />},
  ]);

  const [modalState, setModalState] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceBody, setSourceBody] = useState('');

  const [eventListing, setEventListing] = useState('');
  const [userSearchText, setUserSearchText] = useState('')

  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserID, setSelectedUserID] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    pickImage();
    getCurrentUser();

    let id = uuid.v4();
    setPostID(id);

    queryUsers();
  }, []);

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.cancelled) {
      setFormState({...formState, image: result.uri});
      //setImage(result.uri);
      navigation.setOptions({title: 'Add Tags & Sources'});
    }
  };

  const addTag = (content, type) => {
    let tag = { postID: postID }
    if (type === 'event') {
      tag = {...tag, type: TagType.EVENT, content: content};
    } else {
      tag = {...tag, type: TagType.USER, content: content};
    }

    let tagsArray = tags;
    tagsArray.push(tag);
    setTags(tagsArray);
  }

  const getCurrentUser = async() => {
    //const { attributes } = await Auth.currentAuthenticatedUser();
    const user = await Auth.currentUserInfo();
    console.log('user attributes: ', user);
  }

  const addUser = (user) => {

  }

  const queryUsers = async() => {
    let userData = await API.graphql({ query: listUsers });
    let userArray = userData.data.listUsers.items;

    console.log('users:', userArray);

    setUsers(userArray);
  }

  const sortSearchedUsers = (searchedUser) => {
    let items = users;
    
    const filteredItems = items.filter((item) => item.user_name.toLowerCase().startsWith(searchedUser.toLowerCase()));
    if (filteredItems.length >= 5) {
      filteredItems.splice(0, 5)
    }
    setFilteredUsers(filteredItems);

  }

  const addSource = () => {
    let source = { title: sourceTitle, body: sourceBody }
    let sourceArray = sources;
    sourceArray.push(source);
    setSources(sourceArray);
  }

  const removeTag = (index) => {
    let tagsArray = tags;
    tagsArray.splice(index, 1);
    setTags([...tagsArray]);
  }

  const removeSource = (index) => {
    let sourceArray = sources;
    sourceArray.splice(index, 1);
    setSources([...sourceArray]);
  }
  

  return <View style={styles.container}>
    {formState.image && 
    <TouchableOpacity onPress={() => {
      navigation.navigate('Post');
    }}>
      <Image style={styles.image} source={{uri: formState.image}} />
    </TouchableOpacity>
    }
    <View style={styles.addButtonsContainer}>
      <DropDownPicker
        containerStyle={styles.dropDownPicker}
        open={open}
        value={value}
        items={items}
        placeholder="Add Tag"
        closeAfterSelecting={true}
        itemSeparator={true}
        onChangeValue={(value) => {
          setModalState(value);
          if(value !== null) setModalVisible(true);
          if(value === "users") queryUsers();
        }}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TouchableOpacity style={styles.addSourceButton} onPress={() => setSourceModalVisible(true)}>
        <View style={{flexDirection: 'row'}}>
          <SourceIcon />
          <Text style={styles.addSourceText}>Add Source</Text>
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.listHeader}>Tags</Text>
      <Text style={styles.listBody}>Use the Add Tag menu above to add tags for users, event listings, or resources.</Text>
      {tags !== [] && tags.map((tag, index) => (
        <View key={tag.id} style={styles.tagListing}>
          <TouchableOpacity key={uuid.v4()} onPress={() => removeTag(index)} style={styles.xButton}>
            <XButton key={uuid.v4()} />
          </TouchableOpacity>
          {tag.type === TagType.USER ? 
          <UserIcon key={uuid.v4()} style={styles.tagIcon}/> : <TagIcon key={uuid.v4()} style={styles.tagIcon}/>}
          <Text key={uuid.v4()} style={styles.tagContent}>{tag.content.length > 20 ? tag.content.slice(0, 40).concat('...') : tag.content}</Text>
        </View>
      ))}
      <Text style={styles.listHeader}>Sources</Text>
      <Text style={styles.listBody}>Add credible sources to support the information and/or claims in your post.</Text>
      {sources !== [] && sources.map((source, index) => (
        <View key={source.id} style={styles.tagListing}>
          <TouchableOpacity key={uuid.v4()} onPress={() => removeSource(index)} style={styles.xButton}>
            <XButton key={uuid.v4()} />
          </TouchableOpacity>
          <SourceIcon key={uuid.v4()} style={styles.tagIcon} />
          <Text key={uuid.v4()} style={styles.tagContent}>{source.body.length > 20 ? source.body.slice(0, 40).concat('...') : source.body}</Text>
        </View>
      ))}
    </View>
    <Modal 
      animationType="slide"
      transparent={true}
      visible={sourceModalVisible}
      onRequestClose={() => {
        setSourceModalVisible(false)
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Add a Source</Text>
              <Text style={styles.modalBody}>Add a link to a reputable source for your post.</Text>
              <TextInput 
                style={styles.input}
                onChangeText={val => setSourceTitle(val)}
                value={sourceTitle}
                placeholder="Title"
              />
              <TextInput 
                style={styles.input}
                onChangeText={val => setSourceBody(val)}
                value={sourceBody}
                placeholder="Link"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity onPress={() => {
                  setSourceModalVisible(false);
                  setSourceTitle('');
                  setSourceBody('');
                }}>
                  <Text style={styles.modalCancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={sourceBody === '' ? styles.disabledModalSubmitButton : styles.enabledModalSubmitButton}
                onPress={() => {
                  addSource();
                  setSourceModalVisible(false);
                  setSourceTitle('');
                  setSourceBody('');
                }}>
                  <Text style={sourceBody === '' ? styles.disabledModalSubmitText : styles.enabledModalSubmitText}>Add Source</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalState === 'event' && 
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Tag an Event Listing</Text>
              <Text style={styles.modalBody}>Add a url where more information about your event can be found. Examples include an Eventbrite, Zoom, or webpage link.</Text>
              <TextInput 
                style={styles.input}
                onChangeText={val => setEventListing(val)}
                value={eventListing}
                placeholder="https://"/>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(false);
                  setValue(null);
                }}>
                  <Text style={styles.modalCancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={eventListing === '' ? styles.disabledModalSubmitButton : styles.enabledModalSubmitButton}
                onPress={() => {
                  addTag(eventListing, 'event');
                  setModalVisible(false);
                  setValue(null);
                }}>
                  <Text style={eventListing === '' ? styles.disabledModalSubmitText : styles.enabledModalSubmitText}>Tag</Text>
                </TouchableOpacity>
              </View>
            </View>}
            {modalState === 'user' && 
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Tag a User</Text>
              <Text style={styles.modalBody}>Tag a relevant user on Asmbl in your post.</Text>
              <TextInput 
                style={styles.input}
                onChangeText={val => {
                  setUserSearchText(val);
                  sortSearchedUsers(val);
                }}
                value={userSearchText}
                placeholder="Search users..."/>
              <View style={styles.searchedUsers}>
                <ScrollView style={styles.searchedUsers} showsVerticalScrollIndicator={false}> 
                  {filteredUsers !== [] && filteredUsers.map(user => (
                    <View key={user.id} style={isUserSelected && selectedUserID === user.id ? styles.userSearchListingEnabled : styles.userSearchListingDisabled}>
                      <TouchableOpacity 
                        onPress={() => {
                          setIsUserSelected(true);
                          setSelectedUser(user.first_name.concat(' ').concat(user.last_name));
                          setSelectedUserID(user.id);
                        }}>
                        <View style={styles.userSearchListingContainer}>
                          <Image style={styles.userSearchListingProfilePicture} source={{uri: user.profile_picture}} />
                          <View>
                            <Text style={styles.userSearchListingName}>{user.first_name.concat(' ').concat(user.last_name)}</Text>
                            <Text style={styles.userSearchListingUsername}>{'@'.concat(user.user_name)}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(false);
                  setValue(null);
                  setIsUserSelected(false);
                }}>
                  <Text style={styles.modalCancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={!isUserSelected ? styles.disabledModalSubmitButton : styles.enabledModalSubmitButton}
                onPress={() => {
                  addTag(selectedUser, 'user');
                  setModalVisible(false);
                  setValue(null);
                  setIsUserSelected(false);
                }}>
                  <Text style={!isUserSelected ? styles.disabledModalSubmitText : styles.enabledModalSubmitText}>Tag</Text>
                </TouchableOpacity>
              </View>
            </View>}
          </View>
        </View>
      </Modal>
  </View>
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 1000
  },
  text: {
    fontSize: 32,
    fontFamily: 'Avenir',
    top: 100,
  },
  image: {
    //width: 400,
    height: 400
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
  input: {
    borderColor: '#4B4B4B',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  addButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20
  },
  listContainer: {
    //alignItems: 'center'
    zIndex: -1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  listHeader: {
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 14,
    marginTop: 20,
  },
  listBody: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 20
  },
  tagListing: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  tagIcon: {
    marginHorizontal: 20,
    //position: 'relative',
    //bottom: 10
  },
  dropDownPicker: {
    //flex: 1
    width: 150,
    opacity: 1.0,

  },
  addSourceButton: {
    borderRadius: 16,
    borderColor: '#4B4B4B',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    //marginRight: 20
  },
  addSourceText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    marginLeft: 10
  },
  searchedUsers: {
    //borderRadius: 16,
    //borderWidth: 1,
    //borderColor: 'black',
    //padding: 10
    maxHeight: 200
  },
  userSearchListingDisabled: {
    padding: 10,
    marginVertical: 10
  },
  userSearchListingEnabled: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10
  },
  userSearchListingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userSearchListingName: {
    fontFamily: 'Avenir',
    fontSize: 14,
    marginLeft: 20,
  },
  userSearchListingUsername: {
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 20
  },
  userSearchListingProfilePicture: {
    width: 50, 
    height: 50,
    borderRadius: 400 / 2
  }

});


export default CreatePostScreen;