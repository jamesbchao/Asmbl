import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

/* Screens */
import CommunitiesScreen from '../screens/communitiesScreen';
import CommunityScreen from '../screens/communityScreen';
import HomeFeedScreen from '../screens/homeFeedScreen';
import LinksScreen from '../screens/linksScreen';
import CommentsScreen from '../screens/commentsScreen';
import CreatePostScreen from '../screens/createPostScreen';
import MessagesScreen from '../screens/messagesScreen';
import MessageScreen from '../screens/messageScreen';
import SendNewMessageScreen from '../screens/sendNewMessageScreen';
import MyProfileScreen from '../screens/myProfileScreen';
import UserProfileScreen from '../screens/userProfileScreen';
import PostScreen from '../screens/postScreen';
import SettingsScreen from '../screens/settingsScreen'
import PrivacyPolicyScreen from '../screens/settings/privacyPolicyScreen';
import ContactScreen from '../screens/settings/contactScreen';
import NotificationsScreen from '../screens/notificationsScreen';
import MyNetworkScreen from '../screens/myNetworkScreen';
import EditProfileScreen from '../screens/editProfileScreen';
import EditUserInfoScreen from '../screens/editUserInfoScreen';
import ChangeEmailScreen from '../screens/settings/changeEmailScreen';
import ChangePasswordScreen from '../screens/settings/changePasswordScreen';
import BlockedAccountsScreen from '../screens/blockedAccountsScreen';
import MessageUserScreen from '../screens/messageUserScreen';
import SearchScreen from '../screens/searchScreen';

/* Icons */
import CommunitiesFocused from '../../assets/images/tabNavIcons/communitiesFocused.svg';
import CommunitiesUnfocused from '../../assets/images/tabNavIcons/communitiesUnfocused.svg';
import MessagesFocused from '../../assets/images/tabNavIcons/messagesFocused.svg';
import MessagesUnfocused from '../../assets/images/tabNavIcons/messagesUnfocused.svg';
import MyProfileFocused from '../../assets/images/tabNavIcons/myProfileFocused.svg';
import MyProfileUnfocused from '../../assets/images/tabNavIcons/myProfileUnfocused.svg';
import PostFocused from '../../assets/images/tabNavIcons/postFocused.svg';
import PostUnfocused from '../../assets/images/tabNavIcons/postUnfocused.svg';
import SearchFocused from '../../assets/images/tabNavIcons/searchFocused.svg';
import SearchUnfocused from '../../assets/images/tabNavIcons/searchUnfocused.svg';

const Tab = createBottomTabNavigator();
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProfileStack = createStackNavigator();

function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator initialRouteName='MyProfile' screenOptions={{headerShown: false}}>
            <ProfileStack.Screen name="MyProfile" component={MyProfileScreen}/>
            <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
            <ProfileStack.Screen name="Notifications" component={NotificationsScreen}/>
            <ProfileStack.Screen name="MyNetwork" component={MyNetworkScreen}/>
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen}/>
            <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen}/>
            <ProfileStack.Screen name="Contact" component={ContactScreen}/>
            <ProfileStack.Screen name="EditUserInfo" component={EditUserInfoScreen}/>
            <ProfileStack.Screen name="ChangeEmail" component={ChangeEmailScreen}/>
            <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
            <ProfileStack.Screen name="BlockedAccounts" component={BlockedAccountsScreen}/>
        </ProfileStack.Navigator>
    )
}

const CommunityStack = createStackNavigator();

function CommunityStackNavigator() {
    return (
        <CommunityStack.Navigator initialRouteName='Communities' screenOptions={{headerShown: false}}>
            <CommunityStack.Screen name='Communities' component={CommunitiesScreen}/>
            <CommunityStack.Screen name='Community' component={CommunityScreen}/>
            <CommunityStack.Screen name='HomeFeed' component={HomeFeedScreen}/>
            <CommunityStack.Screen name='LinksScreen' component={LinksScreen}/>
            <CommunityStack.Screen name='CommentsScreen' component={CommentsScreen}/>
            <CommunityStack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
            <CommunityStack.Screen name="MessageUser" component={MessageUserScreen}/>
            <CommunityStack.Screen name="PostScreen" component={PostScreen}/>
        </CommunityStack.Navigator>
    )
}

const SearchStack = createStackNavigator();

function SearchStackNavigator() {
    return (
        <SearchStack.Navigator initialRouteName='Search' screenOptions={{headerShown: false}}>
            <SearchStack.Screen name='Search' component={SearchScreen}/>
            <SearchStack.Screen name='UserProfileScreen' component={UserProfileScreen}/>
        </SearchStack.Navigator>
    )
}

const MessageStack = createStackNavigator();

function MessageStackNavigator() {
    return (
        <MessageStack.Navigator initialRouteName='MessagesScreen' screenOptions={{headerShown: false}}>
            <MessageStack.Screen name='MessagesScreen' component={MessagesScreen}/>
            <MessageStack.Screen name='MessageScreen' component={MessageScreen}/>
            <MessageStack.Screen name='SendNewMessage' component={SendNewMessageScreen}/>
        </MessageStack.Navigator>
    )
}

export default function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case "Communities":
                            return focused ? <CommunitiesFocused/> : <CommunitiesUnfocused/>
                        case "Search":
                            return focused ? <SearchFocused /> : <SearchUnfocused />
                        case "Share":
                            return focused ? <PostFocused/> : <PostUnfocused/>
                        case "Messages":
                            return focused ? <MessagesFocused/> : <MessagesUnfocused/>
                        case "My Profile":
                            return focused ? <MyProfileFocused/> : <MyProfileUnfocused/>
                        default:
                            return null;
                    }
                },
                gestureEnabled: false,
            })}

            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'white',
                style: { backgroundColor: '#1B0A60', height: height * 0.1, paddingHorizontal: width * 0.025 },
                labelStyle: { fontSize: 12, fontFamily: 'Avenir', fontWeight: '500', lineHeight: 14 }
            }}
        >
            <Tab.Screen name="Communities" component={CommunityStackNavigator} options={{gestureEnabled: false}}/>
            <Tab.Screen name="Search" component={SearchStackNavigator}/>
            <Tab.Screen name="Share" component={CreatePostScreen}/>
            <Tab.Screen name="Messages" component={MessageStackNavigator}/>
            <Tab.Screen name="My Profile" component={ProfileStackNavigator}/>
        </Tab.Navigator>
    )
}