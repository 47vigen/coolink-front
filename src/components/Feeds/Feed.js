import React from 'react'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

// ** UI
import { Button, Icon } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'

function Feed({ feed, opened, onOpen, children, customize }) {
  return opened ? (
    <div className="col-span-3 relative">
      {feed.slides.length > 1 ? <FeedSlider feed={feed} customize={customize} opened /> : <FeedImage feed={feed} customize={customize} opened />}
      <div className={classNames('rounded-b-md p-4 space-y-2', `bg-${customize.color || 'white'}`)}>
        {typeof children === 'function' ? children(feed) : children}
      </div>
    </div>
  ) : (
    <button className="block w-full h-full relative" onClick={onOpen}>
      <FeedImage feed={feed} customize={customize} />
      {feed.slides.length > 1 ? <Flag type="slide" /> : feed.slides[0].type === 'video' ? <Flag type="video" /> : null}
    </button>
  )
}

const Flag = React.memo(function Component({ type }) {
  switch (type) {
    case 'slide':
      return <Icon name="copy-alt" className="w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white text-content" />
    case 'video':
      return <Icon name="play" className="w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white text-content" />
  }
})

const FeedSlider = React.memo(function Component({ feed, customize, opened }) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    spacing: 8,
    rtl: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    }
  })

  return (
    <div ref={sliderRef} className="keen-slider" dir="ltr">
      {feed.slides.map((_slide, idx) => (
        <div key={`slide-${idx}`} className="keen-slider__slide flex flex-col">
          <FeedImage idx={idx} feed={feed} customize={customize} opened={opened} />
        </div>
      ))}
      {slider && (
        <>
          <span className="flex items-center justify-center absolute left-2 top-2 w-[1.375rem] h-[1.375rem] rounded-full bg-white text-xs">
            {currentSlide + 1}
          </span>
          <Button
            circle
            type="ghost"
            icon="angle-small-right"
            className="absolute top-1/2 transform -translate-y-1/2 right-2 !p-1 !min-h-0"
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <Button
            circle
            type="ghost"
            icon="angle-small-left"
            className="absolute top-1/2 transform -translate-y-1/2 left-2 !p-1 !min-h-0"
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
    </div>
  )
})

const FeedImage = React.memo(function Component({ idx, feed, opened, customize }) {
  const src = React.useMemo(() => getImgSrc(feed.slides[idx || 0].imageUrl), [idx, feed.slides])

  return (
    <Image
      src={src}
      width={opened ? 768 : 250}
      height={opened ? 768 : 250}
      layout="responsive"
      className={classNames(`bg-${customize.color || 'white'}`, opened ? 'rounded-t-md' : 'rounded-md')}
      objectFit="cover"
      alt={feed.caption}
      loading="lazy"
    />
  )
})

export default React.memo(Feed)
