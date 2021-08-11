import React, { useState ,useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { updateUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';

/* Components */
import BasicHeader from '../components/BasicHeader';

/* Styles */
import Modals from '../styles/Modals.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Functions */
import { getCurrentUser } from '../functions/getCurrentUser.function';

/* Icons */
import BlockedUserIcon from '../../assets/images/blockedUserIcon';
import ForwardIcon from '../../assets/images/forwardButton';

const { width, height } = Dimensions.get('window');

export default function BlockedAccountsScreen({ }) {

    const [id, setID] = useState('');
    const [userID, setUserID] = useState('');
    const [blockedAccounts, setBlockedAccounts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchBlockedAccounts();
    }, []);

    const fetchBlockedAccounts = async() => {
        let user = await getCurrentUser();
        let blocked_accounts = user.blocked_accounts;
        let userID = user.id;
        setUserID(userID);

        blocked_accounts = await Promise.all(blocked_accounts.map(async(account) => {
            const userData = await API.graphql(graphqlOperation(getUser, { id: account }));
            const userObj = userData.data.getUser;

            return {
                id: account,
                name: userObj.first_name + ' ' + userObj.last_name,
                username: userObj.user_name
            }
        }));

        setBlockedAccounts(blocked_accounts);
    }

    const handleUnblock = (id) => {
        setModalVisible(true);
        setID(id);
    }

    const unblock = async() => {

        let arr = blockedAccounts;
        let arr2 = [];
        arr.forEach(e => {
            arr2.push(e.id);
        })
        arr2.splice(arr2.indexOf(id), 1);
        let userObj = {
            id: userID,
            blocked_accounts: arr2,
        }
        console.log(userObj);
        let updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
        console.log(updatedUser);
        fetchBlockedAccounts();
 
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.userContainer} onPress={() => handleUnblock(item.id)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <BlockedUserIcon />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.username}</Text>
                </View>
            </View>
            <ForwardIcon />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <BasicHeader name="Blocked Accounts" />
            <View style={styles.mainContainer}>
                <FlatList 
                    data={blockedAccounts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
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
                                <Text style={Modals.header}>Do you want to unblock this user?</Text>
                                <View style={Modals.modalButtonsContainer}>
                                    <TouchableOpacity style={Modals.cancelButton} onPress={() => setModalVisible(false)}>
                                        <Text style={Modals.cancelButton}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Modals.enabledModalSubmitButton} onPress={() => {
                                        setModalVisible(false);
                                        unblock();
                                    }}>
                                        <Text style={Modals.enabledModalSubmitText}>Unblock</Text>
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
    mainContainer: {
        width: width * 0.95,
        alignSelf: 'center',
        height: height * 0.8
    },
    flatList: {
        paddingBottom: height * 0.2,
    },
    userContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        alignSelf: 'center',
        width: width * 0.9,
        alignItems: 'center',
        paddingVertical: height * 0.01,
        marginVertical: height * 0.01,
        paddingLeft: width * 0.02,
        justifyContent: 'space-between'
    },
    textContainer: {
        marginLeft: width * 0.03
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'bold'
    }
})