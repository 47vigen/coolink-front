import React from 'react'
import { BlogJsonLd } from 'next-seo'
import useSendStatistic from '../../../hooks/useSendStatistic'

// ** UI
import Page from '../../../components/Layout/Page'
import { Element, Icon, Link } from '../../../components/Tools'
import { FeedHeader, FeedImage, FeedFlag } from '../../../components/Feeds'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { apolloClient } from '../../../graphql/apollo'
import { SHOW_IG_FEEDS_BY_PAGE, SHOW_PAGE_WITH_FEEDS_SECTIONS_BY_SLUG } from '../../../graphql/queries'

// ** Utils
import lessable from '../../../utils/lessable'
import { getImgSrc } from '../../../utils/getImgSrc'

function Feeds({ page, section, feeds: serverfeeds = [], referrer }) {
  const [feeds, setFeeds] = React.useState([])
  const { sendStatistic } = useSendStatistic(page.id, referrer)
  const [fetch, { data, loading, error }] = useLazyQuery(SHOW_IG_FEEDS_BY_PAGE, {
    onCompleted: (data) => setFeeds((prev) => [...prev, ...lessable(data).feeds])
  })
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  React.useEffect(() => {
    setTimeout(() => fetch({ variables: { page: page.id } }), 2500)
  }, [fetch, page.id])

  return (
    <Page page={page} title={section.items[0].key || 'پست ها'} header={<FeedHeader page={page} section={section} back={`/${page.slug}`} />}>
      <BlogJsonLd
        authorName={page.title}
        description={page.subTitle}
        images={[getImgSrc(page.avatar?.url)]}
        url={`https://coolink.ir/${page.slug}/feeds`}
        title={section.items[0].key || 'پست ها'}
      />
      <div className="grid grid-cols-3 gap-2 my-4 lg:my-0">
        {(feeds.length ? feeds : serverfeeds).map((feed) => (
          <article key={feed.pk}>
            <Link href={`/${page.slug}/feeds/${feed.pk}`} className="block relative">
              <FeedImage feed={feed} className={`bg-${custom(1).color || 'white'}`} />
              {feed.slides.length > 1 ? <FeedFlag type="slide" /> : feed.slides[0].type === 'video' ? <FeedFlag type="video" /> : null}
            </Link>
          </article>
        ))}
      </div>
      {(!feeds.length && !error) || loading || lessable(data)?.next ? (
        <Element
          tag="button"
          customize={{ ...page.style.customize, ...custom(0) }}
          onClick={!loading ? () => fetch({ variables: { page: page.id, next: lessable(data)?.next } }) : null}
          className="flex w-full justify-center items-center min-h-[2rem] my-4"
        >
          {(!feeds.length && !error) || loading ? <Icon name="spinner" className="animate-spin text-base ml-2" /> : null}
          پست های بیشتر ...
        </Element>
      ) : null}
    </Page>
  )
}

export const getServerSideProps = ({ params, req }) =>
  apolloClient().then(({ client, lessable }) =>
    client
      .query({
        variables: params,
        query: SHOW_PAGE_WITH_FEEDS_SECTIONS_BY_SLUG
      })
      .then(({ data }) => ({
        props: {
          page: lessable(data).page,
          feeds: lessable(data).feeds,
          section: lessable(data).section,
          apolloState: client.cache.extract(),
          referrer: req.headers.referrer || req.headers.referer || null
        }
      }))
      .catch(() => ({ notFound: true }))
  )

export default Feeds
