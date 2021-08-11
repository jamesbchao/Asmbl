import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import { repostByUserPost } from '../graphql/queries';
import { createRepost, createNotification, deleteRepost, updateUser } from '../graphql/mutations';

export async function handleRepost(reposted, post, id, setReposted) {
    setReposted(!reposted);

    if (!reposted) {

        Analytics.record('repost', { userID: id, postID: post.id });

        let repostObj = {
            postID: post.id,
            userID: id,
            communityID: post.communityID,
            type: 'Repost'
        };

        const createdRepost = await API.graphql(graphqlOperation(createRepost, { input: repostObj }));

        let { username } = await Auth.currentUserInfo();

        let notification = {
            type: 'Repost',
            userID: post.userID,
            repostID: createdRepost.data.createRepost.id,
            username: username,
            image: post.image,
        };

        const createdNotification = await API.graphql(graphqlOperation(createNotification, { input: notification }));

        let user = {
            id: post.userID,
            hasNewNotifications: true
        };
        const updatedUser = await API.graphql(graphqlOperation(updateUser, { input: user }));
    } else {
        const repostData = await API.graphql(graphqlOperation(repostByUserPost, { userID: id, postID: { eq: post.id } }));
        let repost = repostData.data.repostByUserPost.items[0];
        let deletedRepost = await API.graphql(graphqlOperation(deleteRepost, { input: { id: repost.id } }));
    }

    //repost modal
}