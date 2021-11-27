import React from 'react'
import { SocialProfileJsonLd } from 'next-seo'

import Page from '../../components/Layout/Page'
import Render from '../../components/Template/Render'

// ** Graphql
import { createApolloClient } from '../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS_BY_SLUG } from '../../graphql/queries'

// ** Hooks
import onDeepLink from '../../utils/onDeepLink'
import useSendStatistic from '../../hooks/useSendStatistic'

export default function Home({ page = {}, sections = [], referrer = '' }) {
  const { sendStatistic } = useSendStatistic(page.id, referrer)

  const sameAsSocialProfiles = React.useMemo(() => {
    const sameAs = []
    const supported = ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'myspace', 'pinterest', 'soundcloud', 'tumblr']
    sections
      .filter((section) => section.type === 'services')
      ?.map((section) => section?.items?.map((item) => (supported.includes(item.type) ? sameAs.push(onDeepLink(item.type, item.value).url) : null)))
    return sameAs
  }, [sections])

  return (
    <Page page={page}>
      <SocialProfileJsonLd type="Person" name={page.title} url={'https://coolink.ir/' + page.slug} sameAs={sameAsSocialProfiles} />
      <Render page={page} sections={sections} sendStatistic={sendStatistic} />
    </Page>
  )
}

export async function getServerSideProps({ params, req }) {
  const client = createApolloClient()
  const { data: dataPage, error: errorPage } = await client.query({
    query: SHOW_PAGE_WITH_SECTIONS_BY_SLUG,
    variables: {
      slug: params.slug
    }
  })

  if (dataPage?.showPageWithSectionsBySlug?.page && dataPage?.showPageWithSectionsBySlug?.sections && !errorPage) {
    return {
      props: {
        page: dataPage.showPageWithSectionsBySlug.page,
        sections: dataPage.showPageWithSectionsBySlug.sections,
        apolloState: client.cache.extract(),
        referrer: req.headers.referrer || req.headers.referer || null
      }
    }
  }

  return {
    notFound: true
  }
}
