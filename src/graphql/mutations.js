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

const GET_PAGE_INFO = gql`
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
