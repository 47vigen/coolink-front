// import React from 'react'
// import { useAuth } from '../context/auth'
// // import { useKeenSlider } from 'keen-slider/react'
// // import 'keen-slider/keen-slider.min.css'

// // ** UI
// import Layout from '../components/Layout'
// import { Button, Icon } from '../components/Tools'

// // ** Utils
// import classNames from '../utils/classNames'

// export default function Home() {
//   const { user } = useAuth()

//   // const [sliderRef, slider] = useKeenSlider({
//   //   slidesPerView: 1,
//   //   spacing: 16,
//   //   loop: true,
//   //   rtl: true,
//   //   breakpoints: {
//   //     '(min-width: 640px)': {
//   //       slidesPerView: 2
//   //     },
//   //     '(min-width: 768px)': {
//   //       slidesPerView: 3
//   //     },
//   //     '(min-width: 1024px)': {
//   //       slidesPerView: 4
//   //     },
//   //     '(min-width: 1280px)': {
//   //       slidesPerView: 5
//   //     }
//   //   }
//   // })

//   return (
//     <Layout>
//       <section className="flex flex-col text-center">
//         <div className="flex flex-col items-center space-y-2 mt-4">
//           <h1 className="text-primary font-bold text-2xl">لینکاتو باحال کن !</h1>
//           <Button link={user.id ? '/dashboard/create' : '/sign-up?ref=/dashboard/create'} bordered className="w-max py-1 px-4">
//             ایجاد رایگان اکانت کولینک
//           </Button>
//         </div>
//       </section>
//       <section className="flex items-center">
//         <div className="flex-1 ">
//           <Option icon="link" title="بی نهایت لینک در بیو اینستاگرامتان داشته باشید">
//             باتوجه به محدودیت اینستاگرام در قرار دادن لینک در بیو با استفاده از کولینک شما می توانید بی نهایت لینک در بیو اینستاگرام خود قرار دهید
//           </Option>
//           <Option icon="edit-alt" title="طراحی اختصاصی">
//             شما می توانید صفحه اختصاصی خود را به طور دلخواه سفارشی سازی کنید و از امکانات بی نظیر کولینک لذت ببرید. همچنین کاربران را با صفحه شیک و
//             خاص خود مجذوب کنید.
//           </Option>
//         </div>
//         <div className="w-2/4 my-7">
//           <div className="hidden md:!block w-80 h-full rounded-3xl border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md mx-auto p-2">
//             <div className="relative h-full rounded-2xl overflow-hidden">
//               <img src="./images/above-phone-sharp.svg" className="absolute top-0 w-full h-6 z-10" />
//               <div className="absolute flex top-2 w-full z-10 justify-center">
//                 <div className="w-20 h-2 rounded-full border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md "></div>
//                 <div className="w-2 h-2 rounded-full border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md ms-2 "></div>
//               </div>
//               <div className="mt-6">
//                 <img src="./images/direct-instagram.jpg" className="w-full" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 ">
//           <Option icon="download" title="پست های خود را برای دانلود به اشتراک بگذارید" left>
//             کاربران به طور مستقیم نمی توانند پست های اینستاگرام را دانلود کنند. با کولینک شما می توانید کلیه پست های خود را برای دانلود در دسترس
//             مخاطبانتان قرار دهید.
//           </Option>
//           <Option icon="comment" title="شبکه های اجتماعی" left>
//             با استفاده از کولینک می توانید کلیه شبکه های اجتماعی و راه های ارتباطی خود را با کاربران به اشتراک بگذارید و به راحتی کاربران را بین تمام
//             کانال های ارتباطی خود به گردش در بیاورید
//           </Option>
//         </div>
//       </section>
//       {/* <section>
//         <h2 className="font-bold">نظرات کاربران کولینک</h2>
//         <div className="border-t border-line my-3 pb-3">
//           <div ref={sliderRef} className="keen-slider" dir="ltr">
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//           </div>
//           <div className="flex justify-between">
//             <Button type="secondary" onClick={(e) => e.stopPropagation() || slider.prev()}>
//               <Icon name="angle-right" />
//             </Button>
//             <Button type="secondary" onClick={(e) => e.stopPropagation() || slider.next()}>
//               <Icon name="angle-left" />
//             </Button>
//           </div>
//         </div>
//       </section> */}
//     </Layout>
//   )
// }

// const Option = ({ children, icon, title, left }) => {
//   return (
//     <div className={classNames('flex flex-col space-y-1 mb-4', left ? 'items-end' : 'items-start')}>
//       <Button type="secondary" className="w-max">
//         <Icon name={icon} />
//       </Button>
//       <h5 className="font-bold">{title}</h5>
//       <p className={classNames(left ? 'text-end' : 'text-start')}>{children}</p>
//     </div>
//   )
// }

// // const Comment = () => {
// //   return (
// //     <div className="keen-slider__slide">
// //       <article className=" flex flex-col my-6" dir="rtl">
// //         <div className="flex flex-row items-center">
// //           <img src="./images/vigen.jpg" className="w-12 h-auto rounded-lg me-2" />
// //           <div className="flex flex-col flex-1">
// //             <span>مهدی فراهانی</span>
// //             <span className="text-line">@mahtifarahani</span>
// //           </div>
// //         </div>
// //         <p className="border border-line rounded-lg p-2 mt-2">
// //           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
// //           سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در
// //         </p>
// //       </article>
// //     </div>
// //   )
// // }

import React from 'react'
import { NextSeo } from 'next-seo'

// ** UI
import { Icon } from '../components/Tools'

function Soon(props) {
  return (
    <div className="flex-1 flex justify-center items-center text-xs">
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

export default Soon
