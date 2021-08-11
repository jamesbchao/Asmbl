import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { notificationsByUser } from '../graphql/queries';

/* Components */
import TabSelector from '../components/TabSelector';

/* Functions */
import renderTab from '../functions/renderTab.function';

/* Styles */
import Header from '../styles/Header.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';


/* Icons */
import BackButton from '../../assets/images/backButton';

const { width, height } = Dimensions.get('window');

const tabNames = [
    'My Posts',
    'Connections'
]

export default function NotificationsScreen({ navigation, route }) {
    let { id } = route.params;

    const [selectedTab, setSelectedTab] = useState('My Posts');
    

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Notifications</Text>
                </View>
            </View>
            <TabSelector tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {renderTab(null, selectedTab, id)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    }
})