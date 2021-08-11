import { Auth, API, graphqlOperation } from 'aws-amplify';

/* Queries */
import { userByUsername, friendrequestByIDs, notificationByFriendReqID } from '../graphql/queries';
import { createFriendship, deleteFriendRequest, createNotification, deleteNotification, updateUser } from '../graphql/mutations';

export async function handleReqAccept(accepted, userID, callback, callbackParam) {

    try {
        const { username } = await Auth.currentUserInfo();
        const currentUserData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
        const currentUserObj = currentUserData.data.userByUsername.items[0];
        const currentUserID = currentUserObj.id;
    
        if (accepted) {
            const friendship = {
                userID: userID,
                friendID: currentUserID,
            }
        
            const createdFriend = await API.graphql(graphqlOperation(createFriendship, { input: friendship }));
            console.log('successfully created friendship: ', createdFriend);
        }
    
        const friendReqData = await API.graphql(graphqlOperation(friendrequestByIDs, { senderID: userID, receiverID: { eq: currentUserID }}));
        const friendReqObj = friendReqData.data.friendrequestByIDs.items[0];
        const friendReqID = friendReqObj.id;
    
        const deletedNotificationData = await API.graphql(graphqlOperation(notificationByFriendReqID, { friendReqID: friendReqID, sortDirection: 'DESC' }));
        const deletedNotificationObj = deletedNotificationData.data.notificationByFriendReqID.items[0];
        const deletedNotificationID = deletedNotificationObj.id;
    
        const deletedNotification = await API.graphql(graphqlOperation(deleteNotification, { input: { id: deletedNotificationID }}));
        console.log('successfully deleted notification: ', deletedNotification);
    
        const deletedReq = await API.graphql(graphqlOperation(deleteFriendRequest, { input: { id: friendReqID }}));
        console.log('successfully deleted friend req: ', deletedReq);
    
        let notification = {
            type: 'AcceptedFriendRequest',
            userID: userID,
            username: currentUserObj.user_name
        }
        const createdNotification = await API.graphql(graphqlOperation(createNotification, { input: notification }));
        console.log('created notification: ', createdNotification);

        let userObj = {
            id: userID,
            hasNewNotifications: true
        }

        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
        console.log('updated user: ', updatedUser);
    
    
        callbackParam ? callback(callbackParam) : callback();
    } catch (err) {
        console.log('Error Accepting Friend Request: ', err);
    }

}