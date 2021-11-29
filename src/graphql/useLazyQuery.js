import React from 'react'
import { useLazyQuery } from '@apollo/client'

export function useImperativeQuery(query, options) {
  const [execute, result] = useLazyQuery(query, options)

  const resolveRef = React.useRef()

  React.useEffect(() => {
    if (result.called && !result.loading && resolveRef.current) {
      resolveRef.current(result)
      resolveRef.current = undefined
    }
  }, [result.loading, result.called, result])

  const queryImperatively = React.useCallback(
    (options) => {
      execute(options)
      return new Promise((resolve) => {
        resolveRef.current = resolve
      })
    },
    [execute]
  )

  return [queryImperatively, result]
}
