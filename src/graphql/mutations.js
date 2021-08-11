/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCommunity = /* GraphQL */ `
  mutation CreateCommunity(
    $input: CreateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    createCommunity(input: $input, condition: $condition) {
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
export const updateCommunity = /* GraphQL */ `
  mutation UpdateCommunity(
    $input: UpdateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    updateCommunity(input: $input, condition: $condition) {
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
export const deleteCommunity = /* GraphQL */ `
  mutation DeleteCommunity(
    $input: DeleteCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    deleteCommunity(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFriendship = /* GraphQL */ `
  mutation CreateFriendship(
    $input: CreateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    createFriendship(input: $input, condition: $condition) {
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
export const updateFriendship = /* GraphQL */ `
  mutation UpdateFriendship(
    $input: UpdateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    updateFriendship(input: $input, condition: $condition) {
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
export const deleteFriendship = /* GraphQL */ `
  mutation DeleteFriendship(
    $input: DeleteFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    deleteFriendship(input: $input, condition: $condition) {
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
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
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
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
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
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createRepost = /* GraphQL */ `
  mutation CreateRepost(
    $input: CreateRepostInput!
    $condition: ModelRepostConditionInput
  ) {
    createRepost(input: $input, condition: $condition) {
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
export const updateRepost = /* GraphQL */ `
  mutation UpdateRepost(
    $input: UpdateRepostInput!
    $condition: ModelRepostConditionInput
  ) {
    updateRepost(input: $input, condition: $condition) {
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
export const deleteRepost = /* GraphQL */ `
  mutation DeleteRepost(
    $input: DeleteRepostInput!
    $condition: ModelRepostConditionInput
  ) {
    deleteRepost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createLink = /* GraphQL */ `
  mutation CreateLink(
    $input: CreateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    createLink(input: $input, condition: $condition) {
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
export const updateLink = /* GraphQL */ `
  mutation UpdateLink(
    $input: UpdateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    updateLink(input: $input, condition: $condition) {
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
export const deleteLink = /* GraphQL */ `
  mutation DeleteLink(
    $input: DeleteLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    deleteLink(input: $input, condition: $condition) {
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
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
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
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
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      sender
      content
      createdAt
      conversationID
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
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
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
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
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
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
export const createAnnouncement = /* GraphQL */ `
  mutation CreateAnnouncement(
    $input: CreateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    createAnnouncement(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const updateAnnouncement = /* GraphQL */ `
  mutation UpdateAnnouncement(
    $input: UpdateAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    updateAnnouncement(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const deleteAnnouncement = /* GraphQL */ `
  mutation DeleteAnnouncement(
    $input: DeleteAnnouncementInput!
    $condition: ModelAnnouncementConditionInput
  ) {
    deleteAnnouncement(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      image
      updatedAt
    }
  }
`;
export const createEmailList = /* GraphQL */ `
  mutation CreateEmailList(
    $input: CreateEmailListInput!
    $condition: ModelEmailListConditionInput
  ) {
    createEmailList(input: $input, condition: $condition) {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
export const updateEmailList = /* GraphQL */ `
  mutation UpdateEmailList(
    $input: UpdateEmailListInput!
    $condition: ModelEmailListConditionInput
  ) {
    updateEmailList(input: $input, condition: $condition) {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmailList = /* GraphQL */ `
  mutation DeleteEmailList(
    $input: DeleteEmailListInput!
    $condition: ModelEmailListConditionInput
  ) {
    deleteEmailList(input: $input, condition: $condition) {
      id
      type
      emails
      createdAt
      updatedAt
    }
  }
`;
