import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

// ** UI
import Layout from '../components/Layout'
import { Button, Icon } from '../components/Tools'

// ** Utils
import classNames from '../utils/classNames'

export default function Home() {
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    spacing: 16,
    loop: true,
    rtl: true,
    breakpoints: {
      '(min-width: 640px)': {
        slidesPerView: 2
      },
      '(min-width: 768px)': {
        slidesPerView: 3
      },
      '(min-width: 1024px)': {
        slidesPerView: 4
      },
      '(min-width: 1280px)': {
        slidesPerView: 5
      }
    }
  })

  return (
    <Layout>
      <section className="flex flex-col text-center">
        <div className="flex flex-col items-center space-y-2 mt-4">
          <h1 className="text-primary font-bold text-2xl">لینکاتو باحال کن !</h1>
          <Button bordered className="w-max py-1 px-4">
            ایجاد رایگان اکانت کولینک
          </Button>
        </div>
      </section>
      <section className="flex items-center">
        <div className="flex-1 ">
          <Option icon="alarm-clock" title="لورم ایپسوم">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
          </Option>
          <Option icon="alarm-clock" title="لورم ایپسوم">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
          </Option>
        </div>
        <div className="w-2/4 my-7">
          <div className="hidden md:!block w-80 h-full rounded-3xl border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md mx-auto p-2">
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img src="./images/above-phone-sharp.svg" className="absolute top-0 w-full h-6 z-10" />
              <div className="absolute flex top-2 w-full z-10 justify-center">
                <div className="w-20 h-2 rounded-full border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md "></div>
                <div className="w-2 h-2 rounded-full border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md ms-2 "></div>
              </div>
              <div className="mt-6">
                <img src="./images/direct-instagram.jpg" className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <Option icon="alarm-clock" title="لورم ایپسوم" left>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
          </Option>
          <Option icon="alarm-clock" title="لورم ایپسوم" left>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
          </Option>
        </div>
      </section>
      <section>
        <h2 className="font-bold">نظرات کاربران کولینک</h2>
        <div className="border-t border-line my-3 pb-3">
          <div ref={sliderRef} className="keen-slider" dir="ltr">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
          <div className="flex justify-between">
            <Button type="secondary" onClick={(e) => e.stopPropagation() || slider.prev()}>
              <Icon name="angle-right" />
            </Button>
            <Button type="secondary" onClick={(e) => e.stopPropagation() || slider.next()}>
              <Icon name="angle-left" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const Option = ({ children, icon, title, left }) => {
  return (
    <div className={classNames('flex flex-col space-y-1 mb-4', left ? 'items-end' : 'items-start')}>
      <Button type="secondary" className="w-max">
        <Icon name={icon} />
      </Button>
      <h5 className="font-bold">{title}</h5>
      <p className={classNames(left ? 'text-end' : 'text-start')}>{children}</p>
    </div>
  )
}

const Comment = () => {
  return (
    <div className="keen-slider__slide">
      <article className=" flex flex-col my-6" dir="rtl">
        <div className="flex flex-row items-center">
          <img src="./images/vigen.jpg" className="w-12 h-auto rounded-lg me-2" />
          <div className="flex flex-col flex-1">
            <span>مهدی فراهانی</span>
            <span className="text-line">@mahtifarahani</span>
          </div>
        </div>
        <p className="border border-line rounded-lg p-2 mt-2">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در
        </p>
      </article>
    </div>
  )
}
