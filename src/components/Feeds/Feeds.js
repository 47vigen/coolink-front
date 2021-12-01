import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

// ** UI
import { FeedItem } from '.'
import { Element, Icon } from '../Tools'

// ** Graphql
import { SHOW_IG_FEEDS_BY_PAGE } from '../../graphql/queries'
import useImperativeQuery from '../../graphql/useImperativeQuery'

// ** Utils
import lessable from '../../utils/lessable'

function Feeds({ page, section, feeds: serverfeeds = [] }) {
  const [feeds, setFeeds] = React.useState(serverfeeds)
  const [tureLoading, setTureLoading] = React.useState(false)
  const [fetch, { called, data, loading, error }] = useImperativeQuery(SHOW_IG_FEEDS_BY_PAGE, {
    onCompleted: (data) =>
      setFeeds((prev) => {
        const feeds = lessable(data).feeds
        const current = prev.map((item) => feeds.find((feed) => item.pk === feed.pk) || item)
        return [...current, ...feeds.filter((feed) => !current.find((item) => item.pk === feed.pk))]
      })
  })

  const hasMore = React.useMemo(() => lessable(data)?.next || (!called && !error), [called, data, error])
  const next = React.useCallback(() => {
    setTureLoading(true)
    if (!called && !error) {
      return fetch({ variables: { page: page.id } })
        .then(({ data, ...props }) =>
          lessable(data)?.next ? fetch({ variables: { page: page.id, next: lessable(data).next } }) : { data, ...props }
        )
        .finally(() => setTureLoading(false))
    } else return fetch({ variables: { page: page.id, next: lessable(data)?.next } }).finally(() => setTureLoading(false))
  }, [called, data, error, fetch, page.id])

  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  return (
    <>
      <InfiniteScroll next={next} dataLength={feeds.length} hasMore={hasMore}>
        <div className="grid grid-cols-3 gap-2 mt-4 lg:mt-0">
          {(feeds.length ? feeds : serverfeeds).map((feed) => (
            <FeedItem key={feed.pk} page={page} feed={feed} section={section} />
          ))}
        </div>
      </InfiniteScroll>
      {loading || tureLoading || hasMore ? (
        <Element
          tag="button"
          onClick={!(loading || tureLoading) ? next : null}
          customize={{ ...page.style.customize, ...custom(0) }}
          className="flex w-full justify-center items-center min-h-[2rem] my-4"
        >
          {loading || tureLoading ? (
            <Icon name="spinner" className="animate-spin text-base ml-2" />
          ) : (
            <Icon name="arrow-small-down" className="text-base ml-2" />
          )}
          پست های بیشتر ...
        </Element>
      ) : (
        <Element
          tag="div"
          customize={{ ...page.style.customize, ...custom(0) }}
          className="flex w-full justify-center items-center min-h-[2rem] my-4"
        >
          <Icon name="check" className="text-base ml-2" />
          همه پست ها رو دیدی!
        </Element>
      )}
    </>
  )
}

export default React.memo(Feeds)
