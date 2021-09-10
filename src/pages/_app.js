import withApollo from '../graphql/apollo'
import { AuthProvider } from '../context/auth'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default withApollo(MyApp)
