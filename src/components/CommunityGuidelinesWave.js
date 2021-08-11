// THIS IS NEW AS OF APRIL 5
import React from 'react';
import { View, Dimensions, StyleSheet} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// var { WIDTH, HEIGHT } = Dimensions.get('window');
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const CommunityGuidelinesWave = () => {
    return (
        <View style={styles.communityWave}>
            <Svg width={WIDTH} height="295" viewBox="0 0 375 283" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M-11 -338H387V244.5C303.155 357.977 145.547 174.515 -11 249.5V-338Z" fill="#1B0A60"/>
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    communityWave: {
      zIndex: 0,
      position: 'absolute',
      paddingLeft: 0,
    },
  });

export default CommunityGuidelinesWave;