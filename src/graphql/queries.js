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

export const SHOW_PAGE_WITH_SECTIONS_BY_SLUG = gql`
  query ShowPageWithSectionsBySlug($slug: String!) {
    showPageWithSectionsBySlug(slug: $slug) {
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

export const SHOW_IG_FEEDS_BY_PAGE = gql`
  query ShowIGFeedsByPage($pk: String!, $next: String) {
    showIGFeedsByPage(pk: $pk, next: $next) {
      next
      feeds {
        id
        pk
        caption
        slides {
          type
          imageUrl
          videoUrl
        }
      }
    }
  }
`

export const SHOW_STATISTICS_BY_PAGE = gql`
  query ShowStatisticsByPage($page: String!) {
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

export const SHOW_POST_BY_SLUG = gql`
  query ShowPostBySlug($slug: String!) {
    showPostBySlug(slug: $slug) {
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

export const SHOW_COMMENTS_BY_POST = gql`
  query ShowCommentsByPost($post: ID!) {
    showCommentsByPost(post: $post) {
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
