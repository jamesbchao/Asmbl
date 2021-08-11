// THIS IS NEW AS OF APRIL 5
import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View, StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import OnboardingText from '../styles/OnboardingText.component.style';
import LoginButtons from '../styles/LoginButtons.component.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import GlobalStyles from '../styles/GlobalStyles.component.style';


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const rules = [
  'Hateful conduct policy',
  'Violent threats & violence glorification policy',
  'Hate groups, terrorism & violent extremism policy',
  'Sensitive media policy',
  'Discussion of suicide and self-harm policy'
]

export default function communityGuidelines({ navigation }) {

    const [checked, setChecked] = useState(false);

    const handleSubmit = () => {
      if (checked) navigation.navigate('BuildProfile1');
    }

    const handleLink = async(mode) => {
      switch (mode) {
        case 'tos':
          try {
            await WebBrowser.openBrowserAsync('https://www.websitepolicies.com/policies/view/YvqDm5FP');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'guidelines':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1S-8pKk7qjaYYYSGOyYVEqmWT8wW_tkniu2dNdtaYj8U/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'Hateful conduct policy':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1uQrJH1meON9JK1QR2vMsqwRy9mtd3YGB1SxPhwam8ZQ/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'Violent threats & violence glorification policy':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1EIvYQvQjdjEmAmStv9QRsZ-hF99lukSyEEY9rY_lx50/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'Hate groups, terrorism & violent extremism policy':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1jzKf0s26yENVwKzc0107bNmpcVpHVhWL-mAUxmJzAaI/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'Sensitive media policy':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1lk4MhSJ7nC2kXFQ84d459H34a36JxR_8S9CdfuwtiP0/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'Discussion of suicide and self-harm policy':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1nh45IFagz7MWZIyuG0kc_UfM-QyL6CXUmqJpD4skc3I/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'violence':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1EIvYQvQjdjEmAmStv9QRsZ-hF99lukSyEEY9rY_lx50/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
        case 'hate speech':
          try {
            await WebBrowser.openBrowserAsync('https://docs.google.com/document/d/1uQrJH1meON9JK1QR2vMsqwRy9mtd3YGB1SxPhwam8ZQ/edit?usp=sharing');
          } catch (err) {
            console.log(err);
          }
          break;
      }
    }

    const renderItem = ({ item, index }) => {
      const numbers = [
        '  I.', ' II.', 'III.', 'IV.', ' V.'
      ]

      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Avenir', fontSize: 14, marginRight: 20}}>{numbers[index]}</Text>
          <Text style={styles.link} onPress={() => handleLink(item)}>{item}</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View>
              <Text style={OnboardingText.header}>You're In!</Text>
              <Text style={OnboardingText.subtitle}>
                  Your account has been verified. The last step before you can make 
                  your profile is to read and agree to <Text style={styles.link} onPress={() => handleLink('guidelines')}><B>Asmbl's Community Guidelines</B></Text> below.</Text>
          </View>
          <SafeAreaView>
            <ScrollView style={styles.guidelinesContainer} contentContainerStyle={{paddingBottom: HEIGHT * 0.1}}>
              <Text style={styles.title}>⭐ Introduction</Text>
              <Text style={styles.body}>Welcome to Asmbl, the social media for activists and organizers! We are so excited to welcome you to the Asmbl community as our first users – you are our pioneers.</Text>
              <Text style={styles.body}>
                <Text>These Community Guidelines are here to help you understand what it means to be a member of Asmbl. Don't forget that your use of Asmbl is subject to these Community Guidelines and our </Text>
                <Text style={styles.link} onPress={() => handleLink('tos')}>Terms of Service.</Text>
              </Text>
              <Text style={styles.title}>⭐ What kind of content violates our community guidelines?</Text>
              <Text style={styles.body}>At Asmbl, we recognize that experiencing abuse hinders one's ability to freely express themselves and exercise these rights. <B>You do not have the right to organize around a cause or use speech that attacks individuals or groups for immutable aspects of their identity.</B></Text>
              <Text style={styles.body}><B>We want these rules and guidelines to serve as a working document for the Asmbl community to add onto, alter, and advance as we build this community together.</B></Text>
              <Text style={styles.body}><B>As a beta tester, you are given commenting access to this document, along with all our conduct policies (rules for what we allow and don’t allow on Asmbl). We strongly encourage everyone to comment on, make suggestions for changes or additions, and respond to each other’s comments on all articles, including this one.</B> – everything in these guidelines is subject to change with community input</Text>
              <Text style={styles.body}>We are giving you the power to decide what your Asmbl community looks like – but with great power comes great responsibility. We hope you will take this opportunity to heart and commit to creating a safe, empathetic, and respectful community for all.</Text>
              <Text style={styles.title}>⭐ Asmbl's Rules of Conduct</Text>
              <FlatList 
                data={rules}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{marginBottom: 16, marginTop: 8,}}
              />
              <Text style={styles.title}>⭐ How can I report content violations?</Text>
              <Text style={styles.body}>Users will be able to report a post in-app if they feel it violates these guidelines in any way. Users may also report other accounts entirely if they experience abuse from that user (i.e. content violations in private messaging)</Text>
              <Text style={styles.title}>⭐ Community Moderation: How will reported posts be dealt with?</Text>
              <Text style={styles.body}><B>Asmbl will be launching the initial framework for our Community Moderation Program within our beta community as follows:</B></Text>
              <View style={styles.indent}>
                <Text style={styles.body2}>󠁿❌ When a post or comment is reported, the content will remain up, but with a visual blocker to indicate that it was reported for a violation to our rules of conduct and therefore contains potentially triggering content.)</Text>
                <Text style={styles.body2}>󠁿💬 Everyday, the Asmbl team will share the posts that were reported that day to the #community-moderation slack channel along with the reporter-provided reason for how it violates our rules of conduct.</Text>
                <Text style={styles.body2}>🗳️ Every beta tester will have the option either to ‘upvote’ the original report and support the violation claim, or to ‘downvote’ the original report and argue against the violation claim by reacting to the slack message with coded emojis</Text>
                <View style={styles.indent}>
                  <Text style={styles.body2}>#️⃣ On slack, users will be able to view the number of upvotes and downvotes reported content receives.</Text>
                  <Text style={styles.body2}>🏷️ On Slack, votes are not anonymous – Users will be able to view  who upvoted and downvoted the content.</Text>
                </View>
                <Text style={styles.body2}>👥 Community moderators – who will be chosen based on expressed interest and volunteering – hold the final say on how to respond to reported posts. </Text>
                <View style={styles.indent}>
                  <Text style={styles.body2}>👀 Some possible responses could include, but are not limited to: taking the post down entirely, ‘hiding’ the post with a report warning, leaving the post up with the banner and report numbers attached, giving the user who posted the content a warning, giving the user who posted the content a public warning and a mark on their profile</Text>
                  <Text style={styles.body2}>❌ <B>ZERO TOLERANCE DISCLAIMER:</B> The only times the Asmbl team will respond to content violations without the process of community moderation are violations against which we have a Zero Tolerance policy: violent threats and clear cases of hate speech</Text>
                </View>
                <Text style={styles.body2}>🌎 Adding new communities to the communities page will also follow the process of a community vote</Text>
              </View>
              <Text style={styles.body}>During beta testing, community moderators will be identified based on expressed interest: If you are particularly motivated to become a community moderator, volunteer!!</Text>
              <Text style={styles.title}>⭐ What action does Asmbl take for content against which we have a zero-tolerance policy?</Text>
              <Text style={styles.body}>
                <Text>Asmbl maintains Zero-Tolerance Policies against any content that </Text>
                <Text style={styles.link} onPress={() => handleLink('violence')}>incites violence </Text>
                <Text>against any other user for any reason or contains </Text>
                <Text style={styles.link} onPress={() => handleLink('hate speech')}>blatant hate speech</Text>
                <Text>.</Text>
              </Text>
              <Text style={styles.body}>Content that is reported for containing violence or blatant hate speech will be dealt with immediately without the process of community moderation. Users deemed to be sharing violent threats or blatantly hateful content will face the following consequences: </Text>
              <View style={styles.indent}>
                <Text style={styles.body2}>❌ <B>Upon first offense, the user will have their violating content removed, receive a notification as to why, and one week suspension from posting on the platform.</B> If the user disagrees with the violation report against their content, they will be given the opportunity to contest the violation. If a user petitions against their report, the content will become subject to community moderation as described above.</Text>
                <Text style={styles.body2}>❌ <B>Upon a second offense, the user will face immediate and permanent suspension of posting/commenting abilities. Their account will be placed on ‘observation only’ use indefinitely, length of suspension subject to community moderators decision.</B>  We hope to encourage growth and empathy – while the user has lost their privilege to share information on Asmbl, allowing them to observe what others share can be an opportunity for them to expand their perspective.</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={25}
                  fillColor="#1B0A60"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "#1B0A60" }}
                  textStyle={{ fontFamily: "Avenir" }}
                  onPress={() => setChecked(!checked)}
                />
                <Text style={styles.checkboxText}>I have read and agree to Asmbl's Community Guidelines and Terms of Service.</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.bottomStuffContainer}>
            <View style={styles.continueButton}>
                  <View style={LoginButtons.lowerButtonContainer}>
                  <TouchableOpacity style={checked ? LoginButtons.lowerButton : LoginButtons.lowerButtonDisabled} onPress={() => handleSubmit()}>
                      <Text style={checked ? LoginButtons.lowerButtonText : LoginButtons.lowerButtonTextDisabled}>Continue</Text>
                  </TouchableOpacity>
                  </View>
            </View>
          </View>
          
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
      height: HEIGHT,
      backgroundColor: 'white'
    },
    guidelinesContainer: {
      marginLeft: 24,
      marginTop: 20,
      width: WIDTH * 0.9,
      maxHeight: HEIGHT * 0.65,
    },
    title: {
      fontFamily: 'Avenir',
      fontSize: 20,
      lineHeight: 24
    },
    body: {
      fontFamily: 'Avenir',
      fontSize: 16,
      marginTop: 8,
      marginBottom: 16
    },
    body2: {
      fontFamily: 'Avenir',
      fontSize: 16,
      marginTop: 8,
    },
    emptySpace: {
      height: HEIGHT * 0.05,
    },
    link: {
      fontFamily: 'Avenir',
      fontSize: 16,
      textDecorationLine: 'underline',
      color: 'blue'
    },
    indent: {
      marginLeft: WIDTH * 0.05
    },
    checkboxContainer: {
      alignSelf: 'center',
      marginTop: 16,
      flexDirection: 'row'
    },
    checkboxText: {
      flexWrap: 'wrap',
      width: WIDTH * 0.78
    },
    continueButton: {
      alignSelf: 'center',
      marginTop: 15,
    },
    bottomStuffContainer: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: HEIGHT * 0.05
    }
});

