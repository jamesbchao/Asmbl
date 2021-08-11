import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const originalWidth = 375;
const originalHeight = 186;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get("window").width;

const WaveLarge = () => {
    return (
        <View style={{ width: windowWidth, aspectRatio }}>
            <Svg width='100%' height='100%' viewBox={`0 0 ${originalWidth} ${originalHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M-12 -435H386V147.5C302.155 260.977 144.547 77.5149 -12 152.5V-435Z" fill="#1B0A60"/>
            </Svg>
        </View>
    )
};

export default WaveLarge;