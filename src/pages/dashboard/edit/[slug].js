import React from 'react'
import dynamic from 'next/dynamic'

// ** UI
import Layout from '../../../components/Layout'

// ** Graphql
import { client } from '../../../graphql/apollo'
import { SHOW_PAGE } from '../../../graphql/queries'

const Template = dynamic(() => import('../../../components/Template'), {
  ssr: false
})

function Edit({ page }) {
  return (
    <Layout className="flex flex-col" dashboard>
      <div className="w-full lg:max-w-sm flex-1 mx-auto">
        <Template page={page} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { data, error } = await client.query({
    query: SHOW_PAGE,
    fetchPolicy: 'no-cache',
    variables: {
      slug: params.slug
    }
  })

  if (data && !error) {
    return {
      props: {
        page: data.showPage
      }
    }
  }

  return {
    notFound: true
  }
}

export default Edit
