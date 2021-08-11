import React from "react";
import { View, ScrollView, Text } from "react-native";

/* Styles */
import Profile from '../styles/Profile.component.style';

export default function InterestsTab({user}) {

  return <ScrollView contentContainerstyle={Profile.mainInterestsContainer} style={Profile.interestsScrollView}>
    <Text style={Profile.interestHeader}>I am personally connected to or involved in: </Text>
    <View style={Profile.interestsContainer}>
      {user.interests_experience.map((interest, index, arr) => (
        <View style={Profile.interestContainer} key={interest}>
          <View style={arr.length % 2 !== 0 && index === arr.length - 1 ? Profile.interestLast : Profile.interest}>
            <Text style={Profile.interestText}>{interest}</Text>
          </View>
        </View>
      ))}
    </View>
    <Text style={Profile.interestHeader}>I am curious to learn more about: </Text>
    <View style={Profile.interestsContainer}>
      {user.interests_learn_more.map((interest, index, arr) => (
        <View style={Profile.interestContainer} key={interest}>
          <View style={arr.length % 2 !== 0 && index === arr.length - 1 ? Profile.interestLast : Profile.interest}>
            <Text style={Profile.interestText}>{interest}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>;
}
