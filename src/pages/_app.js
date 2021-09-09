import withApollo from '../graphql/apollo'
import { AuthProvider } from '../context/auth'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const ComponentWithApollo = withApollo(Component)
  return (
    <AuthProvider>
      <ComponentWithApollo {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
