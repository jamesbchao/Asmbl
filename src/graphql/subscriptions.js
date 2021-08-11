/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCommunity = /* GraphQL */ `
  subscription OnCreateCommunity {
    onCreateCommunity {
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
export const onUpdateCommunity = /* GraphQL */ `
  subscription OnUpdateCommunity {
    onUpdateCommunity {
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
export const onDeleteCommunity = /* GraphQL */ `
  subscription OnDeleteCommunity {
    onDeleteCommunity {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship {
    onCreateFriendship {
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
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship {
    onUpdateFriendship {
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
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship {
    onDeleteFriendship {
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
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest {
    onCreateFriendRequest {
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
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest {
    onUpdateFriendRequest {
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
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest {
    onDeleteFriendRequest {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateRepost = /* GraphQL */ `
  subscription OnCreateRepost {
    onCreateRepost {
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
export const onUpdateRepost = /* GraphQL */ `
  subscription OnUpdateRepost {
    onUpdateRepost {
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
export const onDeleteRepost = /* GraphQL */ `
  subscription OnDeleteRepost {
    onDeleteRepost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateLink = /* GraphQL */ `
  subscription OnCreateLink {
    onCreateLink {
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
export const onUpdateLink = /* GraphQL */ `
  subscription OnUpdateLink {
    onUpdateLink {
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
export const onDeleteLink = /* GraphQL */ `
  subscription OnDeleteLink {
    onDeleteLink {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation {
    onCreateConversation {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation {
    onUpdateConversation {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation {
    onDeleteConversation {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback {
    onCreateFeedback {
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
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback {
    onUpdateFeedback {
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
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback {
    onDeleteFeedback {
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
export const onCreateAnnouncement = /* GraphQL */ `
  subscription OnCreateAnnouncement {
    onCreateAnnouncement {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const onUpdateAnnouncement = /* GraphQL */ `
  subscription OnUpdateAnnouncement {
    onUpdateAnnouncement {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const onDeleteAnnouncement = /* GraphQL */ `
  subscription OnDeleteAnnouncement {
    onDeleteAnnouncement {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const onCreateEmailList = /* GraphQL */ `
  subscription OnCreateEmailList {
    onCreateEmailList {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEmailList = /* GraphQL */ `
  subscription OnUpdateEmailList {
    onUpdateEmailList {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEmailList = /* GraphQL */ `
  subscription OnDeleteEmailList {
    onDeleteEmailList {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
