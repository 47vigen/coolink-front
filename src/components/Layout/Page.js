import React from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

// ** UI
import Link from '../Tools/Link'
import PageHeader from './Header/PageHeader'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'

// ** Images
import Image from 'next/image'
import CoolinkLogo from '../../../public/images/coolink-logo.svg'

// ** Utils
import classNames from '../../utils/classNames'
import { rgbToHex } from '../../utils/rgbToHex'
import Seo from '../../config/seo'

function Page({ page, title, children }) {
  const [themeColor, setThemeColor] = React.useState({ rgb: undefined, hex: undefined })

  React.useEffect(() => {
    const colorComponent = document.getElementById('color')
    const color = window.getComputedStyle(colorComponent).getPropertyValue('background-color')
    setThemeColor({ rgb: color, hex: rgbToHex(color) })
  }, [])

  return (
    <div
      className={classNames(
        'w-full max-w-md md:my-4 md:rounded-xl mx-auto flex-1 flex flex-col p-4 overflow-hidden',
        page.style?.background?.color ? `bg-${page.style.background.color} bg-cover bg-top` : ''
      )}
      style={{
        backgroundImage: page.style?.background?.url ? `url('${getImgSrc(page.style.background.url)}')` : null
      }}
    >
      <Head>
        <style>
          {themeColor.rgb
            ? `
          #nprogress .bar {
            background: ${themeColor.rgb} !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px ${themeColor.rgb}, 0 0 5px ${themeColor.rgb} !important;
          }
          #nprogress .spinner-icon {
            border-top-color: ${themeColor.rgb} !important;
            border-left-color: ${themeColor.rgb} !important;
          }
        `
            : null}
        </style>
      </Head>
      <NextSeo
        {...Seo(themeColor.hex)}
        title={title || page.title}
        titleTemplate={title ? `%s | ${page.title}` : page.subTitle ? `%s | ${page.subTitle}` : '%s'}
      />
      <PageHeader linked page={page} />
      <span id="color" className={`sr-only bg-${page?.style?.customize?.color}`}></span>
      <main className="flex-1 container max-w-md mx-auto">{children}</main>
      <footer>
        <Link
          href="/"
          className="block w-20 p-1 pb-0.5 mx-auto rounded-lg border border-white border-opacity-60 bg-blured backdrop-filter backdrop-blur-md"
        >
          <Image src={CoolinkLogo} alt="Coolink" />
        </Link>
      </footer>
    </div>
  )
}

export default React.memo(Page)
