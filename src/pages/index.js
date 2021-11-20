import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '../context/auth'
import Seo from '../components/Tools/Seo'

// ** UI
import Layout from '../components/Layout'
import { Button, Icon, Link } from '../components/Tools'

// ** Utils
import classNames from '../utils/classNames'

// ** Slider
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 1,
    spacing: 32,
    rtl: true,
    loop: true,
    breakpoints: {
      '(min-width: 640px)': {
        slidesPerView: 1.3
      },
      '(min-width: 768px)': {
        slidesPerView: 2
      },
      '(min-width: 1024px)': {
        slidesPerView: 3
      }
    }
  })

  const handleRouteChange = React.useCallback(() => {
    slider?.refresh()
  }, [slider])

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [slider, handleRouteChange, router.events])

  return user?.id ? (
    <Layout className="space-y-8">
      <Seo title="معرف، خودت باش!" />
      <section
        className="p-8 !mt-0 rounded-2xl bg-primary bg-cover bg-right lg:flex min-h-[26rem] lg:min-h-[29rem]"
        style={{ backgroundImage: "url('/images/slide-bg.svg')" }}
      >
        <div className="space-y-4 text-white lg:w-1/3">
          <h1 className="font-bold text-6xl">
            معرف، <br /> خودت باش!
          </h1>
          <p>
            کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ... در
            اختیار کاربران قرار می‌دهد.
          </p>
          <Button type="black" icon="link">
            ایجاد کولینک
          </Button>
        </div>
        <div className="flex-1 relative mt-8 lg:mt-0">
          <div className="absolute -end-4 lg:end-8 w-[12rem] lg:w-[19rem] h-[21rem] lg:h-[33rem] bg-white rounded-2xl transform rotate-[-9deg] shadow-2xl"></div>
          <div className="absolute end-36 lg:end-60 w-[12rem] lg:w-[19rem] h-[21rem] lg:h-[33rem] bg-white rounded-2xl transform rotate-2 shadow-2xl"></div>
        </div>
      </section>
      <div className="h-[18rem] !mt-0 lg:hidden" />
      <Link href="#more" className="hidden lg:!flex !mt-4 !mb-24 items-center">
        <Icon name="arrow-small-down" className="animate-small-bounce mx-2 text-lg" />
        اطلاعات بیشتر
      </Link>
      <section id="more" className="grid grid-cols-1 lg:grid-cols-2 gap-8 cards">
        <div className="relative flex overflow-hidden bg-white p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="w-3/4 lg:w-2/3 space-y-2">
            <h3 className="font-bold text-2xl">کول‌کارت</h3>
            <p>
              کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
              در اختیار کاربران قرار می‌دهد.
            </p>
            <Link href="#more" className="inline-flex items-center text-primary hover:!text-content">
              <Icon name="arrow-small-left" className="me-2" />
              اطلاعات بیشتر
            </Link>
          </div>
          <div className="absolute top-8 lg:top-4 -end-48 lg:-end-36 w-96 transform rotate-[55deg] lg:rotate-[50deg]">
            <div className="coolcard-slider">
              <div />
            </div>
            <div className="coolcard-slider reverse">
              <div />
            </div>
            <div className="coolcard-slider">
              <div />
            </div>
            <div className="coolcard-slider reverse">
              <div />
            </div>
          </div>
        </div>
        <div className="relative flex space-s-2 overflow-hidden bg-white p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="w-3/4 lg:w-2/3 space-y-2">
            <h3 className="font-bold text-2xl">آموزش ساخت کولینک</h3>
            <p>
              کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
              در اختیار کاربران قرار می‌دهد.
            </p>
            <Link href="#more" className="inline-flex items-center text-primary hover:!text-content">
              <Icon name="arrow-small-left" className="me-2" />
              اطلاعات بیشتر
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <svg width="115" height="105" viewBox="0 0 115 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M70.4878 3.94158L70.5079 3.95362L70.5291 3.96372L105.547 20.6464C105.549 20.647 105.55 20.6477 105.551 20.6484C110.303 23.0245 114.53 28.0328 114.5 33.3537V33.3565V90.3565C114.5 92.7037 112.597 94.6064 110.25 94.6064C107.903 94.6064 106 92.7037 106 90.3565V51.1786V50.3854L105.285 50.7275L95.7846 55.2685L95.5003 55.4045V55.7197V79.0277C95.4946 89.2147 88.8672 98.2151 79.1416 101.245C72.2733 103.223 65.153 104.187 58.0058 104.107L57.9951 104.107C50.8468 104.179 43.7263 103.207 36.8591 101.221C27.1333 98.1912 20.5058 89.191 20.5001 79.0039V55.7292V55.4136L20.2152 55.2778L10.4554 50.628C7.65168 49.1178 5.32747 46.8518 3.74677 44.0871L3.31341 44.3348L3.74676 44.0871C-0.922421 35.9211 1.91248 25.5161 10.0785 20.8469L10.0785 20.8469L10.085 20.8431C10.1965 20.7771 10.3202 20.7128 10.449 20.6483L45.8652 3.74984L45.8824 3.74164L45.899 3.73214C53.5297 -0.651146 62.9329 -0.571073 70.4878 3.94158ZM76.6623 93.1079L76.6624 93.1081L76.675 93.1041C82.8218 91.1712 87.0024 85.4716 87 79.028C87 79.0279 87 79.0278 87 79.0278V60.2558V59.4628L86.2844 59.8047L70.1298 67.5237L70.1101 67.5332L70.0912 67.5443C66.4632 69.6858 62.3211 70.8012 58.1082 70.7713L58.1034 70.7713C53.6724 70.7824 49.3211 69.5936 45.5111 67.3312L45.4914 67.3195L45.4708 67.3097L29.715 59.8046L29 59.4641V60.2561V79.0278C29 79.0278 29 79.0279 29 79.028C28.9975 85.4716 33.1782 91.171 39.325 93.1041L39.3249 93.1043L39.3376 93.1079C45.4043 94.8414 51.6908 95.683 58 95.6067C64.3091 95.683 70.5957 94.8414 76.6623 93.1079ZM101.915 42.9516L101.941 42.9394L101.965 42.9245C104.479 41.3555 106.005 38.5995 106 35.6359L106 35.6308C105.963 32.5051 104.253 29.6395 101.52 28.122L101.506 28.1145L101.492 28.1078L66.49 11.4326C61.4249 8.31969 55.0598 8.23637 49.9147 11.2161L14.3315 28.2124L14.3148 28.2204L14.2988 28.2296C12.9148 29.0214 11.78 30.1847 11.0232 31.5882C8.78532 35.738 10.3354 40.9163 14.4854 43.1542L14.4965 43.1602L14.508 43.1656L49.5336 59.8264C54.5971 62.9455 60.9656 63.0291 66.1093 60.0428L101.915 42.9516Z"
                stroke="#2D2D2D"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="md:flex">
        <div className="space-y-2 lg:w-1/3 mb-8 lg:mb-0 me-8">
          <h3 className="font-bold text-2xl">امکانات</h3>
          <p>
            کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ... در
            اختیار کاربران قرار می‌دهد.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex space-s-2 items-start">
            <div className="relative w-10">
              <svg viewBox="0 0 99 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M95.3 39.6C101.7 60.2 96.7 83.8 81.2 95.8C65.6 107.8 39.5 108.2 22.1 95.8C4.8 83.4 -3.7 58.1 2.9 37.3C9.5 16.6 31.3 0.399998 51.1 0.999998C70.9 1.6 88.8 19.1 95.3 39.6Z"
                  fill="#05C46B"
                />
              </svg>
              <Icon name="palette" className="text-white text-2xl absolute inset-0 flex items-center justify-center" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold my-2">شخصی سازی</h3>
              <p>
                کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
                در اختیار کاربران قرار می‌دهد.
              </p>
            </div>
          </div>
          <div className="flex space-s-2 items-start">
            <div className="relative w-10">
              <svg viewBox="0 0 99 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M95.3 39.6C101.7 60.2 96.7 83.8 81.2 95.8C65.6 107.8 39.5 108.2 22.1 95.8C4.8 83.4 -3.7 58.1 2.9 37.3C9.5 16.6 31.3 0.399998 51.1 0.999998C70.9 1.6 88.8 19.1 95.3 39.6Z"
                  fill="#05C46B"
                />
              </svg>
              <Icon name="palette" className="text-white text-2xl absolute inset-0 flex items-center justify-center" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold my-2">شخصی سازی</h3>
              <p>
                کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
                در اختیار کاربران قرار می‌دهد.
              </p>
            </div>
          </div>
          <div className="flex space-s-2 items-start">
            <div className="relative w-10">
              <svg viewBox="0 0 99 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M95.3 39.6C101.7 60.2 96.7 83.8 81.2 95.8C65.6 107.8 39.5 108.2 22.1 95.8C4.8 83.4 -3.7 58.1 2.9 37.3C9.5 16.6 31.3 0.399998 51.1 0.999998C70.9 1.6 88.8 19.1 95.3 39.6Z"
                  fill="#05C46B"
                />
              </svg>
              <Icon name="palette" className="text-white text-2xl absolute inset-0 flex items-center justify-center" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold my-2">شخصی سازی</h3>
              <p>
                کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
                در اختیار کاربران قرار می‌دهد.
              </p>
            </div>
          </div>
          <div className="flex space-s-2 items-start">
            <div className="relative w-10">
              <svg viewBox="0 0 99 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M95.3 39.6C101.7 60.2 96.7 83.8 81.2 95.8C65.6 107.8 39.5 108.2 22.1 95.8C4.8 83.4 -3.7 58.1 2.9 37.3C9.5 16.6 31.3 0.399998 51.1 0.999998C70.9 1.6 88.8 19.1 95.3 39.6Z"
                  fill="#05C46B"
                />
              </svg>
              <Icon name="palette" className="text-white text-2xl absolute inset-0 flex items-center justify-center" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold my-2">شخصی سازی</h3>
              <p>
                کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ...
                در اختیار کاربران قرار می‌دهد.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-content text-white text-center space-y-2 p-4 rounded-2xl max-h-72 lg:max-h-44">
        <h3 className="font-bold text-2xl">چه کسانی از کولینک استفاده می‌کنند؟</h3>
        <p>
          کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ... در
          اختیار کاربران قرار می‌دهد.
        </p>
        <div className="flex pt-4 -mx-4">
          <Icon name="angle-right" onClick={() => slider.prev()} className="w-8 cursor-pointer max-h-24 flex items-center justify-center" />
          <div className="flex-1 max-w-[80vw] lg:max-w-none">
            <div ref={sliderRef} className="keen-slider" dir="ltr">
              <div className="keen-slider__slide bg-white text-content text-end rounded-2xl p-4" dir="rtl">
                <div className="flex items-stretch space-s-2">
                  <div className="w-1 bg-gradient-to-b from-[#FCC201] to-[#DBA514] rounded-full me-2" />
                  <Image src="/images/vigen.jpg" width={64} height={64} alt="vigen" className="rounded-lg" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="font-bold">عرفان پویا فرد</h5>
                    <h6 className="text-[#FCC201]">حامی طلایی</h6>
                  </div>
                </div>
                <div className="my-2 py-2 border-t border-b border-line flex items-center">
                  <Icon name="angle-small-left" className="text-[#FCC201] me-2" />
                  برنامه نویس فرانت اند
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="link" />
                  colk.ir/47vigen
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="brand-instagram" />
                  47vigen@
                </div>
              </div>
              <div className="keen-slider__slide bg-white text-content text-end rounded-2xl p-4" dir="rtl">
                <div className="flex items-stretch space-s-2">
                  <div className="w-1 bg-gradient-to-b from-[#FCC201] to-[#DBA514] rounded-full me-2" />
                  <Image src="/images/vigen.jpg" width={64} height={64} alt="vigen" className="rounded-lg" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="font-bold">عرفان پویا فرد</h5>
                    <h6 className="text-[#FCC201]">حامی طلایی</h6>
                  </div>
                </div>
                <div className="my-2 py-2 border-t border-b border-line flex items-center">
                  <Icon name="angle-small-left" className="text-[#FCC201] me-2" />
                  برنامه نویس فرانت اند
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="link" />
                  colk.ir/47vigen
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="brand-instagram" />
                  47vigen@
                </div>
              </div>
              <div className="keen-slider__slide bg-white text-content text-end rounded-2xl p-4" dir="rtl">
                <div className="flex items-stretch space-s-2">
                  <div className="w-1 bg-gradient-to-b from-[#FCC201] to-[#DBA514] rounded-full me-2" />
                  <Image src="/images/vigen.jpg" width={64} height={64} alt="vigen" className="rounded-lg" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="font-bold">عرفان پویا فرد</h5>
                    <h6 className="text-[#FCC201]">حامی طلایی</h6>
                  </div>
                </div>
                <div className="my-2 py-2 border-t border-b border-line flex items-center">
                  <Icon name="angle-small-left" className="text-[#FCC201] me-2" />
                  برنامه نویس فرانت اند
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="link" />
                  colk.ir/47vigen
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="brand-instagram" />
                  47vigen@
                </div>
              </div>
              <div className="keen-slider__slide bg-white text-content text-end rounded-2xl p-4" dir="rtl">
                <div className="flex items-stretch space-s-2">
                  <div className="w-1 bg-gradient-to-b from-[#FCC201] to-[#DBA514] rounded-full me-2" />
                  <Image src="/images/vigen.jpg" width={64} height={64} alt="vigen" className="rounded-lg" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="font-bold">عرفان پویا فرد</h5>
                    <h6 className="text-[#FCC201]">حامی طلایی</h6>
                  </div>
                </div>
                <div className="my-2 py-2 border-t border-b border-line flex items-center">
                  <Icon name="angle-small-left" className="text-[#FCC201] me-2" />
                  برنامه نویس فرانت اند
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="link" />
                  colk.ir/47vigen
                </div>
                <div className="flex items-center justify-between">
                  <Icon name="brand-instagram" />
                  47vigen@
                </div>
              </div>
            </div>
          </div>
          <Icon name="angle-left" onClick={() => slider.next()} className="w-8 cursor-pointer max-h-24 flex items-center justify-center" />
        </div>
      </section>
      <div className="h-28" />
    </Layout>
  ) : (
    <div className="flex-1 flex justify-center items-center text-xs">
      <Seo title="بزودی ..." />
      <h1 className="text-primary font-bold text-5xl ml-4" dir="ltr">
        Soon!
      </h1>
      <div className="flex items-center space-s-2 border-r border-line pr-4">
        <Icon name="spinner" className="animate-spin origin-center" />
        <h2>بزودی میبینیمتون ..!</h2>
      </div>
    </div>
  )
}

export default Home
