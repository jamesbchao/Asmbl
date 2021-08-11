import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { 
    friendshipByFriend, 
    friendshipByUser,
    postsByUser,
    linksByPost,
    repostsByUser,
    repostsByPost,
    commentsByPost,
    commentsByUser,
    conversationBySender,
    conversationByRecipient,
    messagesByConversation,
    notificationsByUser,
} from '../graphql/queries';

import {
    deleteUser,
    deletePost,
    deleteFriendship,
    deleteLink,
    deleteComment,
    deleteRepost,
    deleteConversation,
    deleteMessage,
    deleteNotification,
} from '../graphql/mutations';


/* Styles */
import GlobalStyles from '../styles/GlobalStyles.component.style';

const ID = '68245511-7ade-4cd1-b16d-3c6f9a621a3d';

export default function DeleteUserScreen({ }) {

    const handleDeleteUser = async() => {

        //get current user followed by extraction of user.id into ID variable for generalized function


        /* Delete Friendships */
        try {
            const f1 = await API.graphql(graphqlOperation(friendshipByFriend, { friendID: ID }));
            const f2 = await API.graphql(graphqlOperation(friendshipByUser, { userID: ID }));
            if (f1.data.friendshipByFriend.items[0]) await API.graphql(graphqlOperation(deleteFriendship, { input: { id: f1.data.friendshipByFriend.items[0]?.id }}));
            if (f2.data.friendshipByUser.items[0]) await API.graphql(graphqlOperation(deleteFriendship, { input: { id: f2.data.friendshipByUser.items[0]?.id }}));
        } catch (err) {
            console.log('err deleting friendships', err);
            
        }

        /* Delete Posts & Reposts */
        try {
            const pd = await API.graphql(graphqlOperation(postsByUser, { userID: ID }));
            let po = pd.data.postsByUser.items;

            po.forEach(async(p) => {

                const rd = await API.graphql(graphqlOperation(repostsByPost, { postID: p.id }));
                let ro = rd.data.repostsByPost.items;
                ro.forEach(async(r) => {
                    await API.graphql(graphqlOperation(deleteRepost, { input: { id: r.id }}));
                })

                const ld = await API.graphql(graphqlOperation(linksByPost, { postID: p.id }));
                let lo = ld.data.linksByPost.items;
                lo.forEach(async(l) => {
                    await API.graphql(graphqlOperation(deleteLink, { input: { id: l.id }}));
                })

                const cd = await API.graphql(graphqlOperation(commentsByPost, { postID: p.id }));
                let co = cd.data.commentsByPost.items;
                co.forEach(async(c) => {
                    await API.graphql(graphqlOperation(deleteComment, { input: { id: c.id }}));
                })

                await API.graphql(graphqlOperation(deletePost, { input: { id: p.id }}));

            })

            const rd2 = await API.graphql(graphqlOperation(repostsByUser, { userID: ID }));
            let ro2 = rd2.data.repostsByUser.items;
            ro2.forEach(async(r) => {
                await API.graphql(graphqlOperation(deleteRepost, { input: { id: r.id }}));
            })

            const cd2 = await API.graphql(graphqlOperation(commentsByUser, { userID: ID }));
            let co2 = cd2.data.commentsByUser.items;
            co2.forEach(async(c) => {
                await API.graphql(graphqlOperation(deleteComment, { input: { id: c.id }}));
            })

            

        } catch (err) {
            console.log('err deleting posts & reposts', err);
        }

        /* Delete Convos & Notifications */

        try {
            const c1 = await API.graphql(graphqlOperation(conversationBySender, { senderID: ID }));
            const c2 = await API.graphql(graphqlOperation(conversationByRecipient, { recipientID: ID }));
            let co1 = c1.data.conversationBySender.items;
            let co2 = c2.data.conversationByRecipient.items;
            
            co1.forEach(async(c) => {
                const md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: c.id }));
                let mo = md.data.messagesByConversation.items;
                mo.forEach(async(m) => {
                    await API.graphql(graphqlOperation(deleteMessage, { input: { id: m.id }}));
                })
                await API.graphql(graphqlOperation(deleteConversation, { input: { id: c.id }}));
            })

            co2.forEach(async(c) => {
                const md = await API.graphql(graphqlOperation(messagesByConversation, { conversationID: c.id }));
                let mo = md.data.messagesByConversation.items;
                mo.forEach(async(m) => {
                    await API.graphql(graphqlOperation(deleteMessage, { input: { id: m.id }}));
                })
                await API.graphql(graphqlOperation(deleteConversation, { input: { id: c.id }}));

            })

            const nd = await API.graphql(graphqlOperation(notificationsByUser, { userID: ID }));
            let no = nd.data.notificationsByUser.items;

            no.forEach(async(n) => {
                await API.graphql(graphqlOperation(deleteNotification, { input: { id: n.id }}));
            })  

        } catch (err) {
            console.log('err deleting convos or notifications', err);
        }

        /* Delete User */
        try {
            await API.graphql(graphqlOperation(deleteUser, { input: { id: ID }}));
        } catch (err) {
            console.log('err deleting user', err);
        }

        console.log('success');

    }


    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <TouchableOpacity onPress={() => handleDeleteUser()}>
                <Text>Delete User</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}