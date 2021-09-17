import React from 'react'

// ** UI
import Feeds from '../../components/Feeds'
import Page from '../../components/Layout/Page'
import { Icon } from '../../components/Tools'

// ** Graphql
import { client } from '../../graphql/apollo'
import { SHOW_PAGE } from '../../graphql/queries'

export default function Home({ page }) {
  return (
    <Page page={page}>
      <Feeds page={page}>
        {(feed) =>
          feed.slides.map((slide, idx) => (
            <a
              download
              target="_blank"
              rel="noreferrer"
              key={`slides-${idx}`}
              href={slide.videoUrl ? slide.videoUrl : slide.imageUrl}
              className={`flex items-center mt-2 transition duration-300 hover:opacity-70 bg-${page.customize.color} bg-opacity-5 text-${page.customize.color} rounded-lg py-2 px-4`}
            >
              {slide.type === 'VIDEO' ? <Icon name="play" className="me-2" /> : <Icon name="picture" className="me-2" />}
              {feed.slides.length > 1 ? `دانلود اسلاید #${idx + 1}` : 'دانلود پست'}
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
