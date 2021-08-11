import React from 'react';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';

export default function OtherScreen({ navigation }) {
    return <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Pagination')}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>Go to pagination</Text>
        </TouchableOpacity>
    </SafeAreaView>

}