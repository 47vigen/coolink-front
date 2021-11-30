import React from 'react'
import Image from 'next/image'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

const FeedImage = ({ idx = 0, feed, opened, className }) => {
  const imgSrc = React.useMemo(() => getImgSrc(feed.slides[idx].imageUrl), [idx, feed.slides])
  const videoSrc = React.useMemo(() => (feed.slides[idx].videoUrl ? getImgSrc(feed.slides[idx].videoUrl) : null), [idx, feed.slides])

  return opened && videoSrc ? (
    <Player poster={imgSrc}>
      <source src={videoSrc} />
    </Player>
  ) : (
    <Image
      src={imgSrc}
      width={opened ? 1080 : 250}
      height={opened ? 1080 : 250}
      layout="intrinsic"
      className={classNames('rounded-md', className)}
      objectFit="cover"
      alt={feed.title}
      loading="lazy"
    />
  )
}

export default React.memo(FeedImage)
