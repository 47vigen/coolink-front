import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, Observable } from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { onError } from 'apollo-link-error'
import jwtDecode from 'jwt-decode'

import { useAuth } from '../context/auth'

const requestLink = (token) =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle
        Promise.resolve(operation)
          .then((operation) => {
            if (token) {
              operation.setContext({
                headers: {
                  authorization: `Bearer ${token}`
                }
              })
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

const createIsomorphLink = (token, userId, setAuthToken) =>
  ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'token',
      isTokenValidOrUndefined: () => {
        if (!token || !userId) return true

        try {
          const { exp } = jwtDecode(token)
          if (Date.now() >= exp * 1000) {
            return false
          } else return true
        } catch {
          return false
        }
      },
      fetchAccessToken: () => {
        if (!userId) {
          return null
        } else
          return fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include'
          })
      },
      handleFetch: (token) => {
        setAuthToken(token)
      },
      handleError: (err) => {
        console.warn('Your refresh token is invalid. Try to relogin')
        console.error(err)
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors)
      console.log(networkError)
    }),
    requestLink(token),
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include'
    })
  ])

function createApolloClient(initialState = {}, token, userId, setAuthToken) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(token, userId, setAuthToken),
    cache: new InMemoryCache().restore(initialState)
  })
}

const withApollo = (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const { authState, setAuthToken } = useAuth()

    const client = apolloClient || createApolloClient(apolloState, authState?.token, authState?.userId, setAuthToken)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  return WithApollo
}

export default withApollo
