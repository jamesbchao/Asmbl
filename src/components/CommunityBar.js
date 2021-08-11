import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { getCommunity } from '../graphql/queries';

/* Icons */
import ArrowIcon from '../../assets/images/arrowIcon';
import ConnectIcon from '../../assets/images/community/connect';

const { width, height } = Dimensions.get('window');

export default function CommunityBar({ id }) {

    const navigation = useNavigation();

    const [name, setName] = useState('');

    useEffect(() => {
        fetchCommunity();
    }, []);

    const fetchCommunity = async () => {
        let commData = await API.graphql(graphqlOperation(getCommunity, { id: id }));
        setName(commData.data.getCommunity.name);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Community', {id: id, name: name})}>
            <ConnectIcon />
            <Text style={styles.text}>{name}</Text>
            <ArrowIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C6A4FF',
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.01,
    },
    text: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#1B0A60',
        marginHorizontal: width * 0.02,
    }
})