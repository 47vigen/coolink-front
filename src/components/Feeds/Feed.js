import React from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

// ** UI
import { Icon } from '../Tools'

// ** Utils
import { getFileBase } from '../../utils/fileBase'
import classNames from '../../utils/classNames'

function Feed({ feed, opened, onOpen, children }) {
  const [images, setImages] = React.useState(Array(feed.slides?.length || 1).fill(''))

  const loadImage = React.useCallback(
    async (idx) => {
      if (images[idx]) return null
      const url = feed.slides[idx].imageUrl
      const { base64 } = await getFileBase(url)
      let current = images
      current[idx] = base64
      setImages([...current])
    },
    [images, feed]
  )

  React.useEffect(() => {
    loadImage(0)
  }, [loadImage])

  return opened ? (
    <div className="col-span-3 relative">
      {feed.slides.length > 1 ? (
        <FeedSlider images={images} feed={feed} loadImage={loadImage} opened />
      ) : (
        <FeedImage src={images[0]} feed={feed} opened />
      )}
      <div className="bg-white rounded-b-md p-4">{typeof children === 'function' ? children(feed) : children}</div>
    </div>
  ) : (
    <button className="block w-full h-full relative" onClick={onOpen}>
      <FeedImage src={images[0]} feed={feed} />
      {feed.slides.length > 1 ? <Flag type="slide" /> : feed.slides[0].type === 'VIDEO' ? <Flag type="video" /> : null}
    </button>
  )
}

const Flag = React.memo(function Component({ type }) {
  switch (type) {
    case 'slide':
      return <Icon name="copy-alt" className="text-content w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white" />
    case 'video':
      return <Icon name="play" className="text-content w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white" />
  }
})

const FeedSlider = React.memo(function Component({ images, feed, loadImage, opened }) {
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    spacing: 8,
    rtl: true,
    afterChange(s) {
      loadImage(s.details().relativeSlide)
    }
  })

  return (
    <div ref={sliderRef} className="keen-slider" dir="ltr">
      {feed.slides.map((_slide, idx) => (
        <div key={`slide-${idx}`} className="keen-slider__slide flex flex-col">
          <FeedImage src={images[idx]} feed={feed} opened={opened} />
        </div>
      ))}
    </div>
  )
})

const FeedImage = React.memo(function Component({ src, feed, opened }) {
  return src ? (
    <Image
      src={src}
      width={1080}
      height={1080}
      layout="responsive"
      className={opened ? 'rounded-t-md' : 'rounded-md'}
      objectFit="cover"
      alt={feed.caption}
    />
  ) : (
    <div
      className={classNames('flex flex-1 justify-center items-center bg-white', opened ? 'min-h-[16rem] rounded-t-md' : 'min-h-[8rem] rounded-md')}
    >
      <Icon name="spinner" className={classNames('animate-spin text-primary', opened ? 'text-lg' : 'text-base')} />
    </div>
  )
})

export default React.memo(Feed)
