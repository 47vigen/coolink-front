import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const initialAuthState = {
    token: undefined,
    user: undefined
  }

  const [authState, setAuthState] = useState(initialAuthState)

  useEffect(() => {
    setAuthState((prev) => ({
      ...prev,
      token: localStorage.getItem('token')
    }))
  }, [])

  const signIn = (user, token) => {
    setAuthState({
      ...authState,
      user,
      token
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  const setAuthToken = (token) => {
    setAuthState({
      ...authState,
      token
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  const signOut = () => {
    setAuthState(initialAuthState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  return <AuthContext.Provider value={{ authState, setAuthToken, signIn, signOut }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
