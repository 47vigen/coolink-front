import React from 'react'
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, Observable } from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { createUploadLink } from 'apollo-upload-client'
import { onError } from 'apollo-link-error'
import jwtDecode from 'jwt-decode'

// ** Utils
import { getToken, removeToken, setToken } from '../utils/token'

const requestLink = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle
        Promise.resolve(operation)
          .then((operation) => {
            if (getToken()) {
              operation.setContext({
                headers: {
                  authorization: `Bearer ${getToken()}`
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

const createIsomorphLink = () =>
  ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'token',
      isTokenValidOrUndefined: () => {
        try {
          if (getToken()) {
            const { exp } = jwtDecode(getToken())
            if (Date.now() >= exp * 1000) {
              return false
            } else return true
          } else true
        } catch {
          return false
        }
      },
      fetchAccessToken: () =>
        fetch(process.env.API_URI_REFRESH, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }),
      handleFetch: (token) => {
        setToken(token)
      },
      handleError: (err) => {
        removeToken()
        console.error(err)
        console.warn('Your refresh token is invalid. Try to relogin')
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors)
      console.log(networkError)
    }),
    requestLink(getToken()),
    createUploadLink({
      uri: process.env.API_URI_GRAPHQL,
      credentials: 'include'
    })
  ])

export function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      addTypename: false
    }).restore(initialState)
  })
}

const withApollo = (WithOutApollo) => {
  const WithApollo = ({ pageProps, Component }) => {
    const [client] = React.useState(pageProps?.apolloClient || createApolloClient(pageProps?.apolloState))

    return (
      <ApolloProvider client={client}>
        <WithOutApollo Component={Component} pageProps={pageProps} />
      </ApolloProvider>
    )
  }

  return WithApollo
}

export default withApollo
