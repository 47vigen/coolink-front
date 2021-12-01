import React from 'react'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

// ** UI
import { Button } from '../Tools'
import FeedImage from './FeedImage'

const FeedSlider = ({ feed, customize }) => {
  const [slide, setSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    rtl: true,
    slides: {
      perView: 1,
      spacing: 8
    },
    slideChanged(s) {
      setSlide(s.track.details.rel)
    }
  })

  if (feed.slides?.length <= 1) {
    return <FeedImage opened idx={0} feed={feed} className={`bg-${customize.color || 'white'}`} />
  }

  return (
    <div ref={sliderRef} className="group keen-slider" dir="ltr">
      {feed.slides.map((_slide, idx) => (
        <div key={`slide-${idx}`} className="keen-slider__slide flex flex-col">
          <FeedImage opened idx={idx} feed={feed} className={`bg-${customize.color || 'white'}`} />
        </div>
      ))}
      {slider.current && (
        <>
          <span className="flex items-center justify-center absolute left-2 top-2 w-[1.375rem] h-[1.375rem] rounded-full bg-white text-xs">
            {slide + 1}
          </span>
          <Button
            circle
            type="ghost"
            icon="angle-small-right"
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 transform -translate-y-1/2 right-2 !p-1 !min-h-0"
            onClick={(e) => e.stopPropagation() || slider.current?.prev()}
            disabled={slide === 0}
          />
          <Button
            circle
            type="ghost"
            icon="angle-small-left"
            className="opacity-0 group-hover:opacity-100 absolute top-1/2 transform -translate-y-1/2 left-2 !p-1 !min-h-0"
            onClick={(e) => e.stopPropagation() || slider.current?.next()}
            disabled={slide === slider.current?.track.details.slides.length - 1}
          />
        </>
      )}
    </div>
  )
}

export default React.memo(FeedSlider)
