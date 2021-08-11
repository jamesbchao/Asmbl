import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, ScrollView } from 'react-native'

/* Components */
import HeaderBar from '../components/HeaderBar';
import Link from '../components/Link';
import AddLinkModal from '../components/AddLinkModal';

/* Styles */
import Button from '../styles/Button.component.style';
import GlobalStyles from '../styles/GlobalStyles.component.style';

/* Icons */
import AddLinkIcon from '../../assets/images/addLinkIcon';


var { width, height } = Dimensions.get('window');

export default function AddLinksScreen({ navigation, route }) {
    let { image } = route.params;

    const [links, setLinks] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const addLink = () => {
        if (title === '' || link === '') return;
        setModalVisible(false);
        const linkObj = {
            title: title,
            link: link
        };
        setLinks([...links, linkObj]);
        console.log(links);
    }

    const deleteLink = (index) => {
        console.log('pre-removal: ', links);
        let linkArr = links;
        linkArr.splice(index, 1);
        setLinks([...linkArr]);
        console.log('post-removal: ', links);
    }

    const editLink = (index) => {
        setEditMode(true);
        let selectedLink = links[index];
        setTitle(selectedLink.title);
        setLink(selectedLink.link);
        setModalVisible(true);
    }

    return <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <HeaderBar 
            title='Add Links'
            nextScreen='AddCaption'
            params={{ image: image, links: links }}
            formComplete={true}
        />
        {links.length === 0 ? <View style={styles.iconContainer}>
            <AddLinkIcon/>
        </View> : <ScrollView contentContainerStyle={styles.linksContainer}>
        {links.map((link, index) => <Link key={link.link} link={link} index={index} deleteLink={deleteLink} editLink={editLink} showButtons={true}/>)}
        </ScrollView>
        }
        {modalVisible && <AddLinkModal modalVisible={modalVisible} setModalVisible={setModalVisible} editMode={editMode} setTitle={setTitle} title={title} setLink={setLink} link={link} setEditMode={setEditMode} addLink={addLink} />}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={Button.defaultButton} onPress={() => setModalVisible(true)}>
                <Text style={Button.defaultText}>Add New Link</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Add links to your post - these can be event links, sources, links to additional resources, or other applicable links you see fit.</Text>
        </View>
    </SafeAreaView>
}

export const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white'
    },
    iconContainer: {
        alignSelf: 'center',
        marginTop: height * 0.15,
        marginBottom: height * 0.03
    },
    text: {
        textAlign: 'center',
        width: width * 0.9,
        alignSelf: 'center',
        marginTop: height * 0.01,
        fontFamily: 'Avenir',
        fontSize: 12,
        lineHeight: 16,
        color: '#4B4B4B'
    },
    input: {
        borderColor: '#E3E3E3',
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    linksContainer: {
        height: height * 0.7,
        alignItems: 'center'
    },
})


