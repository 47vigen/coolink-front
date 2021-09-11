import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// ** Utils
import { getToken, removeToken, setToken } from '../utils/token'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_ME } from '../graphql/queries'

const AuthContext = React.createContext({})

const AuthProvider = ({ children }) => {
  const router = useRouter()
  const { data, loading, error, refetch } = useQuery(SHOW_ME, { skip: !getToken() })

  const user = React.useMemo(
    () => ({
      ...data?.showMe,
      loading,
      error
    }),
    [data, loading, error]
  )

  const signIn = React.useCallback(
    (token, redirect) => {
      setToken(token)
      if (redirect) router.push('/')
      refetch()
    },
    [router, refetch]
  )

  const signOut = React.useCallback(() => {
    removeToken()
    refetch()
  }, [refetch])

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}

const useAuth = () => React.useContext(AuthContext)

export const RequireAuth = () => {
  const { user } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!user.id && !user.loading) {
      router.push('/')
    }
  }, [user, router])
}

export { AuthProvider, useAuth }
