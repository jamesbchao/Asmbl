import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Components */
import SuccessModal from '../components/SuccessModal';

/* Styles */
import Header from '../styles/Header.component.style';

/* Icons */
import BackButton from '../../assets/images/backButton';

export default function HeaderBar({ title, nextTitle, nextScreen, params, formComplete, callback, showSuccessModal, successModalText }) {

    const [visible, setVisible] = useState(true);
    const [inSubmit, setInSubmit] = useState(false);

    const navigation = useNavigation();
    if (!nextTitle) nextTitle = 'Next';

    const handleSubmit = () => {
        if (!formComplete) return;
        if (callback) callback();
        showSuccessModal ? handleSuccessModal() : navigation.navigate(nextScreen, params);    
    }

    const handleSuccessModal = () => {
        setInSubmit(true);
        setTimeout(() => { 
            navigation.navigate(nextScreen, params);               
        }, 750);
    }

    return (
        <SafeAreaView>
            <View style={Header.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackButton/>
                </TouchableOpacity>
                <Text style={Header.title}>{title}</Text>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text style={formComplete ? Header.next : Header.nextDisabled}>{nextTitle}</Text>
                </TouchableOpacity>
            </View>
            {inSubmit && <SuccessModal visible={visible} setVisible={setVisible} text={successModalText} />}
        </SafeAreaView>
    )
}