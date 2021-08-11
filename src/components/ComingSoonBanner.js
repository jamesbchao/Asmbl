import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Banners */
import EventsBanner from '../../assets/images/comingSoon/eventsBanner';
import PetitionsBanner from '../../assets/images/comingSoon/petitionsBanner';
import FundraisersBanner from '../../assets/images/comingSoon/fundraisersBanner';

const { width, height } = Dimensions.get('window');

const banners = [
    'Events',
    'Petitions',
    'Fundraisers'
]


export default function ComingSoonBanner({ i }) {

    const [visible, setVisible] = useState(true);

    const navigation = useNavigation();

    const renderBanner = () => {
        switch(i) {
            case 0:
                return <EventsBanner width={width * 0.8}/>;
            case 1:
                return <PetitionsBanner width={width * 0.8}/>;
            case 2:
                return <FundraisersBanner width={width * 0.8}/>;
            default:
                return null;
        }
    }

    return (
        <View>
            {visible && <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('ComingSoon', { mode: banners[i] })}>
                    {renderBanner()}
                </TouchableOpacity>
                <TouchableOpacity style={styles.close} onPress={() => setVisible(false)} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: width * 0.8,
        alignSelf: 'center',
        marginVertical: height * 0.01
    },
    close: {
        width: width * 0.11,
        height: width * 0.11,
        position: 'absolute',
        top: 0,
        right: 0
    }
})