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

export const SHOW_SECTIONS = gql`
  query ShowSection($page: String!) {
    showSection(page: $page) {
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
