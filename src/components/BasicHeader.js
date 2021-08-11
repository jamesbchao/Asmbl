import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../styles/Header.component.style';
import BackButton from '../../assets/images/backButton';
import Checkmark from '../../assets/images/floatingCheckmark';

export default function BasicHeader({ name, right, callback }) {
    const navigation = useNavigation();
    return (
        <View style={Header.containerAlternate}>
            <View style={Header.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackButton />
                </TouchableOpacity>
                <Text style={Header.titleBold}>{name}</Text>
            </View>
            {right === 'Checkmark' && <TouchableOpacity onPress={() => callback()}><Checkmark/></TouchableOpacity>}
        </View>
    )
}