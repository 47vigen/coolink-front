import React from 'react'

import Page from '../../components/Layout/Page'
import Render from '../../components/Template/Render'

// ** Graphql
import { client } from '../../graphql/apollo'
import { SHOW_PAGE, SHOW_SECTIONS } from '../../graphql/queries'

export default function Home({ page, sections }) {
  return (
    <Page page={page}>
      <Render page={page} sections={sections} />
    </Page>
  )
}

export async function getServerSideProps({ params }) {
  const { data: dataPage, error: errorPage } = await client.query({
    fetchPolicy: 'network-only',
    query: SHOW_PAGE,
    variables: {
      slug: params.slug
    }
  })

  if (dataPage?.showPage && !errorPage) {
    const { data: dataSections, error: errorSections } = await client.query({
      fetchPolicy: 'network-only',
      query: SHOW_SECTIONS,
      variables: {
        page: dataPage.showPage.id
      }
    })

    if (dataSections?.showSection && !errorSections) {
      return {
        props: {
          page: dataPage.showPage,
          sections: dataSections.showSection
        }
      }
    }
  }

  return {
    notFound: true
  }
}
