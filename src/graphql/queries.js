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
      customize {
        color
        backgroundImage
      }
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
      customize {
        color
        backgroundImage
      }
    }
  }
`

export const SHOW_SECTIONS = gql`
  query ShowSection($page: String!) {
    showSection(page: $page) {
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

export const GET_PAGE_FEEDS = gql`
  query GetPageFeeds($pk: String!, $next: String) {
    getPageFeeds(pk: $pk, next: $next) {
      next
      feeds {
        id
        slides {
          type
          imageUrl
          videoUrl
        }
        caption
      }
    }
  }
`
