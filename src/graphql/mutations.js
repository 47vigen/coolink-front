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
