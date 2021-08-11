import React from 'react';
import { View, Dimensions, StyleSheet} from 'react-native';
import Svg, { Path } from 'react-native-svg';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
//var { WIDTH, HEIGHT } = Dimensions.get('window');

const LandingPageBottomWave = () => {
    return (
        <View style={styles.container}>
            <Svg width={WIDTH} height={HEIGHT*0.85} viewBox="0 0 375 695" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <Path d="M-44 694.924H441.5V0C204.5 285 59.0001 -35 -44 295.5V694.924Z" fill="#C6A4FF"/>
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      zIndex: -1,
      top: 40,
      position: 'absolute',
    },
  });

  export default LandingPageBottomWave;