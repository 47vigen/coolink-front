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
