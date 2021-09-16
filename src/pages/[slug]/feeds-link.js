import React from 'react'

// ** UI
import Feeds from '../../components/Feeds'
import Page from '../../components/Layout/Page'

// ** Graphql
import { client } from '../../graphql/apollo'
import { SHOW_PAGE } from '../../graphql/queries'

export default function Home({ page }) {
  const generateLinks = React.useCallback((caption) => {
    const exportedLinks = caption?.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)
    const links = exportedLinks?.map((link) => ({
      title: caption
        ?.split(link)[0]
        ?.split(/\n/)
        ?.filter((line) => line?.length > 5 && line)
        ?.reverse()[0],
      url: link
    }))
    return links
  }, [])

  return (
    <Page page={page}>
      <Feeds page={page}>
        {(feed) =>
          generateLinks(feed.caption)?.map((link, idx) => (
            <a
              key={`links-${idx}`}
              href={link.url}
              className={`text-right block border border-${page.customize.color} border-opacity-10 rounded-md p-2`}
            >
              {link.title}
              <span
                className={`block mt-2 text-left transition duration-300 hover:opacity-70 bg-${page.customize.color} bg-opacity-5 text-${page.customize.color} rounded-lg py-2 px-4`}
              >
                {link.url}
              </span>
            </a>
          ))
        }
      </Feeds>
    </Page>
  )
}

export async function getServerSideProps({ params }) {
  const { data, error } = await client.query({
    query: SHOW_PAGE,
    variables: {
      slug: params.slug
    }
  })

  if (data?.showPage && !error) {
    return {
      props: {
        page: data.showPage
      }
    }
  }

  return {
    notFound: true
  }
}
