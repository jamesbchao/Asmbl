import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { userByUsername } from '../graphql/queries';
import { updateUser } from '../graphql/mutations';

/* Icons */
import GreenCheckmark from '../../assets/images/community/greenCheckmark';
import InactiveCheckmark from '../../assets/images/community/inactiveCheckmark';

var { width, height } = Dimensions.get('window');

export default function CommunityJoinButton({ communityID }) {

    const [joined, setJoined] = useState(false);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [index, setIndex] = useState(0);
    const [userID, setUserID] = useState('');

    useEffect(() => {
        checkJoined();
    }, [])

    const checkJoined = async() => {
        let { username } = await Auth.currentUserInfo();
        const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
        let userObj = userData.data.userByUsername.items[0];
        let joinedCommunitiesArr = userObj.joined_communities;
        setUserID(userObj.id);

        if (!joinedCommunitiesArr) return;
        joinedCommunitiesArr.forEach((community, index) => {
            if (communityID === community) {
                setJoined(true);
                setIndex(index);
            }
        });
        setJoinedCommunities([...joinedCommunitiesArr]);

    }

    const handleJoin = async() => {
        if (joined) {
            let communityArr = joinedCommunities;
            communityArr.splice(index, 1);
            setJoinedCommunities([...communityArr]);
        } else {
            let communityArr = joinedCommunities;
            communityArr.push(communityID);
            setJoinedCommunities([...communityArr]);
        }

        let userInfo = {
            id: userID,
            joined_communities: [...joinedCommunities]
        }

        const updatedUserData = await API.graphql(graphqlOperation(updateUser, { input: userInfo }));
        const updatedUserObj = updatedUserData.data.updateUser;

        setJoined(!joined);
    }

    return (
        <TouchableOpacity style={joined ? styles.joinedButton : styles.joinButton} onPress={() => handleJoin()}>
            { joined ? <GreenCheckmark/> : <InactiveCheckmark/> }
            <Text style={joined ? styles.joinedText : styles.joinText}>{joined ? 'Joined' : 'Join' }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    joinedButton: {
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#2E6720',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    joinedText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'right',
        color: '#2E6720',
        marginLeft: width * 0.01,
    },
    joinButton: {
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#1B0A60',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    joinText: {
        fontFamily: 'Avenir',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'right',
        color: '#1B0A60',
        marginLeft: width * 0.01,
    },
})