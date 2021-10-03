import withApollo from '../graphql/apollo'
import { AuthProvider } from '../context/auth'

// ** Styles
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

// ** Seo
import { DefaultSeo } from 'next-seo'
import SEO from '../config/seo'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default withApollo(MyApp)
