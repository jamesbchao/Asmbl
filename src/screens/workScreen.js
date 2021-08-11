import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/* Queries */
import { postsByCommunitySorted, postsBySecondCommunity, postsByThirdCommunity, repostsByCommunity } from '../graphql/queries';

/* Components */
import CommunityJoinButton from '../components/CommunityJoinButton';
import TabSelector from '../components/TabSelector';
import Post from '../components/Post';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Styles */
import Header from '../styles/Header.component.style';
import Button from '../styles/Button.component.style';
import Notification from '../styles/Notification.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import BackButton from '../../assets/images/backButton';
import Graphic from '../../assets/images/Graphic';
import AddNewPostIcon from '../../assets/images/addNewPost';

var { width, height } = Dimensions.get('window');

const tabNames = [
    'Resources',
    'Connect'
]

export default function CommunityScreen({ navigation, route }) {
    let { id, name } = route.params;
    const [selectedTab, setSelectedTab] = useState('Resources');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const fetchPosts = async() => {
        
    }
}