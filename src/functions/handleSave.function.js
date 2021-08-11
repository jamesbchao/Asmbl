import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getCurrentUser } from './getCurrentUser.function';
import { updateUser } from '../graphql/mutations';

export async function handleSave( saved, setSaved, post ) {
    const user = await getCurrentUser();
    let savedPosts = user.saved_posts;
    let arr = [];

    if (!saved) {
        if (savedPosts && savedPosts.includes(post.id)) return;
        if (savedPosts) arr = [...savedPosts];
        arr.push(post.id);
    } else {
        arr = savedPosts.splice(savedPosts.indexOf(post.id), 1);
    }

    let userObj = {
        id: user.id,
        saved_posts: arr
    }
    let updatedUser = await API.graphql(graphqlOperation(updateUser, { input: userObj }));
    console.log('updated user with new saved posts: ', updatedUser.data.updateUser.saved_posts);

    setSaved(!saved)
}
