/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCommunity = /* GraphQL */ `
  query GetCommunity($id: ID!) {
    getCommunity(id: $id) {
      id
      name
      picture
      posts {
        items {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommunitys = /* GraphQL */ `
  query ListCommunitys(
    $filter: ModelCommunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        picture
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      user_name
      first_name
      last_name
      profile_picture
      email
      phone_number
      bio
      interests_experience
      interests_learn_more
      pronouns
      school
      joined_communities
      posts {
        items {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          postID
          userID
          username
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          userID
          friendID
          createdAt
          updatedAt
        }
        nextToken
      }
      outgoingFriendRequests {
        items {
          id
          senderID
          receiverID
          createdAt
          updatedAt
        }
        nextToken
      }
      incomingFriendRequests {
        items {
          id
          senderID
          receiverID
          createdAt
          updatedAt
        }
        nextToken
      }
      notifications {
        items {
          id
          type
          userID
          friendReqID
          repostID
          createdAt
          username
          content
          image
          updatedAt
        }
        nextToken
      }
      hasNewNotifications
      saved_posts
      blocked_accounts
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendship = /* GraphQL */ `
  query GetFriendship($id: ID!) {
    getFriendship(id: $id) {
      id
      userID
      friendID
      createdAt
      user {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      friend {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listFriendships = /* GraphQL */ `
  query ListFriendships(
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        friendID
        createdAt
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        friend {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendRequest = /* GraphQL */ `
  query GetFriendRequest($id: ID!) {
    getFriendRequest(id: $id) {
      id
      senderID
      receiverID
      sender {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      receiver {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFriendRequests = /* GraphQL */ `
  query ListFriendRequests(
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderID
        receiverID
        sender {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        receiver {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      type
      caption
      image
      altText
      createdAt
      userID
      communityID
      secondCommunityID
      thirdCommunityID
      community {
        id
        name
        picture
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      secondCommunity {
        id
        name
        picture
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      thirdCommunity {
        id
        name
        picture
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          userID
          username
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      links {
        items {
          id
          postID
          title
          link
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRepost = /* GraphQL */ `
  query GetRepost($id: ID!) {
    getRepost(id: $id) {
      id
      type
      postID
      userID
      communityID
      post {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      user {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listReposts = /* GraphQL */ `
  query ListReposts(
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReposts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      userID
      username
      createdAt
      content
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        userID
        username
        createdAt
        content
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLink = /* GraphQL */ `
  query GetLink($id: ID!) {
    getLink(id: $id) {
      id
      postID
      post {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      title
      link
      createdAt
      updatedAt
    }
  }
`;
export const listLinks = /* GraphQL */ `
  query ListLinks(
    $filter: ModelLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        title
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      senderID
      recipientID
      createdAt
      messages {
        items {
          id
          sender
          content
          createdAt
          conversationID
          updatedAt
        }
        nextToken
      }
      senderNewMessages
      recipientNewMessages
      updatedAt
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderID
        recipientID
        createdAt
        messages {
          nextToken
        }
        senderNewMessages
        recipientNewMessages
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sender
        content
        createdAt
        conversationID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      type
      userID
      friendReqID
      repostID
      createdAt
      username
      content
      image
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        userID
        friendReqID
        repostID
        createdAt
        username
        content
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
      id
      type
      userID
      username
      first_name
      last_name
      content
      createdAt
      postID
      commentID
      reporteeID
      updatedAt
    }
  }
`;
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        userID
        username
        first_name
        last_name
        content
        createdAt
        postID
        commentID
        reporteeID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnnouncement = /* GraphQL */ `
  query GetAnnouncement($id: ID!) {
    getAnnouncement(id: $id) {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const listAnnouncements = /* GraphQL */ `
  query ListAnnouncements(
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnouncements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        content
        createdAt
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailList = /* GraphQL */ `
  query GetEmailList($id: ID!) {
    getEmailList(id: $id) {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
export const listEmailLists = /* GraphQL */ `
  query ListEmailLists(
    $filter: ModelEmailListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        emails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $user_name: String
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      user_name: $user_name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByName = /* GraphQL */ `
  query UserByName(
    $first_name: String
    $last_name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByName(
      first_name: $first_name
      last_name: $last_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendshipByFriend = /* GraphQL */ `
  query FriendshipByFriend(
    $friendID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipByFriend(
      friendID: $friendID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        friendID
        createdAt
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        friend {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendshipByUser = /* GraphQL */ `
  query FriendshipByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        friendID
        createdAt
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        friend {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendshipByIDs = /* GraphQL */ `
  query FriendshipByIDs(
    $friendID: ID
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendshipByIDs(
      friendID: $friendID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        friendID
        createdAt
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        friend {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const friendrequestByIDs = /* GraphQL */ `
  query FriendrequestByIDs(
    $senderID: ID
    $receiverID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFriendRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendrequestByIDs(
      senderID: $senderID
      receiverID: $receiverID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderID
        receiverID
        sender {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        receiver {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUser = /* GraphQL */ `
  query PostsByUser(
    $userID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUserSorted = /* GraphQL */ `
  query PostsByUserSorted(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUserSorted(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByCommunitySorted = /* GraphQL */ `
  query PostsByCommunitySorted(
    $communityID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByCommunitySorted(
      communityID: $communityID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsBySecondCommunity = /* GraphQL */ `
  query PostsBySecondCommunity(
    $secondCommunityID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsBySecondCommunity(
      secondCommunityID: $secondCommunityID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByThirdCommunity = /* GraphQL */ `
  query PostsByThirdCommunity(
    $thirdCommunityID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByThirdCommunity(
      thirdCommunityID: $thirdCommunityID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByType = /* GraphQL */ `
  query PostsByType(
    $type: PostType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        image
        altText
        createdAt
        userID
        communityID
        secondCommunityID
        thirdCommunityID
        community {
          id
          name
          picture
          createdAt
          updatedAt
        }
        secondCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        thirdCommunity {
          id
          name
          picture
          createdAt
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        links {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const repostsByCommunity = /* GraphQL */ `
  query RepostsByCommunity(
    $communityID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repostsByCommunity(
      communityID: $communityID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const repostsByUser = /* GraphQL */ `
  query RepostsByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repostsByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const repostByUserPost = /* GraphQL */ `
  query RepostByUserPost(
    $userID: ID
    $postID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repostByUserPost(
      userID: $userID
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const repostsByPost = /* GraphQL */ `
  query RepostsByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repostsByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const repostsByType = /* GraphQL */ `
  query RepostsByType(
    $type: PostType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRepostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repostsByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        postID
        userID
        communityID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        user {
          id
          user_name
          first_name
          last_name
          profile_picture
          email
          phone_number
          bio
          interests_experience
          interests_learn_more
          pronouns
          school
          joined_communities
          hasNewNotifications
          saved_posts
          blocked_accounts
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByPost = /* GraphQL */ `
  query CommentsByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        userID
        username
        createdAt
        content
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByUser = /* GraphQL */ `
  query CommentsByUser(
    $userID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        userID
        username
        createdAt
        content
        updatedAt
      }
      nextToken
    }
  }
`;
export const linksByPost = /* GraphQL */ `
  query LinksByPost(
    $postID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    linksByPost(
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        post {
          id
          type
          caption
          image
          altText
          createdAt
          userID
          communityID
          secondCommunityID
          thirdCommunityID
          updatedAt
        }
        title
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const conversationBySender = /* GraphQL */ `
  query ConversationBySender(
    $senderID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationBySender(
      senderID: $senderID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderID
        recipientID
        createdAt
        messages {
          nextToken
        }
        senderNewMessages
        recipientNewMessages
        updatedAt
      }
      nextToken
    }
  }
`;
export const conversationByRecipient = /* GraphQL */ `
  query ConversationByRecipient(
    $recipientID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationByRecipient(
      recipientID: $recipientID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderID
        recipientID
        createdAt
        messages {
          nextToken
        }
        senderNewMessages
        recipientNewMessages
        updatedAt
      }
      nextToken
    }
  }
`;
export const conversationByUsers = /* GraphQL */ `
  query ConversationByUsers(
    $senderID: ID
    $recipientID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationByUsers(
      senderID: $senderID
      recipientID: $recipientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderID
        recipientID
        createdAt
        messages {
          nextToken
        }
        senderNewMessages
        recipientNewMessages
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesBySender = /* GraphQL */ `
  query MessagesBySender(
    $sender: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySender(
      sender: $sender
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sender
        content
        createdAt
        conversationID
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByConversation = /* GraphQL */ `
  query MessagesByConversation(
    $conversationID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByConversation(
      conversationID: $conversationID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sender
        content
        createdAt
        conversationID
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByUser = /* GraphQL */ `
  query NotificationsByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        friendReqID
        repostID
        createdAt
        username
        content
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationByFriendReqID = /* GraphQL */ `
  query NotificationByFriendReqID(
    $friendReqID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationByFriendReqID(
      friendReqID: $friendReqID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        friendReqID
        repostID
        createdAt
        username
        content
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const feedbackByUser = /* GraphQL */ `
  query FeedbackByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    feedbackByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        username
        first_name
        last_name
        content
        createdAt
        postID
        commentID
        reporteeID
        updatedAt
      }
      nextToken
    }
  }
`;
export const feedbackByType = /* GraphQL */ `
  query FeedbackByType(
    $type: FeedbackType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    feedbackByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        username
        first_name
        last_name
        content
        createdAt
        postID
        commentID
        reporteeID
        updatedAt
      }
      nextToken
    }
  }
`;
export const feedbackByPost = /* GraphQL */ `
  query FeedbackByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    feedbackByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        username
        first_name
        last_name
        content
        createdAt
        postID
        commentID
        reporteeID
        updatedAt
      }
      nextToken
    }
  }
`;
export const announcementByContent = /* GraphQL */ `
  query AnnouncementByContent(
    $content: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    announcementByContent(
      content: $content
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        content
        createdAt
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const announcementsByType = /* GraphQL */ `
  query AnnouncementsByType(
    $type: AnnouncementType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    announcementsByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        content
        createdAt
        image
        updatedAt
      }
      nextToken
    }
  }
`;
export const emailListByType = /* GraphQL */ `
  query EmailListByType(
    $type: EmailListType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmailListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    emailListByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        emails
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        user_name
        first_name
        last_name
        profile_picture
        email
        phone_number
        bio
        interests_experience
        interests_learn_more
        pronouns
        school
        joined_communities
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        friends {
          nextToken
        }
        outgoingFriendRequests {
          nextToken
        }
        incomingFriendRequests {
          nextToken
        }
        notifications {
          nextToken
        }
        hasNewNotifications
        saved_posts
        blocked_accounts
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
