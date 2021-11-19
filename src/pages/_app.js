import React from 'react'
import { Toaster } from 'react-hot-toast'

import withApollo from '../graphql/apollo'
import { AuthProvider } from '../context/auth'

// ** Styles
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/progress.css'
import '../styles/admin.css'
import '../styles/content.css'

// ** NProgress
import Router from 'next/router'
import NProgress from 'nprogress'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// ** Analytics
import * as gtag from '../utils/gtag'

function Coolink({ Component, pageProps }) {
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster reverseOrder />
    </>
  )
}

export default withApollo(Coolink)
