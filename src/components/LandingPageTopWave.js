import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const LandingPageTopWave = () => {
    return (
        <View style={styles.container}>
            <Svg width={WIDTH} height={HEIGHT*0.63} viewBox="0 0 375 308" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M-2 620.61H396V38.1101C312.155 -75.3673 154.547 108.095 -2 33.1101V620.61Z" fill="#1B0A60"/>
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      zIndex: 1,
      position: 'absolute',
      top: 460,
    },
  });


export default LandingPageTopWave;