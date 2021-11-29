import React from 'react'

// ** UI
import { Link } from '../Tools'
import { FeedFlag, FeedImage } from '.'

function FeedItem({ feed, page, section }) {
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])

  return (
    <article>
      <Link href={`/${page.slug}/feeds/${feed.pk}`} className="block relative">
        <FeedImage feed={feed} className={`bg-${custom(1).color || 'white'}`} />
        {feed.slides.length > 1 ? <FeedFlag type="slide" /> : feed.slides[0].type === 'video' ? <FeedFlag type="video" /> : null}
      </Link>
    </article>
  )
}

export default React.memo(FeedItem)
