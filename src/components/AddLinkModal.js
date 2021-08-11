import React from 'react';
import { View, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Modals from '../styles/Modals.component.style';

export default function AddLinkModal({modalVisible, setModalVisible, editMode, setTitle, title, setLink, link, setEditMode, addLink}) {

    return (
        <Modal
                    visible={modalVisible}
                    coverScreen={false}
                    animationType='slide'
                    backdropColor='black'
                    transparent={true}
                    backdropOpacity={0.70}
                    onBackdropPress={() => setModalVisible(false)}
                >
                    <KeyboardAvoidingView behavior="padding" style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.modalContainer}>
                                <Text style={Modals.header}>{editMode ? 'Edit' : 'Add New'} Link</Text>
                                <Text style={Modals.subtitle}>Link Title</Text>
                                <Text style={Modals.body}>Give your link a descriptive title — clarify if it's an event link, source, link to additional info, or something else.</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Ex. "Event link", "Source"'
                                    onChangeText={(val) => setTitle(val)}
                                    value={title} />
                                <Text style={Modals.subtitle}>Link</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize='none'
                                    placeholder='https://'
                                    onChangeText={(val) => setLink(val)}
                                    value={link} />
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                                        setModalVisible(false);
                                        setLink('');
                                        setTitle('');
                                        setEditMode(false);
                                    }}>
                                        <Text style={Modals.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={link !== '' ? Modals.enabledModalSubmitButton : Modals.disabledModalSubmitButton}
                                        onPress={() => {
                                            addLink();
                                            setLink('');
                                            setTitle('');
                                            setEditMode(false);
                                        }}>
                                        <Text style={link !== '' ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>   
    )
                 
    
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
})
