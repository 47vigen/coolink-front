import React from 'react'

// UI
import Feed from './Feed'
import { Element, Icon } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'

// ** Graphql
import { useQuery } from '@apollo/client'
import { GET_PAGE_FEEDS } from '../../graphql/queries'

function Feeds({ page, children }) {
  const [feeds, setFeeds] = React.useState([])
  const {
    data,
    loading: getPageFeedsLoading,
    refetch
  } = useQuery(GET_PAGE_FEEDS, {
    variables: { pk: page.pk },
    onCompleted: ({ getPageFeeds: { feeds } }) => setFeeds(feeds)
  })

  const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false)
  const fetchMore = React.useCallback(async () => {
    setFetchMoreLoading(true)
    try {
      const { data: refetchData } = await refetch({ next: data?.getPageFeeds?.next })
      setFeeds((prev) => [...prev, ...refetchData?.getPageFeeds?.feeds])
    } catch (error) {
      console.log(error)
    }
    setFetchMoreLoading(false)
  }, [data, refetch])

  const [isOpened, setIsOpened] = React.useState('')

  return (
    <>
      <div className={classNames('grid grid-cols-3 gap-2', feeds.length ? 'my-4' : 'mt-4')}>
        {feeds.map((feed) => (
          <Feed key={feed.id} feed={feed} color={page.customize?.color} opened={isOpened === feed.id} onOpen={() => setIsOpened(feed.id)}>
            {typeof children === 'function' ? children(feed) : children}
          </Feed>
        ))}
      </div>
      <Element
        tag="button"
        customize={page.customize}
        onClick={getPageFeedsLoading || fetchMoreLoading ? null : fetchMore}
        className="flex w-full justify-center items-center min-h-[2rem] mb-4"
      >
        {getPageFeedsLoading || fetchMoreLoading ? <Icon name="spinner" className="animate-spin text-base ml-2" /> : null}
        پست های بیشتر ...
      </Element>
    </>
  )
}

export default React.memo(Feeds)
