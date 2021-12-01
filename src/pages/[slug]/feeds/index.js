import React from 'react'
import { BlogJsonLd } from 'next-seo'
import useSendStatistic from '../../../hooks/useSendStatistic'

// ** UI
import Page from '../../../components/Layout/Page'
import { Element, Icon } from '../../../components/Tools'
import Feeds, { FeedHeader, FeedItem } from '../../../components/Feeds'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { apolloClient } from '../../../graphql/apollo'
import { SEARCH_FEEDS, SHOW_PAGE_WITH_FEEDS_SECTIONS_BY_SLUG } from '../../../graphql/queries'

// ** Utils
import debounce from '../../../utils/debounce'
import lessable from '../../../utils/lessable'
import classNames from '../../../utils/classNames'
import { getImgSrc } from '../../../utils/getImgSrc'

function FeedsPage({ page, section, feeds }) {
  // const { sendStatistic } = useSendStatistic(page.id, referrer)
  const [search, setSearch] = React.useState('')
  const [fetch, { data, loading }] = useLazyQuery(SEARCH_FEEDS, { fetchPolicy: 'cache-and-network' })
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  const onSearch = React.useMemo(() => debounce((q) => fetch({ variables: { q, pagePk: page.pk } }), 1500), [fetch, page.pk])
  const onChange = React.useCallback(
    (e) => {
      setSearch(e.target.value)
      if (e.target.value) onSearch(e.target.value)
    },
    [onSearch]
  )

  return (
    <Page page={page} title={section.items[0].key || 'پست ها'} header={<FeedHeader page={page} section={section} back={`/${page.slug}`} />}>
      <BlogJsonLd
        authorName={page.title}
        description={page.subTitle}
        images={[getImgSrc(page.avatar?.url)]}
        url={`https://coolink.ir/${page.slug}/feeds`}
        title={section.items[0].key || 'پست ها'}
      />
      <section className="search relative my-4 lg:mt-0">
        <Element
          tag="input"
          customize={{ ...page.style.customize, ...custom(0) }}
          className="flex w-full justify-center items-center min-h-[2.5rem] focus:outline-none mb-4 px-4 !opacity-100"
          placeholder="جست‌وجو در پست های لود شده ..."
          onChange={onChange}
          value={search}
        />
        <Element
          tag={Icon}
          onClick={search ? () => setSearch('') : null}
          customize={{ ...page.style.customize, ...custom(0) }}
          name={search ? (loading ? 'spinner' : 'cross-small') : 'search'}
          className={classNames(
            'text-base absolute top-1 end-1.5 !bg-transparent !border-0 transition-none cursor-pointer p-2',
            loading ? 'animate-spin' : ''
          )}
        />
      </section>
      {search ? (
        <div className="grid grid-cols-3 gap-2">
          {lessable(data)?.map((feed) => (
            <FeedItem key={feed.pk} page={page} feed={feed} section={section} />
          ))}
        </div>
      ) : (
        <Feeds page={page} section={section} feeds={feeds} />
      )}
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

export default FeedsPage
