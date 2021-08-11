import { Auth, API, graphqlOperation } from 'aws-amplify';
import { userByUsername } from '../graphql/queries';

export async function getCurrentUser() {
    try {
        const { username } = await Auth.currentUserInfo();
        const userData = await API.graphql(graphqlOperation(userByUsername, { user_name: username }));
        let userObj = userData.data.userByUsername.items[0];
        return userObj;
    } catch (err) {
        console.log(err);
    }

}