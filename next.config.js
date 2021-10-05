const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa'
  },
  images: {
    domains: [process.env.API_WORKER, 'api.coolink.ir', 'api.colk.ir', 'gravatar.com', 'localhost']
  },
  env: {
    API_URI: process.env.API_URI,
    API_URI_GRAPHQL: process.env.API_URI_GRAPHQL,
    API_URI_REFRESH: process.env.API_URI_REFRESH,
    API_WORKER: process.env.API_WORKER
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    scope: '/'
  }
})
