import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

/* Styles */
import Header from '../styles/Header.component.style';
import Modals from '../styles/Modals.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import BackButton from '../../assets/images/backButton';
import BlockedAccounts from '../../assets/images/settings/blockedAccounts';
import Contact from '../../assets/images/settings/contact';
import Email from '../../assets/images/settings/email';
import LogOut from '../../assets/images/settings/logOut';
import Password from '../../assets/images/settings/password'
import PrivacyPolicy from '../../assets/images/settings/privacyPolicy'

const { width, height } = Dimensions.get('window');

const options = [
    'Change email',
    'Change password',
    'Blocked accounts',
    'Asmbl Privacy & Legal Policy',
    'Contact Asmbl',
    'Log Out'
]


export default function SettingsScreen({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);

    const signOut = async() => {
        try {
            await Auth.signOut();
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
            navigation.navigate('Login');
        } catch (err) {
            console.log('error signing out: ', err);
        }
    }

    const handlePressOption = async(item) => {
        switch (item) {
            case 'Change email':
                let user = await Auth.currentAuthenticatedUser();
                const { attributes } = user;
                const { email } = attributes;
                navigation.navigate('ChangeEmail', { email: email });
                break;
            case 'Change password':
                navigation.navigate('ChangePassword')
                break;
            case 'Blocked accounts':
                navigation.navigate('BlockedAccounts');
                break;
            case 'Asmbl Privacy & Legal Policy':
                navigation.navigate('PrivacyPolicy');
                break;
            case 'Contact Asmbl':
                navigation.navigate('Contact')
                break;
            case 'Log Out':
                setModalVisible(!modalVisible);
                break;
            default:
                return;
        }
    }

    const renderIcon = (item) => {
        switch (item) {
            case 'Change email':
                return <Email />
            case 'Change password':
                return <Password />
            case 'Blocked accounts':
                return <BlockedAccounts />
            case 'Asmbl Privacy & Legal Policy':
                return <PrivacyPolicy />
            case 'Contact Asmbl':
                return <Contact />
            case 'Log Out':
                return <LogOut />
            default:
                return null;
        }
    }

    const renderOption = ({ item }) => {
        return (
            <TouchableOpacity style={styles.option} onPress={() => handlePressOption(item)}>
                {renderIcon(item)}
                <Text style={item === 'Log Out' ? styles.redText : styles.text}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={Header.containerAlternate}>
                <View style={Header.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButton />
                    </TouchableOpacity>
                    <Text style={Header.titleBold}>Settings</Text>
                </View>
            </View>
            <FlatList
                data={options}
                renderItem={renderOption}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            {modalVisible && 
                <Modal
                    visible={modalVisible}
                    coverScreen={false}
                    animationType='slide'
                    backdropColor='black'
                    transparent={true}
                    backdropOpactiy={0.70}
                    onBackdropPress={() => setModalVisible(false)}
                >
                    <View style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.logOutContainer}>
                                <Text style={Modals.header}>Are you sure you want to log out?</Text>
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => setModalVisible(false)}>
                                        <Text style={Modals.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Modals.enabledModalSubmitButton} onPress={() => {
                                        setModalVisible(false);
                                        signOut();
                                    }}>
                                        <Text style={Modals.enabledModalSubmitText}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E3E3E3',
        borderBottomWidth: 1,
        width: width * 0.9,
        paddingVertical: width * 0.05,
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Avenir',
        marginLeft: width * 0.04,
        fontSize: 16
    },
    redText: {
        fontFamily: 'Avenir',
        color: '#C42727',
        marginLeft: width * 0.04,
        fontSize: 16
    }
})