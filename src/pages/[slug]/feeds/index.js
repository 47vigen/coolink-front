import React from 'react'
import { BlogJsonLd } from 'next-seo'
import InfiniteScroll from 'react-infinite-scroll-component'
import useSendStatistic from '../../../hooks/useSendStatistic'

// ** UI
import Page from '../../../components/Layout/Page'
import { Element, Icon } from '../../../components/Tools'
import { FeedHeader, FeedItem } from '../../../components/Feeds'

// ** Graphql
import { apolloClient } from '../../../graphql/apollo'
import { useImperativeQuery } from '../../../graphql/useLazyQuery'
import { SHOW_IG_FEEDS_BY_PAGE, SHOW_PAGE_WITH_FEEDS_SECTIONS_BY_SLUG } from '../../../graphql/queries'

// ** Utils
import lessable from '../../../utils/lessable'
import { getImgSrc } from '../../../utils/getImgSrc'

function Feeds({ page, section, feeds: serverfeeds = [], referrer }) {
  const [feeds, setFeeds] = React.useState([])
  const { sendStatistic } = useSendStatistic(page.id, referrer)
  const [fetch, { data, loading, error }] = useImperativeQuery(SHOW_IG_FEEDS_BY_PAGE, {
    onCompleted: (data) => setFeeds((prev) => [...prev, ...lessable(data).feeds])
  })

  const hasMore = React.useMemo(() => lessable(data)?.next || (!feeds.length && !error), [data, error, feeds.length])
  const next = React.useCallback(() => {
    if (!feeds.length && !error) {
      return fetch({ variables: { page: page.id } }).then(({ data, ...props }) =>
        lessable(data)?.next ? fetch({ variables: { page: page.id, next: lessable(data).next } }) : { data, ...props }
      )
    } else return fetch({ variables: { page: page.id, next: lessable(data)?.next } })
  }, [data, error, feeds.length, fetch, page.id])

  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  return (
    <Page page={page} title={section.items[0].key || 'پست ها'} header={<FeedHeader page={page} section={section} back={`/${page.slug}`} />}>
      <BlogJsonLd
        authorName={page.title}
        description={page.subTitle}
        images={[getImgSrc(page.avatar?.url)]}
        url={`https://coolink.ir/${page.slug}/feeds`}
        title={section.items[0].key || 'پست ها'}
      />
      <InfiniteScroll next={next} dataLength={feeds.length || serverfeeds.length} hasMore={hasMore}>
        <div className="grid grid-cols-3 gap-2 my-4 lg:my-0">
          {(feeds.length ? feeds : serverfeeds).map((feed) => (
            <FeedItem key={feed.pk} page={page} feed={feed} section={section} />
          ))}
        </div>
      </InfiniteScroll>
      {loading || hasMore ? (
        <Element
          tag="div"
          customize={{ ...page.style.customize, ...custom(0) }}
          className="flex w-full justify-center items-center min-h-[2rem] my-4"
        >
          {loading ? <Icon name="spinner" className="animate-spin text-base ml-2" /> : <Icon name="angle-small-down" className="text-base ml-2" />}
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
