import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput, Pressable } from 'react-native';
import Modals from '../styles/Modals.component.style';
import Forms from '../styles/Forms.component.style';
import { useForm, Controller } from "react-hook-form";
import { Auth } from 'aws-amplify';
import SuccessModal from './SuccessModal';


const ResetPasswordModal = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [openResetModal, setOpenResetModal] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    const onSubmit = () => {
        Auth.forgotPassword(username)
            .then(data => {
                console.log(data);
                console.log('email:', data.CodeDeliveryDetails.Destination)
                setEmail(data.CodeDeliveryDetails.Destination);
            })
            .catch(err => console.log(err));

        setOpenResetModal(false);
        setSuccessModal(true);
        setTimeout(() => { 
            setSuccessModal(false);
            navigation.navigate('ResetPassword', {
                username: username,
                email: email
            });          
          }, 1000);
        return () => clearTimeout(timer);
    }

    const doneButtonLogic = () => {
        if (errors.resetEmail) {
            return (
                <Pressable style={{...Modals.doneButtonContainer, ...Modals.doneFaintContainer}}>
                    <Text style={{...Modals.doneButton, ... Modals.doneFaint}}>Done</Text>
                </Pressable>
            )
        } else {
            return (
                <TouchableOpacity style={Modals.doneButtonContainer} onPress={handleSubmit(onSubmit)}>
                    <Text style={Modals.doneButton}>Done</Text>
                </TouchableOpacity>
            )
        }
    }

    return(
        <View>
            {/* Reset Modal */}
            <Modal
                visible={openResetModal}
                coverScreen={false}
                animationType='slide'
                backdropColor='black'
                transparent={true}
                backdropOpacity={0.70}
                onBackdropPress={() => setOpenResetModal(false)}
            >
                <KeyboardAvoidingView behavior="padding" style={Modals.container}>
                    <View style={Modals.textContainer}>
                        <Text style={Modals.header}>Reset Password</Text>
                        <Text style={Modals.body}>Enter your username and we'll send a code to your registered email to reset your password.</Text>
                        <View style={Modals.inputContainer}>
                            <TextInput
                                style={Modals.inputBody}
                                autoCapitalize="none"
                                placeholder='Your username'
                                onChangeText={(value) => setUsername(value)}
                                value={username}
                            />
                        </View>
                        <View style={Modals.buttonContainer}>
                            <TouchableOpacity style={Modals.cancelButtonContainer} onPress={()=> setOpenResetModal(false)}>
                                <Text style={Modals.cancelButton}>Cancel</Text>
                            </TouchableOpacity>
                            {doneButtonLogic()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Success Modal*/}
            {/*successModal && <SuccessModal visible={successModal} setVisible={setSuccessModal} text='Code Sent'/>*/}
            {/*SuccessModal(successModal, setOpenResetModal)*/}

        </View>
    )
};

export default ResetPasswordModal;


