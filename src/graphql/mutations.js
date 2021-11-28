import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(userInput: { email: $email, password: $password }) {
      token
      user {
        id
        name
        picture
        email
        role
      }
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(userInput: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
        name
        picture
        email
        role
      }
    }
  }
`

export const SEND_CONFIRM_EMAIL = gql`
  mutation SendConfirmEmail {
    sendConfirmEmail
  }
`

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      token
      user {
        id
        name
        picture
        email
        role
      }
    }
  }
`

export const SHOW_IG_INFO_BY_USERNAME = gql`
  mutation ShowIGInfoByUsername($username: String!) {
    showIGInfoByUsername(username: $username) {
      pk
      fullName
      profilePic
      isPrivate
    }
  }
`

export const CREATE_PAGE = gql`
  mutation CreatePage($pageInput: PageInput!) {
    createPage(pageInput: $pageInput) {
      id
      pk
      slug
      title
      subTitle
      avatar {
        url
        position
        customize {
          type
          rounded
          animate
          color
          second
          border
          borderStyle
          direction
          from
          to
          via
        }
      }
      style {
        customize {
          type
          rounded
          animate
          color
          second
          border
          borderStyle
          direction
          from
          to
          via
        }
        display {
          font
          direction
        }
        titles {
          color
        }
        background {
          url
          color
        }
        cover {
          url
          customize {
            type
            rounded
            animate
            color
            second
            border
            borderStyle
            direction
            from
            to
            via
          }
        }
      }
    }
  }
`

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $pageInput: PageInput!) {
    updatePage(id: $id, pageInput: $pageInput) {
      id
      pk
      slug
      title
      subTitle
      avatar {
        url
        position
        customize {
          type
          rounded
          animate
          color
          second
          border
          borderStyle
          direction
          from
          to
          via
        }
      }
      style {
        customize {
          type
          rounded
          animate
          color
          second
          border
          borderStyle
          direction
          from
          to
          via
        }
        display {
          font
          direction
        }
        titles {
          color
        }
        background {
          url
          color
        }
        cover {
          url
          customize {
            type
            rounded
            animate
            color
            second
            border
            borderStyle
            direction
            from
            to
            via
          }
        }
      }
    }
  }
`

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($type: UploadType!, $pk: String!, $image: Upload!) {
    uploadImage(type: $type, pk: $pk, image: $image)
  }
`

export const SAVE_MANY_SECTIONS = gql`
  mutation SaveManySections($sections: [SectionManyInput!]) {
    saveManySections(sections: $sections) {
      id
      type
      position
      title
      items {
        id
        type
        key
        value
        options {
          key
          value
        }
      }
      arrangement
      customized
      customize {
        type
        rounded
        animate
        color
        second
        border
        borderStyle
        direction
        from
        to
        via
      }
    }
  }
`

export const DESTROY_SECTION = gql`
  mutation DestroySection($id: ID!) {
    destroySection(id: $id) {
      id
    }
  }
`

export const CREATE_STATISTIC = gql`
  mutation CreateStatistic($page: ID!, $event: String!, $ids: [ID!], $agent: String, $referrer: String, $pathname: String) {
    createStatistic(statisticInput: { page: $page, event: $event, ids: $ids, agent: $agent, referrer: $referrer, pathname: $pathname }) {
      id
    }
  }
`

// Blog
export const CREATE_POST = gql`
  mutation CreatePost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      id
      views
      body
      slug
      cover
      title
      subTitle
      attachment
      user {
        id
        name
        picture
        role
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $postInput: PostInput!) {
    updatePost(id: $id, postInput: $postInput) {
      id
      views
      body
      slug
      cover
      title
      subTitle
      attachment
      user {
        id
        name
        picture
        role
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($post: ID!, $body: String!, $repliedTo: ID) {
    createComment(commentInput: { post: $post, body: $body, repliedTo: $repliedTo }) {
      id
      body
      user {
        id
        name
        picture
      }
    }
  }
`
