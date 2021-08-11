import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const PostStyle = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: width * 0.95,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      boldText: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 19,
      },
      text: {
        fontFamily: 'Avenir',
        fontSize: 14,
        lineHeight: 19
      },
      image: {
        marginTop: height * 0.01,
        width: width,
        height: width
      },
      captionContainer: {
        marginTop: height * 0.01,
        width: width * 0.95,
        alignSelf: 'center',
      },
      readMore: {
        marginTop: height * 0.01,
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 19,
        color: '#4B4B4B'
      },
      post: {
          marginBottom: height * 0.05,
      },
      repostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.95,
        alignSelf: 'center'
      },
      boldTextMargin: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 19,
        marginLeft: width * 0.01,
      },
});

export default PostStyle;
