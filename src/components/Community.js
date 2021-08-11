import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from 'react-native';
import { Storage } from 'aws-amplify';

/* Icons */
import XButton from '../../assets/images/addLinks/xButton';

var { width, height } = Dimensions.get('window');

export default function Community({ community, index, deleteCommunity }) {

    return (
        <View style={styles.community}>
             <View style={styles.label}>
                    <Image style={styles.image} source={{uri: community.picture}} />
                    <Text style={styles.text}>{community.name}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteCommunity(index)}>
                <XButton />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    community: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: width * 0.92,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.01,
        marginBottom: height * 0.02,
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