import React from 'react'
import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import Linkify from 'linkify-react'
import { ArticleJsonLd } from 'next-seo'
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
import { getImgSrc } from '../../../utils/getImgSrc'

function SingleFeed({ page, section, feed, referrer }) {
  const { sendStatistic } = useSendStatistic(page.id, referrer)
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])
  const customize = React.useMemo(() => ({ ...page.style.customize, ...custom(0) }), [custom, page.style.customize])

  return (
    <Page
      page={page}
      className="pb-16"
      title={feed.title}
      description={feed.caption}
      header={<FeedHeader title={feed.title} page={page} section={section} back={`/${page.slug}/feeds`} />}
      openGraph={{
        type: 'article',
        title: feed.title,
        description: feed.caption,
        url: `https://coolink.ir/${page.slug}/feeds/${feed.pk}`,
        article: {
          authors: [`https://coolink.ir/${page.slug}`],
          tags: feed.caption.match(/(?<!\S)#\S+|\S+#(?!\S)/gm)?.map((c) => c?.replace(/[⁣|#]/gm, ''))
        },
        images: [
          {
            width: 1080,
            height: 1080,
            alt: feed.title,
            url: 'https://coolink.ir/_next/image?url=' + escape(getImgSrc(feed.slides[0].imageUrl)) + '&w=1080&q=75'
          }
        ]
      }}
    >
      <ArticleJsonLd
        url={`https://coolink.ir/${page.slug}/feeds/${feed.pk}`}
        title={feed.title}
        images={['https://coolink.ir/_next/image?url=' + escape(getImgSrc(feed.slides[0].imageUrl)) + '&w=1080&q=75']}
        authorName={[page.title]}
        publisherName="coolink"
        publisherLogo="https://coolink.ir/images/coolink-logo.svg"
        description={feed.title}
      />
      <article className="my-4 lg:my-0">
        <FeedSlider feed={feed} customize={custom(1)} />
        <Linkify
          tagName="section"
          className="py-4"
          options={{
            nl2br: true,
            rel: 'nofollow',
            target: '_blank',
            className: `text-${customize.color}`,
            formatHref: {
              mention: (href) => 'https://www.instagram.com' + href,
              hashtag: (href) => 'https://www.instagram.com/explore/tags/' + href.substr(1)
            }
          }}
        >
          {feed.caption}
        </Linkify>
        <div className="fixed bottom-0 start-0 end-0 z-50 px-4 md:px-0">
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
