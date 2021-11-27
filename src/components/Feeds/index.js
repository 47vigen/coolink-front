import React from 'react'

// UI
import Feed from './Feed'
import { Element, Icon } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_IG_FEEDS_BY_PAGE } from '../../graphql/queries'

function Feeds({ page, section, children }) {
  const [feeds, setFeeds] = React.useState([])
  const {
    data,
    loading: showIGFeedsByPageLoading,
    refetch
  } = useQuery(SHOW_IG_FEEDS_BY_PAGE, {
    variables: { pk: page.pk },
    onCompleted: ({ showIGFeedsByPage: { feeds } }) => setFeeds(feeds)
  })

  const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false)
  const fetchMore = React.useCallback(async () => {
    setFetchMoreLoading(true)
    try {
      const { data: refetchData } = await refetch({ next: data?.showIGFeedsByPage?.next })
      setFeeds((prev) => [...prev, ...refetchData?.showIGFeedsByPage?.feeds])
    } catch (error) {
      console.log(error)
    }
    setFetchMoreLoading(false)
  }, [data, refetch])

  const [isOpened, setIsOpened] = React.useState('')

  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  return (
    <>
      <div className={classNames('grid grid-cols-3 gap-2', feeds.length ? 'my-4' : 'mt-4')}>
        {feeds.map((feed) => (
          <Feed
            feed={feed}
            key={feed.id}
            opened={isOpened === feed.id}
            onOpen={() => setIsOpened(feed.id)}
            customize={{ second: page.style?.customize?.color, color: 'white', ...custom(1) }}
          >
            {typeof children === 'function' ? children(feed, custom) : children}
          </Feed>
        ))}
      </div>
      <Element
        tag="button"
        customize={{ ...page.style.customize, ...custom(0) }}
        onClick={showIGFeedsByPageLoading || fetchMoreLoading ? null : fetchMore}
        className="flex w-full justify-center items-center min-h-[2rem] mb-4"
      >
        {showIGFeedsByPageLoading || fetchMoreLoading ? <Icon name="spinner" className="animate-spin text-base ml-2" /> : null}
        پست های بیشتر ...
      </Element>
    </>
  )
}

export default React.memo(Feeds)
