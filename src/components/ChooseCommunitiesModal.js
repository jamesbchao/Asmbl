import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from 'react-native';
import { API, Storage } from 'aws-amplify';

/* Queries */
import { listCommunitys } from '../graphql/queries';

/* Styles */
import Modals from '../styles/Modals.component.style';

/* Icons */
import GreenCheckmark from '../../assets/images/greenCheckmark';

var { width, height } = Dimensions.get('window');

export default function ChooseCommunitiesModal({modalVisible, setModalVisible, addCommunities}) {

    const [communities, setCommunities] = useState([]);
    const [selectedCommunities, setSelectedCommunities] = useState([]);

    useEffect(() => {
        getCommunities();
    }, []);

    const getCommunities = async() => {
        let communityData = await API.graphql({ query: listCommunitys });
        let communityArray = communityData.data.listCommunitys.items;
        communityArray.forEach((community) => {
            community.selected = false;
        })
        setCommunities(communityArray);
    }

    const selectCommunity = (index) => {
        let communityArr = communities;
        if (!communityArr[index].selected) {
            if (selectedCommunities.length >= 3) return;
            setSelectedCommunities([...selectedCommunities, communityArr[index]]); 
        } else {
            let selectedCommunitiesArr = selectedCommunities;
            selectedCommunitiesArr.pop();
            setSelectedCommunities([...selectedCommunitiesArr]);
        }
        communityArr[index].selected = !communityArr[index].selected;
        setCommunities([...communityArr]);
    } 

    return <Modal
        visible={modalVisible}
        coverScreen={false}
        animationType='slide'
        backdropColor='black'
        transparent={true}
        backdropOpacity={0.70}
        onBackdropPress={() => setModalVisible(false)}
    >
        <View style={Modals.centeredView}>
            <View style={Modals.modalView}>
                <View style={Modals.modalContainer}>
                    <Text style={Modals.centeredHeader}>Choose Communities</Text>
                    <ScrollView style={styles.scrollView}>
                        {communities.map((community, index) => (
                            <TouchableOpacity key={index} style={styles.community} onPress={() => selectCommunity(index)}>
                                <View style={styles.label}>
                                    <Image style={styles.image} source={{uri: community.picture}} />
                                    <Text style={styles.text}>{community.name}</Text>
                                </View>
                                {community.selected && <GreenCheckmark width={width * 0.1} height={width * 0.1}/>}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={Modals.modalButtonsContainer}>
                        <TouchableOpacity style={Modals.cancelButton} onPress={() => {
                            setModalVisible(false);
                        }}>
                            <Text style={Modals.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedCommunities.length !== 0 ? Modals.enabledModalSubmitButton : Modals.disabledModalSubmitButton}
                            onPress={() => {
                                addCommunities(selectedCommunities);
                            }}>
                            <Text style={selectedCommunities.length !== 0 ? Modals.enabledModalSubmitText : Modals.disabledModalSubmitText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    community: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.8,
        paddingVertical: height * 0.01,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: 8,
        marginRight: width * 0.05,
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        lineHeight: 19
    }
})
