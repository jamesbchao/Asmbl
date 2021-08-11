import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

/* Icons */
import SearchIcon from '../../assets/images/searchIcon';

const { width, height } = Dimensions.get('window');

export default function SearchBar({ searchInput, setSearchInput, callback, placeholder }) {
    return (
        <View style={styles.container}>
            <SearchIcon />
            <TextInput 
                style={styles.input}
                onChangeText={val => {
                    setSearchInput(val);
                    if (callback) callback(val);
                }}
                value={searchInput}
                placeholder={placeholder}
                placeholderTextColor='#4B4B4B'
                autoCorrect={false}
                //onChange={() => { if(callback) callback();
                //}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: width * 0.9,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.02,
        marginVertical: height * 0.01,
    },
    input: {
        marginLeft: width * 0.02,
        fontFamily: 'Avenir',
        fontSize: 18,
        width: width * 0.75
    }
})