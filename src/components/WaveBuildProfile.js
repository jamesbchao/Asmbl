import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const originalWidth = 375;
const originalHeight = 253;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get("window").width;

const WaveBuildProfile = () => {
    return (
        <View style={{ width: windowWidth, aspectRatio }}>
            <Svg width='100%' height='100%' viewBox={`0 0 ${originalWidth} ${originalHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M-11 -368H387V214.5C303.155 327.977 145.547 144.515 -11 219.5V-368Z" fill="#1B0A60"/>
            </Svg>

        </View>
    )
};

export default WaveBuildProfile;