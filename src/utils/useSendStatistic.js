import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_STATISTIC } from '../graphql/mutations'
import deepCleaner from './deepCleaner'

function useSendStatistic(page) {
  const [createStatistic] = useMutation(CREATE_STATISTIC)
  const sendStatistic = React.useCallback(
    (event = 'pageView', ...ids) => {
      const agent = typeof navigator !== 'undefined' ? navigator.userAgent : null
      const referrer = typeof document !== 'undefined' ? document.referrer : null
      createStatistic({ variables: deepCleaner({ event, ids, page, agent, referrer }) })
    },
    [createStatistic, page]
  )

  React.useEffect(() => {
    sendStatistic('pageView')
  }, [sendStatistic])

  return { sendStatistic }
}

export default useSendStatistic
