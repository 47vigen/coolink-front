import React from 'react'
import useSendStatistic from '../../../hooks/useSendStatistic'

// ** UI
import Page from '../../../components/Layout/Page'
import { Avatar, Element, Icon, Link } from '../../../components/Tools'
import { FeedHeader, FeedSlider } from '../../../components/Feeds'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { apolloClient } from '../../../graphql/apollo'
import { SHOW_ONE_FEED_WITH_PAGE_SECTION } from '../../../graphql/queries'

// ** Utils
import classNames from '../../../utils/classNames'

function SingleFeed({ page, section, feed, referrer }) {
  const { sendStatistic } = useSendStatistic(page.id, referrer)
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])
  return (
    <Page
      noindex
      nofollow
      page={page}
      title={section.items[0].key || 'لینک پست ها'}
      header={<FeedHeader title={feed.title} page={page} section={section} back={`/${page.slug}/feeds`} />}
    >
      <FeedSlider feed={feed} customize={custom(1)} />
    </Page>
  )
}

export const getServerSideProps = ({ params, req }) =>
  apolloClient().then(({ client, lessable }) =>
    client
      .query({
        variables: params,
        query: SHOW_ONE_FEED_WITH_PAGE_SECTION
      })
      .then(({ data }) => ({
        props: {
          page: lessable(data).page,
          feed: lessable(data).feed,
          section: lessable(data).section,
          apolloState: client.cache.extract(),
          referrer: req.headers.referrer || req.headers.referer || null
        }
      }))
      .catch(() => ({ notFound: true }))
  )

export default SingleFeed
