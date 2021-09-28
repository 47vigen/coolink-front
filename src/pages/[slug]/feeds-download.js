import React from 'react'

// ** UI
import Feeds from '../../components/Feeds'
import Page from '../../components/Layout/Page'
import { Element, Icon } from '../../components/Tools'

// ** Graphql
import { createApolloClient } from '../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS } from '../../graphql/queries'

export default function Home({ page, section }) {
  return (
    <Page page={page}>
      <Feeds page={page} section={section}>
        {(feed, custom) =>
          feed.slides.map((slide, idx) => (
            <Element
              tag="a"
              download={true}
              target="_blank"
              rel="noreferrer"
              key={`slides-${idx}`}
              className="flex items-center py-2 px-4"
              customize={{ ...page.style?.customize, ...custom(0) }}
              href={slide.videoUrl ? slide.videoUrl : slide.imageUrl}
            >
              {slide.type === 'video' ? <Icon name="play" className="me-2" /> : <Icon name="picture" className="me-2" />}
              {feed.slides.length > 1 ? `دانلود اسلاید #${idx + 1}` : 'دانلود پست'}
            </Element>
          ))
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
  const section = data?.showPageWithSections?.sections?.find((section) => section?.type === 'igFeedsDownload')

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
