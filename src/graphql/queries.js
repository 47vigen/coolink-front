import { gql } from '@apollo/client'

export const SHOW_ME = gql`
  {
    showMe {
      id
      name
      picture
      email
    }
  }
`

export const SHOW_MY_PAGES = gql`
  {
    showMyPages {
      id
      pk
      slug
      title
      subTitle
      profilePic
    }
  }
`

export const SHOW_PAGE = gql`
  query ($slug: String!) {
    showPage(slug: $slug) {
      id
      pk
      slug
      title
      subTitle
      profilePic
    }
  }
`
