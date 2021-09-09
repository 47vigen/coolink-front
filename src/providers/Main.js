import React from 'react'

// ** Context
import { useAuth } from '../context/auth'

// ** Graphql
import { useLazyQuery } from '@apollo/client'
import { SHOW_ME } from '../graphql/queries'

function MainProvider({ children }) {
  const {
    authState: { token, user },
    signIn
  } = useAuth()
  const [showMe, { data }] = useLazyQuery(SHOW_ME)

  React.useEffect(() => {
    if (token && !data?.showMe && !user?.id) showMe()
    if (data?.showMe && !user?.id) signIn(data.showMe)
  }, [token, user, showMe, data?.showMe, signIn])

  return children
}

export default MainProvider
