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
  mutation CreatePage($pk: String!, $slug: String!, $title: String!, $subTitle: String, $profilePic: String) {
    createPage(pageInput: { pk: $pk, slug: $slug, title: $title, subTitle: $subTitle, profilePic: $profilePic }) {
      id
    }
  }
`

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($pk: String!, $image: Upload!) {
    uploadImage(pk: $pk, image: $image)
  }
`

export const UPDATE_INSERT_MANY_SECTIONS = gql`
  mutation UpdateInsertManySections($sections: [SectionManyInput!]) {
    updateInsertManySections(sections: $sections) {
      id
      type
      position
      title
      links {
        url
        title
      }
      text
      contacts {
        mobile
        phone
        email
        fax
      }
      messengers {
        telegram
        whatsapp
        twitter
        youtube
        linkedin
      }
      locations {
        url
        title
      }
      faq {
        question
        answer
      }
    }
  }
`
