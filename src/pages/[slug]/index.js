import React from 'react'

import Page from '../../components/Layout/Page'
import Render from '../../components/Template/Render'

// ** Graphql
import { createApolloClient } from '../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS } from '../../graphql/queries'

// ** Hooks
import useSendStatistic from '../../hooks/useSendStatistic'

export default function Home({ page, sections, referrer }) {
  const { sendStatistic } = useSendStatistic(page.id, referrer)

  return (
    <Page page={page}>
      <Render page={page} sections={sections} sendStatistic={sendStatistic} />
    </Page>
  )
}

export async function getServerSideProps({ params, req }) {
  const client = createApolloClient()
  const { data: dataPage, error: errorPage } = await client.query({
    query: SHOW_PAGE_WITH_SECTIONS,
    variables: {
      slug: params.slug
    }
  })

  if (dataPage?.showPageWithSections?.page && dataPage?.showPageWithSections?.sections && !errorPage) {
    return {
      props: {
        page: dataPage.showPageWithSections.page,
        sections: dataPage.showPageWithSections.sections,
        apolloState: client.cache.extract(),
        referrer: req.headers.referrer || req.headers.referer || null
      }
    }
  }

  return {
    notFound: true
  }
}
