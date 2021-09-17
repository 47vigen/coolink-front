module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa'
  },
  images: {
    domains: ['coolink.venins.ir', 'gravatar.com', 'localhost']
  },
  env: {
    API_URI: process.env.API_URI,
    API_URI_GRAPHQL: process.env.API_URI_GRAPHQL,
    API_URI_REFRESH: process.env.API_URI_REFRESH
  }
}
