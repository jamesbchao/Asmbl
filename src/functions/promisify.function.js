import { API, graphqlOperation, Storage } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import { renderDate } from './renderDate.function';

export async function promisify(arr, type) {
    arr = await Promise.all(arr.map(async(elem) => {

        let uri, username, date;

        if (type === 'repost') {
            const userData = await API.graphql(graphqlOperation(getUser, { id: elem.post.userID }));
            username = userData.data.getUser.user_name;
            date = renderDate(elem.post.createdAt);
            elem.reposter = elem.user.user_name;
            elem.caption = elem.post.caption;
            elem.imageKey = elem.post.image;
        } else {
            username = elem.user.user_name;
            date = renderDate(elem.createdAt);
            elem.type = 'post';
            elem.imageKey = elem.image;
        }
        elem.username = username;
        elem.date = date;
        return elem;

    }))

    return arr;
}