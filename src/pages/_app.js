import { Toaster } from 'react-hot-toast'

import withApollo from '../graphql/apollo'
import { AuthProvider } from '../context/auth'

// ** Styles
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/progress.css'

// ** Seo
import { DefaultSeo } from 'next-seo'
import SEO from '../config/seo'

// ** NProgress
import Router from 'next/router'
import NProgress from 'nprogress'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Toaster reverseOrder />
    </AuthProvider>
  )
}

export default withApollo(MyApp)
