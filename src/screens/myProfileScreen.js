import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import { Auth, API, graphqlOperation, Analytics } from 'aws-amplify';
import { useIsFocused } from "@react-navigation/native";
/* Queries */
import { userByUsername } from "../graphql/queries";
import { updateUser } from '../graphql/mutations';

/* Components */
import TabSelector from '../components/TabSelector';
import ProfileButtons from '../components/ProfileButtons';

/* Functions */
import renderTab from '../functions/renderTab.function';
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Profile from '../styles/Profile.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Icons */
import NotificationBell from '../../assets/images/myProfileIcons/notificationBell';
import NotificationBellActive from '../../assets/images/myProfileIcons/notificationBellActive';
import Settings from '../../assets/images/myProfileIcons/settings';


var { width, height } = Dimensions.get('window');

const initialState = {
  user_name: '',
  first_name: '',
  last_name: '',
  profile_picture: null,
  bio: '',
  interests_experience: [],
  interests_learn_more: [],
}

const tabNames = [
  'Interests',
  'Posts',
  'Reposts',
  'Saved'
]

const MyProfileScreen = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [startTime, setStartTime] = useState(null);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [user, setUser] = useState(initialState);
  const [selectedTab, setSelectedTab] = useState('Interests');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
    handleTrackTimeSpent(isFocused);
  }, [isFocused]);

  const handleTrackTimeSpent = async(isFocused) => {
    if (isFocused) {
        let now = new Date();
        setStartTime(now);
    } else {
        const u = await getCurrentUser();
        let now = new Date();
        let diff = now - startTime;
        console.log(diff);
        Analytics.record('timeSpentMyProfile', { username: u.user_name, userID: u.id }, { timeSpent: diff });
    }
}

  const getUser = async() => {
    const { username } = await Auth.currentUserInfo();
    const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
    const userObj = userData.data.userByUsername.items[0];

    if (!userObj.bio || !userObj.interests_experience || !userObj.interests_learn_more) {
      navigation.navigate('BuildProfile1');
    }

    setHasNewNotifications(userObj.hasNewNotifications);

    const userInfo = {
      id: userObj.id,
      user_name: userObj.user_name,
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      profile_picture: userObj.profile_picture,
      bio: userObj.bio,
      interests_experience: userObj.interests_experience,
      interests_learn_more: userObj.interests_learn_more,
      saved_posts: userObj.saved_posts,
    }
    console.log(userObj.profile_picture);
    setUser(userInfo);
    setLoading(false);
  }

  const handlePressNotifications = async() => {
    try {
      let userObj = {
        id: user.id,
        hasNewNotifications: false
      }
      let updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
      navigation.navigate('Notifications', { id: user.id });
    } catch (err) {
      console.log(err);
    }
  }

  const handlePressSettings = () => {
    navigation.navigate('Settings');
  }

  const handleEditProfile = () => {
    console.log('edit profile');
  }

  const handleTabSelection = (tab) => {
    setSelectedTab(tab);
  }

  if (loading) {
    return <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={Profile.headerContainer}>
          <Text style={Profile.headerText}>My Profile</Text>
          <View style={Profile.headerIconsContainer}>
            <TouchableOpacity onPress={() => handlePressNotifications()}>
              {hasNewNotifications ? <NotificationBellActive/> : <NotificationBell/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePressSettings()}>
              <Settings/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator />
        </View>
    </SafeAreaView>
}

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={Profile.headerContainer}>
        <Text style={Profile.headerText}>My Profile</Text>
        <View style={Profile.headerIconsContainer}>
          <TouchableOpacity onPress={() => handlePressNotifications()}>
            {hasNewNotifications ? <NotificationBellActive/> : <NotificationBell/>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressSettings()}>
            <Settings/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Profile.userInfoContainer}>
        <Image source={{uri: user.profile_picture}} style={Profile.profilePicture}/>
        <View style={Profile.userInfoTextContainer}>
          <Text style={Profile.userInfoBoldText}>{user.first_name + ' ' + user.last_name}</Text>
          <Text style={Profile.userInfoBoldText}>@{user.user_name}</Text>
          <Text style={Profile.userInfoText}>{user.bio}</Text>
        </View>
      </View>
      <ProfileButtons />
      <TabSelector tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <View style={Profile.mainContainer}>
          {renderTab(user, selectedTab)}
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white'
  }
});

export default MyProfileScreen;


