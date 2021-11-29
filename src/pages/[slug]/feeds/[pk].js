import React from 'react'
import Linkify from 'linkify-react'
import useSendStatistic from '../../../hooks/useSendStatistic'
import { instagramIdToUrlSegment } from 'instagram-id-to-url-segment'

// ** UI
import Page from '../../../components/Layout/Page'
import { SimpleLink } from '../../../components/Tools/Link'
import { FeedHeader, FeedSlider } from '../../../components/Feeds'
import { Avatar, Element, Icon, Link } from '../../../components/Tools'

// ** Graphql
import { apolloClient } from '../../../graphql/apollo'
import { SHOW_ONE_FEED_WITH_PAGE_SECTION } from '../../../graphql/queries'

// ** Utils
import classNames from '../../../utils/classNames'

function SingleFeed({ page, section, feed, referrer }) {
  const { sendStatistic } = useSendStatistic(page.id, referrer)
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])
  const customize = React.useMemo(() => ({ ...page.style.customize, ...custom(0) }), [custom, page.style.customize])

  return (
    <Page
      noindex
      nofollow
      page={page}
      title={section.items[0].key || 'لینک پست ها'}
      header={<FeedHeader title={feed.title} page={page} section={section} back={`/${page.slug}/feeds`} />}
    >
      <article className="my-4 lg:my-0">
        <FeedSlider feed={feed} customize={custom(1)} />
        <Linkify
          tagName="section"
          className="py-4"
          options={{ className: `text-${customize.color}`, target: '_blank', rel: 'nofollow', nl2br: true }}
        >
          {feed.caption}
        </Linkify>
        <div className="fixed bottom-0 start-0 end-0 z-50">
          <div className={classNames('max-w-md mx-auto p-2 rounded-t-lg', `bg-${custom(1).color || 'white'}`)}>
            <Element
              rel="nofollow"
              target="_blank"
              tag={SimpleLink}
              customize={{ ...page.style.customize, ...custom(0) }}
              className="flex w-full justify-center items-center min-h-[2rem]"
              href={`https://www.instagram.com/p/${instagramIdToUrlSegment(feed.pk)}`}
            >
              <Icon name="brand-instagram" className="text-base ml-2" />
              مشاهده در اینستاگرام
            </Element>
          </div>
        </div>
      </article>
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
      .catch((e) => (e.includes('not found') ? { notFound: true } : e))
  )

export default SingleFeed
