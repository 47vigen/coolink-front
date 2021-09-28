import React from 'react'

// ** UI
import Feeds from '../../components/Feeds'
import Page from '../../components/Layout/Page'
import { Element } from '../../components/Tools'

// ** Graphql
import { createApolloClient } from '../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS } from '../../graphql/queries'
import classNames from '../../utils/classNames'

export default function Home({ page, section }) {
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
      <Feeds page={page} section={section}>
        {(feed, custom) =>
          generateLinks(feed.caption)?.length ? (
            generateLinks(feed.caption).map((link, idx) => (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={`links-${idx}`}
                className={classNames('text-right block border rounded-md p-2', `border-${custom(1)?.second || page.style?.customize?.color}`)}
              >
                {link.title}
                <Element tag="span" className="block mt-2 text-center py-2 px-4" customize={{ ...page.style?.customize, ...custom(0) }}>
                  {link.url}
                </Element>
              </a>
            ))
          ) : (
            <Element tag="span" className="block mt-2 text-center py-2 px-4" customize={{ ...page.style?.customize, ...custom(0) }}>
              در کپشن این پست لینک وجود ندارد!
            </Element>
          )
        }
      </Feeds>
    </Page>
  )
}

export async function getServerSideProps({ params }) {
  const client = createApolloClient()
  const { data, error } = await client.query({
    query: SHOW_PAGE_WITH_SECTIONS,
    variables: {
      slug: params.slug
    }
  })
  const section = data?.showPageWithSections?.sections?.find((section) => section?.type === 'igFeedsLink')

  if (data?.showPageWithSections?.page && section && !error) {
    return {
      props: {
        page: data.showPageWithSections?.page,
        apolloState: client.cache.extract(),
        section
      }
    }
  }

  return {
    notFound: true
  }
}
