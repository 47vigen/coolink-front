import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { useAuth } from '../../../context/auth'

// ** UI
import { Loader } from '../../../components/Tools'
import Layout from '../../../components/Layout'

// ** Graphql
import { createApolloClient } from '../../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS } from '../../../graphql/queries'

// ** Utils
import deepCleaner from '../../../utils/deepCleaner'

const Template = dynamic(() => import('../../../components/Template'), {
  ssr: false
})

function Edit({ page, sections }) {
  const { loading } = useAuth()
  return (
    <Layout className="flex flex-col" dashboard footer={false}>
      <NextSeo title={`ویرایش ${page.title}`} noindex />
      <Loader loading={loading} className="w-full max-w-md flex-1 mx-auto">
        <Template page={page} sections={sections} />
      </Loader>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
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
        page: deepCleaner(dataPage.showPageWithSections.page),
        sections: deepCleaner(dataPage.showPageWithSections.sections),
        apolloState: client.cache.extract()
      }
    }
  }

  return {
    notFound: true
  }
}

export default Edit
