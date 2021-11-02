import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_STATISTIC } from '../graphql/mutations'
import deepCleaner from '../utils/deepCleaner'

function useSendStatistic(page, pageReferrer) {
  const [createStatistic] = useMutation(CREATE_STATISTIC)
  const sendStatistic = React.useCallback(
    (event = 'pageView', ...ids) => {
      const agent = typeof navigator !== 'undefined' ? navigator.userAgent : null
      const pathname = typeof window !== 'undefined' ? window.location.pathname : null
      const referrer = pageReferrer || typeof document !== 'undefined' ? document.referrer : null
      createStatistic({ variables: deepCleaner({ event, ids, page, agent, referrer, pathname }) })
    },
    [createStatistic, page, pageReferrer]
  )

  React.useEffect(() => {
    sendStatistic('pageView')
  }, [sendStatistic])

  return { sendStatistic }
}

export default useSendStatistic
