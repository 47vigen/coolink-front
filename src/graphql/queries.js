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
      avatar {
        url
      }
    }
  }
`

export const SHOW_PAGE_WITH_SECTIONS = gql`
  query ShowPageWithSections($slug: String!) {
    showPageWithSections(slug: $slug) {
      page {
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
      sections {
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
