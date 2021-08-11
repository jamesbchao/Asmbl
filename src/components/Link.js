import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

/* Styles */
import Button from '../styles/Button.component.style';

/* Icons */
import XButton from '../../assets/images/addLinks/xButton';
import EditButton from '../../assets/images/addLinks/editButton';

var { width, height } = Dimensions.get('window');

export default function Link({ link, index, deleteLink, editLink, showButtons }) {
    return (
        <View key={link.link} style={styles.linkContainer}>
            <View style={showButtons ? styles.linkBody : styles.linkBodyShort}>
                <Text style={styles.linkTitle}>{link.title}</Text>
                <Text style={styles.link}>{link.link.length >= 50 ? link.link.slice(0, 50) + '...': link.link}</Text>
                {showButtons && <View style={styles.linkButtonContainer}>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => deleteLink(index)}>
                        <XButton/>
                        <Text style={styles.deleteLink}>Delete link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Button.textWithIconContainer} onPress={() => editLink(index)}>
                        <EditButton/>
                        <Text style={styles.editLink}>Edit link</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    linkContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3},
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        width: width * 0.95,
        marginTop: 20
    },
    linkBody: {
        width: width * 0.85,
        alignSelf: 'center',
        height: height * 0.1,
        marginVertical: height * 0.02,
        justifyContent: 'space-between'
    },
    linkBodyShort: {
        width: width * 0.85,
        alignSelf: 'center',
        height: height * 0.05,
        marginTop: height * 0.02,
        marginBottom: height * 0.03,
        justifyContent: 'space-between'
    },
    linkTitle: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 15,
        lineHeight: 19,
    },
    link: {
        fontFamily: 'Avenir',
        fontSize: 15,
        lineHeight: 19,
        textDecorationLine: 'underline',
    },
    linkButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteLink: {
        fontFamily: 'Avenir',
        fontSize: 15,
        lineHeight: 19,
        color: '#C42727',
        marginLeft: 5
    },
    editLink: {
        fontFamily: 'Avenir',
        fontSize: 15,
        lineHeight: 19,
        color: '#1B0A60',
        marginLeft: 5
    }
})