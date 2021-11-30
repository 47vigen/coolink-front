import React from 'react'
import Image from 'next/image'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

const FeedImage = ({ idx = 0, feed, opened, className }) => {
  const ref = React.useRef()
  const [fullScreen, setFullScreen] = React.useState(false)
  const imgSrc = React.useMemo(() => getImgSrc(feed.slides[idx].imageUrl), [idx, feed.slides])
  const videoSrc = React.useMemo(() => (feed.slides[idx].videoUrl ? getImgSrc(feed.slides[idx].videoUrl) : null), [idx, feed.slides])

  React.useEffect(() => {
    ref.current?.addEventListener('fullscreenchange', (event) => {
      setFullScreen(!event.target?.offsetLeft)
    })
  })

  return opened && videoSrc ? (
    <video
      controls
      ref={ref}
      width={1080}
      height={1080}
      poster={imgSrc}
      className={classNames(!fullScreen ? 'object-cover h-[calc(100vw-1rem)] max-h-[28rem] rounded-md' : '', className)}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
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
