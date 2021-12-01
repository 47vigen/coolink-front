import { getServerSideSitemap } from 'next-sitemap'

// ** Graphql
import { createApolloClient } from '../graphql/apollo'
import { SHOW_XML } from '../graphql/queries'

export async function getServerSideProps(ctx) {
  const client = createApolloClient()
  const { data } = await client.query({
    query: SHOW_XML
  })

  return getServerSideSitemap(ctx, [
    ...(data?.showXml || []),
    {
      lastmod: new Date().toISOString(),
      loc: 'https://coolink.ir/blog',
      changefreq: 'daily',
      priority: 1
    },
    {
      lastmod: new Date().toISOString(),
      loc: 'https://coolink.ir',
      changefreq: 'daily',
      priority: 1
    }
  ])
}

const Xml = () => {}
export default Xml
