import { gql } from '@apollo/client'

export const SHOW_ME = gql`
  {
    showMe {
      id
      name
      picture
      email
      role
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

export const SHOW_STATISTICS_AND_SECTIONS_BY_PAGE = gql`
  query ShowStatisticsAndSectionsByPage($page: String!) {
    showStatisticsByPage(page: $page) {
      id
      ids
      event
      agent
      referrer
      pathname
      ip
      createdAt
    }

    showSection(page: $page) {
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

export const SHOW_TEMPLATES = gql`
  {
    showTrendTemplates {
      id
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
    showLastTemplates {
      id
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

// Blog
export const SHOW_POSTS = gql`
  {
    showPosts {
      id
      views
      body
      slug
      cover
      title
      subTitle
      attachment
      createdAt
      user {
        id
        name
        picture
        role
      }
    }
  }
`
export const SHOW_ONE_POST = gql`
  query ShowOnePost($slug: String!) {
    showOnePost(slug: $slug) {
      id
      views
      body
      slug
      cover
      title
      subTitle
      attachment
      createdAt
      user {
        id
        name
        picture
        role
      }
    }
  }
`

export const SHOW_COMMENTS = gql`
  query ShowComments($post: ID!) {
    showComments(post: $post) {
      id
      body
      createdAt
      user {
        id
        name
        picture
      }
      replies {
        id
        body
        createdAt
        user {
          id
          name
          picture
        }
      }
    }
  }
`
// Xml
export const SHOW_XML = gql`
  {
    showXml {
      loc
      priority
      lastmod
      changefreq
    }
  }
`
