import React, {useEffect} from 'react';
import { View, Text, Modal } from 'react-native';
import Modals from '../styles/Modals.component.style';
import SuccessCheck from '../../assets/images/resetPasswordCheck.svg';

export default function SuccessModal({visible, setVisible, text}) {

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 2000)
    }, []);


    return <Modal
        visible={visible}
        coverScreen={false}
        animationType='fade'
        backdropColor='black'
        transparent={true}
        backdropOpacity={0.70}
        onBackdropPress={() => setVisible(false)}
    >
        <View style={Modals.successContainer}>
            <View style={Modals.successTextContainer}>
                <SuccessCheck style={Modals.successCheck} />
                <Text style={Modals.successText}>{text}</Text>
            </View>
        </View>
    </Modal>;
}
