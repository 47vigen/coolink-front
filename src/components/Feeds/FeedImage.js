import React from 'react'
import Image from 'next/image'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

const FeedImage = ({ idx, feed, opened, className }) => {
  const src = React.useMemo(() => getImgSrc(feed.slides[idx || 0].imageUrl), [idx, feed.slides])

  return (
    <Image
      src={src}
      width={opened ? 768 : 250}
      height={opened ? 768 : 250}
      layout="responsive"
      className={classNames('rounded-md', className)}
      objectFit="cover"
      alt={feed.title}
      loading="lazy"
    />
  )
}

export default React.memo(FeedImage)
