import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

/* Queries */
import { updateUser, deleteFriendship } from '../graphql/mutations';
import { friendshipByIDs } from '../graphql/queries';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Components */
import ReportModal from './ReportModal';
import SuccessModal from './SuccessModal';

/* Styles */
import Modals from '../styles/Modals.component.style';

/* Icons */
import MoreIcon from '../../assets/images/postActionBar/more';
import MoreIconBlue from '../../assets/images/moreIconBlue';
import ReportIcon from '../../assets/images/reportIcon';
import AltTextIcon from '../../assets/images/altTextIcon';
import XButton from '../../assets/images/addLinks/xButton';

const { width, height } = Dimensions.get('window');

export default function PopupMenu({ options, postID, commentID, userID, altText, blue }) {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [confirmBlockUserVisible, setConfirmBlockUserVisible] = useState(false);
    const [altTextVisible, setAltTextVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [mode, setMode] = useState('post');

    const handleSelect = (option) => {
        switch (option) {
            case 'Report user':
                setMode('user');
                setModalVisible(true);
                break;
            case 'Report post':
                setMode('post');
                setModalVisible(true);
                break;
            case 'View alt text':
                setAltTextVisible(!altTextVisible);
                break;
            case 'Block user':
                setConfirmBlockUserVisible(true);
                break;
            default:
                break;
        }
    }

    const handleBlockUser = async() => {
        let arr = [];
        const user = await getCurrentUser();

        if (user.blocked_accounts) arr = user.blocked_accounts;

        if (!arr.includes(userID)) arr.push(userID);

        const userObj = {
            id: user.id,
            blocked_accounts: arr
        };

        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));


        const friendDataFriend = await API.graphql(graphqlOperation(friendshipByIDs, { friendID: user.id, userID: { eq: userID }}));
        const friendDataUser = await API.graphql(graphqlOperation(friendshipByIDs, { friendID: userID, userID: { eq: user.id }}));
        let id1 = friendDataFriend.data.friendshipByIDs.items[0]?.id;
        let id2 = friendDataUser.data.friendshipByIDs.items[0]?.id;

        if (id1) await API.graphql(graphqlOperation(deleteFriendship, { input: { id: id1 }}));
        if (id2) await API.graphql(graphqlOperation(deleteFriendship, { input: { id: id2 }}));

        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}]
        });
        navigation.navigate('Home');
    }

    const renderIcon = (option) => {
        switch (option) {
            case 'Report user':
            case 'Report post':
                return <ReportIcon />
            case 'View alt text':
                return <AltTextIcon />
            case 'Block user':
                return <XButton />
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <Menu renderer={renderers.ContextMenu} style={styles.menu} >
                <MenuTrigger /*style={{alignSelf: 'flex-end'}}*/>
                    {blue ? <MoreIconBlue /> : <MoreIcon />}
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={blue ? styles.menuOptionsUser : styles.menuOptions}>
                    {options.map((option, index) => (
                        <MenuOption key={index} onSelect={() => handleSelect(option)}>
                            <View style={styles.menuOption}>
                                {renderIcon(option)}
                                <Text style={option === 'Block user' ? styles.redText : styles.text}>
                                    {' ' + option}
                                </Text>
                            </View>
                        </MenuOption>
                    ))}
                </MenuOptions>
            </Menu>
            {modalVisible && mode === 'post' && <ReportModal modalVisible={modalVisible} setModalVisible={setModalVisible} postID={postID} setSuccess={setSuccessVisible}/>}
            {modalVisible && mode === 'user' && <ReportModal modalVisible={modalVisible} setModalVisible={setModalVisible} userID={userID} setSuccess={setSuccessVisible}/>}
            {altTextVisible && 
                <Modal
                    visible={altTextVisible}
                    coverScreen={false}
                    animationType='slide'
                    backdropColor='black'
                    transparent={true}
                    backdropOpactiy={0.70}
                    onBackdropPress={() => setAltTextVisible(false)}
                >
                    <View style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.modalContainer}>
                                <Text style={Modals.header}>Alt Text</Text>
                                <Text style={Modals.body}>{altText}</Text>
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                                        setAltTextVisible(false);
                                    }}>
                                        <Text style={Modals.cancelButton}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
            {successVisible && <SuccessModal text='Report Sent! A member of the Asmbl team will review this post shortly.' visible={successVisible} setVisible={setSuccessVisible} />}
            {confirmBlockUserVisible && 
                <Modal
                    visible={confirmBlockUserVisible}
                    coverScreen={false}
                    animationType='slide'
                    backdropColor='black'
                    transparent={true}
                    backdropOpactiy={0.70}
                    onBackdropPress={() => setConfirmBlockUserVisible(false)}
                >
                    <View style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.logOutContainer}>
                                <Text style={Modals.header}>Are you sure you want to block this user?</Text>
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => setConfirmBlockUserVisible(false)}>
                                        <Text style={Modals.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Modals.enabledModalSubmitButton} onPress={() => {
                                        setConfirmBlockUserVisible(false);
                                        handleBlockUser();
                                    }}>
                                        <Text style={Modals.enabledModalSubmitText}>Block</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {

    },
    menu: {
        //alignSelf: 'flex-end',
        //right: height * 0.02,
    },
    menuOptions: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        borderRadius: 10,
        borderTopRightRadius: 0,
        marginTop: height * 0.02,
        marginLeft: -6,
        width: width * 0.3,
    },
    menuOptionsUser: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        borderRadius: 10,
        borderTopRightRadius: 0,
        marginTop: height * 0.02,
        marginLeft: -16,
        width: width * 0.3,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Avenir'
    },
    redText: {
        fontFamily: 'Avenir',
        color: 'red'
    }
})