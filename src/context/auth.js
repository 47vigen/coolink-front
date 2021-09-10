import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// ** Utils
import { getToken, removeToken, setToken } from '../utils/token'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { SHOW_ME } from '../graphql/queries'

const AuthContext = React.createContext({})

const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = React.useState(null)
  const [showMe, { data }] = useLazyQuery(SHOW_ME)

  const signIn = React.useCallback(
    (user, token, redirect) => {
      setUser(user)
      if (token) setToken(token)
      if (redirect) router.push('/')
    },
    [router]
  )

  const signOut = React.useCallback(() => {
    setUser(null)
    removeToken()
  }, [])

  React.useEffect(() => {
    if (getToken() && !data?.showMe && !user) showMe()
    if (data?.showMe && !user) signIn(data.showMe)
  }, [user, showMe, data?.showMe, signIn])

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
