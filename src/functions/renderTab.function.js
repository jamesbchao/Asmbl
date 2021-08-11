import React from 'react';
import InterestsTab from '../components/InterestsTab';
import PostsTab from '../components/PostsTab';
import RepostsTab from '../components/RepostsTab';
import SavedTab from '../components/SavedTab';
import ConnectionsNotificationsTab from '../components/ConnectionsNotificationsTab';
import MyPostsNotificationsTab from '../components/MyPostsNotificationsTab';

export default function renderTab(user, selectedTab, id) {
    switch (selectedTab) {
        case 'Interests':
            return <InterestsTab user={user}/>
            break;
        case 'Posts':
            return <PostsTab user={user}/>
            break;
        case 'Reposts':
            return <RepostsTab user={user} />
            break;
        case 'Saved':
            return <SavedTab user={user} />
            break;
        case 'Connections':
            return <ConnectionsNotificationsTab id={id} />
            break;
        case 'My Posts':
            return <MyPostsNotificationsTab id={id} />
            break;
        default:
            return null;
    }
}