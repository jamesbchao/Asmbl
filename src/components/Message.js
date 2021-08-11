import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

/* Functions */
import { renderMessageDate } from '../functions/renderMessageDate.function';

const { width, height } = Dimensions.get('window');

export default function Message({ message, previousDates, setPreviousDates, recipientID }) {

    const [renderDate, setRenderDate] = useState(true);
    const [date, setDate] = useState('');

    useEffect(() => {
        checkRenderDate();
    }, [])

    const checkRenderDate = () => {
        let returnedDate = renderMessageDate(message.createdAt);

        if (previousDates.includes(returnedDate)) {
            setRenderDate(false);
            return;
        }
        let arr = previousDates;
        arr.push(returnedDate);
        setPreviousDates([...arr]);
        setDate(returnedDate);
    }

    return (
        <View style={styles.container}>
            {renderDate && <Text style={styles.date}>{date}</Text>}
            <View style={recipientID === message.sender ? styles.recipientContainer : styles.senderContainer}>
                <Text style={recipientID === message.sender ? styles.recipientText : styles.senderText}>{message.content}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: height * 0.01,
        width: width * 0.95,
        alignSelf: 'center'
    },  
    date: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#4B4B4B',
        marginBottom: height * 0.01,
    },
    senderContainer: {
        borderRadius: 12,
        backgroundColor: '#1B0A60',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'flex-end',
        maxWidth: width * 0.7
    },
    recipientContainer: {
        borderRadius: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        maxWidth: width * 0.7
    },
    senderText: {
        fontFamily: 'Avenir',
        color: 'white'
    },
    recipientText: {
        fontFamily: 'Avenir',
    },
})