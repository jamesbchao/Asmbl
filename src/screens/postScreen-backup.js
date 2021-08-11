import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import CommentIcon from '../../assets/images/actionBarSvgs/commentIcon.svg';
import LinkIcon from '../../assets/images/actionBarSvgs/linkIcon.svg';
import ReshareIcon from '../../assets/images/actionBarSvgs/reshareIcon.svg';
import SaveIcon from '../../assets/images/actionBarSvgs/saveIcon.svg';
import MoreIcon from '../../assets/images/actionBarSvgs/moreIcon.svg';

import testPost1 from '../../assets/images/testPost1.png';
import testPost2 from '../../assets/images/testPost2.png';
import testPost3 from '../../assets/images/testPost3.png';

var Width = Dimensions.get('window').width;

export default function PostScreen({ navigation, image }) {

  const [post, setPost] = useState([
    {
      user: '@nadia',
      postDate: '2 hours ago',
      image: testPost1,
      comment: "recently discovered an amazing resource called the Anti-racism Digital Library. You can find it in the links page of this post - I’d highly recommend the fourth section about films to watch!",
      key: '1'
    },
    { 
      user: '@damilia',
      postDate: '3 hours ago',
      image: testPost2,
      comment: "WHO’s “16 Days” movement is happening June 1 - learn more in my links 😊",
      key: '2'
    },
    {
      user: '@ecoqueen',
      postDate: '4 hours ago',
      image: testPost3,
      comment: "items can instead be disposed in the normal trash or your local municipality 😊 Please write a comment if you know of any more composting misconceptions!",
      key: '3'
    },
  ])
  return (
    <View style={styles.container}>
      <FlatList
        data={post}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.topTab}>
              <Text style={styles.postUser}>{item.user}</Text>
              <Text style={styles.postDate}>{item.postDate}</Text>
            </View>

            <Image source={item.image} style={styles.image} />

            <View style={styles.actionBar}>
              <TouchableOpacity style={styles.commentsButton}>
                <CommentIcon style={styles.commentIcon}/>
                <Text style={styles.commentsButtonText}>Comments</Text>
              </TouchableOpacity>

              <View style={styles.otherButtonsContainer}>
                <TouchableOpacity> 
                  <LinkIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ReshareIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SaveIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MoreIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.postCaptionContainer}>
              <Text style={styles.postCaptionText}>
                <Text style={{fontWeight: "bold"}}>{item.user + ' '}</Text>
                <Text>{item.comment}</Text>
              </Text>
            </View>
          </View>
        )}
      />
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 40,
  },
  postContainer: {
    width: Width,
    flex: 1,
    marginTop: 24,
  },
  topTab: {
    flexDirection: 'row',
    width: Width,
    height: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  postUser: {
    flexDirection: 'row',
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: 14,
    left: 12,
    top: 6,
  },
  postDate: {
    flexDirection: 'row',
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 14,
    right: 12,
    top: 6,
  },
  image: {
    width: Width,
    height: Width,
  },
  actionBar: {
    flexDirection: 'row',
    width: Width,
    height: 42,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  commentsButton: {
    flexDirection: 'row',
    width: (106/375)*Width,
    height: 26,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    top: 8,
    left: 12,
    justifyContent: 'space-between',
  },
  commentIcon: {
    alignSelf: 'flex-start',
    left: (7.67/375)*Width,
    top: 2.67,
  },
  commentsButtonText: {
    fontFamily: 'Avenir',
    fontWeight: '400',
    fontSize: 14,
    top: 3,
    right: (6/375) * Width,
  },
  otherButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 5,
    right: (8.8/375) *Width,
    height: 32,
    width: (135.2/375)*Width,
  },
  postCaptionContainer: {
    width: (351/375)*Width,
    marginVertical: 2,
    marginHorizontal: 12,
  },
  postCaptionText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
  },
});