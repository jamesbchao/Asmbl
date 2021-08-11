import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Screens */
import LandingPage from "../screens/landingPage";
import LoginScreen from '../screens/loginScreen';
import SignInScreen from '../screens/signInScreen';
import SignUpScreen from '../screens/signUpScreen';
import VerifyAccountScreen from '../screens/verifyAccountScreen';
import CommunityGuidelines from '../screens/communityGuidelines';
import BuildProfile1 from '../screens/buildProfileForm/buildProfile1';
import BuildProfile2 from '../screens/buildProfileForm/buildProfile2';
import BuildProfile2b from '../screens/buildProfileForm/buildProfile2b';
import BuildProfile3 from '../screens/buildProfileForm/buildProfile3';
import CreatePostScreen from '../screens/createPostScreen';
import PostScreen from '../screens/postScreen';
import EditPostScreen from '../screens/editPostScreen';
import AddLinksScreen from '../screens/addLinksScreen';
import AddCaptionScreen from '../screens/addCaptionScreen';
import AddAltTextScreen from '../screens/addAltTextScreen';
import CreateUserScreen from '../screens/createUserScreen';
import CreateCommunityScreen from '../screens/createCommunityScreen';
import ResetPasswordScreen from '../screens/resetPasswordScreen';
import VerifyNewEmailScreen from '../screens/settings/verifyNewEmailScreen';
import ComingSoonScreen from '../screens/comingSoonScreen';

import DeleteUserScreen from '../screens/deleteUserScreen';
import PaginationTestingScreen from '../screens/paginationTestingScreen';
import OtherScreen from '../screens/otherScreen';

/* Tab Navigator */
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName='LandingPage' screenOptions={{headerShown: false}}>
            <Stack.Screen name="LandingPage" component={LandingPage} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Guidelines" component={CommunityGuidelines} options={{gestureEnabled: false}}/>
            <Stack.Screen name="BuildProfile1" component={BuildProfile1} options={{gestureEnabled: false}}/>
            <Stack.Screen name="BuildProfile2" component={BuildProfile2} options={{gestureEnabled: false}}/>
            <Stack.Screen name="BuildProfile2b" component={BuildProfile2b} options={{gestureEnabled: false}}/>
            <Stack.Screen name="BuildProfile3" component={BuildProfile3} options={{gestureEnabled: false}}/>
            
            <Stack.Screen name="Home" component={TabNavigator} options={{gestureEnabled: false}}/>

            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="AddLinks" component={AddLinksScreen}/>
            <Stack.Screen name="AddCaption" component={AddCaptionScreen} />
            <Stack.Screen name="AddAltText" component={AddAltTextScreen}/>
            <Stack.Screen name="PostScreen" component={PostScreen}/>
            <Stack.Screen name="EditPostScreen" component={EditPostScreen}/>
            <Stack.Screen name="VerifyNewEmail" component={VerifyNewEmailScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen}/>

            {/* Temporary Screens */}
            <Stack.Screen name="CreateUser" component={CreateUserScreen}/>
            <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen}/>
            <Stack.Screen name="DeleteUser" component={DeleteUserScreen}/>
            <Stack.Screen name="Pagination" component={PaginationTestingScreen}/>
            <Stack.Screen name="Other" component={OtherScreen}/>
        </Stack.Navigator>
    )
}

