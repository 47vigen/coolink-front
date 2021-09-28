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
      }
    }
  }
`

export const GET_PAGE_INFO = gql`
  mutation GetPageInfo($username: String!) {
    getPageInfo(username: $username) {
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

export const UPDATE_INSERT_MANY_SECTIONS = gql`
  mutation UpdateInsertManySections($sections: [SectionManyInput!]) {
    updateInsertManySections(sections: $sections) {
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
