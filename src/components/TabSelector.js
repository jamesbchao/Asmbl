import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

/* Icons */
import ResourcesIcon from '../../assets/images/community/resources';
import ConnectIcon from '../../assets/images/community/connect';
import InterestsFocused from '../../assets/images/myProfileIcons/tabSelectionIcons/interestsFocused';
import InterestsUnfocused from '../../assets/images/myProfileIcons/tabSelectionIcons/interestsUnfocused';
import PostsFocused from '../../assets/images/myProfileIcons/tabSelectionIcons/postsFocused';
import PostsUnfocused from '../../assets/images/myProfileIcons/tabSelectionIcons/postsUnfocused';
import RepostsFocused from '../../assets/images/myProfileIcons/tabSelectionIcons/repostsFocused';
import RepostsUnfocused from '../../assets/images/myProfileIcons/tabSelectionIcons/repostsUnfocused';
import SavedFocused from '../../assets/images/myProfileIcons/tabSelectionIcons/savedFocused';
import SavedUnfocused from '../../assets/images/myProfileIcons/tabSelectionIcons/savedUnfocused';
import ConnectionsUnfocused from '../../assets/images/myProfileIcons/tabSelectionIcons/connectionsUnfocused';
import ConnectionsFocused from '../../assets/images/myProfileIcons/tabSelectionIcons/connectionsFocused';


var { width, height } = Dimensions.get('window');

export default function TabSelector({ tabNames, selectedTab, setSelectedTab }) {

    const renderTabIcon = (tab) => {
        switch (tab) {
            case 'Resources':
                return <ResourcesIcon/>
            case 'Connect':
                return <ConnectIcon/>
            case 'Interests':
                return selectedTab === tab ? <InterestsFocused/> : <InterestsUnfocused/>
            case 'Posts':
                return selectedTab === tab ? <PostsFocused/> : <PostsUnfocused/>
            case 'My Posts':
                return selectedTab === tab ? <PostsFocused/> : <PostsUnfocused/>
            case 'Connections':
                return selectedTab === tab ? <ConnectionsFocused/> : <ConnectionsUnfocused/>
            case 'Reposts':
                return selectedTab === tab ? <RepostsFocused/> : <RepostsUnfocused/>
            case 'Saved':
                return selectedTab === tab ? <SavedFocused/> : <SavedUnfocused/>
            default:
                console.log('invalid tab');
                return null;
        }
    }

    return (
        <View style={styles.container}>
            {tabNames.map((tab) => (
                <TouchableOpacity key={tab} style={selectedTab === tab ? styles.selectedTab : styles.tab} onPress={() => setSelectedTab(tab)}>
                    {renderTabIcon(tab)}
                    <Text style={selectedTab === tab ? styles.selectedText : styles.text}>{tab}</Text>
                </TouchableOpacity> 
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: width,
        marginTop: height * 0.02,
        marginBottom: height * 0.005,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: height * 0.01,
    },
    selectedTab: {
        flex: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: height * 0.01,
    },
    text: {
        marginLeft: width * 0.01,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: '#1A1C23'
    },
    selectedText: {
        marginLeft: width * 0.01,
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19,
        color: 'black',
        fontWeight: '500'
    }
})