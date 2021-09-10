import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, removeToken, setToken } from '../utils/token'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { SHOW_ME } from '../graphql/queries'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showMe, { data }] = useLazyQuery(SHOW_ME)

  const signIn = React.useCallback(
    (user, token, redirect) => {
      setUser(user)
      if (token) setToken(token)
      if (redirect) router.push('/')
    },
    [router]
  )

  const signOut = () => {
    setUser(null)
    removeToken()
  }

  React.useEffect(() => {
    if (getToken() && !data?.showMe && !user) showMe()
    if (data?.showMe && !user) signIn(data.showMe)
  }, [user, showMe, data?.showMe, signIn])

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
