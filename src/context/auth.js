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

  const user = React.useMemo(() => ({ ...data?.showMe, error }), [data, error])

  const signIn = React.useCallback(
    async (token, redirect) => {
      setToken(token)
      await refetch()
      if (redirect) router.replace(typeof redirect === 'string' ? redirect : '/dashboard')
    },
    [router, refetch]
  )

  const signOut = React.useCallback(() => {
    removeToken()
    refetch()
    router.reload()
  }, [router, refetch])

  return <AuthContext.Provider value={{ loading, user, signIn, signOut }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}

const useAuth = () => React.useContext(AuthContext)

export const RequireAuth = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!user.id && !loading) {
      router.replace({
        pathname: '/login',
        query: { ref: window.location.pathname + window.location.search }
      })
    }
  }, [user, loading, router])
}

export { AuthProvider, useAuth }
