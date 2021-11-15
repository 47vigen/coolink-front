import React from 'react'
import { NextSeo } from 'next-seo'

// ** UI
import { rgbToHex } from '../../utils/rgbToHex'
import { getImgSrc } from '../../utils/getImgSrc'
import deepCleaner from '../../utils/deepCleaner'

const PRIMARY_COLOR = '#05C46B'

function Seo({ page = null, ...props }) {
  const ref = React.useRef()
  const [themeColor, setThemeColor] = React.useState(undefined)

  const seoConfig = {
    titleTemplate: '%s | کولینک',
    defaultTitle: 'کولینک',
    description: 'لینکاتو باحال کن',
    openGraph: { type: 'website', site_name: 'کولینک' },
    additionalMetaTags: [
      { name: 'application-name', content: 'Coolink' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Coolink' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'theme-color', content: themeColor || PRIMARY_COLOR },
      { name: 'msapplication-navbutton-color', content: themeColor || PRIMARY_COLOR },
      { name: 'apple-mobile-web-app-status-bar-style', content: themeColor || PRIMARY_COLOR },
      { name: 'msapplication-TileColor', content: themeColor || PRIMARY_COLOR },
      {
        name: 'viewport',
        content: 'minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      }
    ],
    additionalLinkTags: [
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'shortcut icon', href: page?.avatar?.url ? getImgSrc(page?.avatar?.url) : '/icons/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', href: page?.avatar?.url ? getImgSrc(page?.avatar?.url) : '/icons/favicon.ico', type: 'image/x-icon' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'preload', href: '/fonts/woff/dana-regular.woff', as: 'font', type: 'font/woff' },
      { rel: 'preload', href: '/fonts/woff/dana-bold.woff', as: 'font', type: 'font/woff' },
      { rel: 'preload', href: '/fonts/ttf/icon.ttf?22ycys', as: 'font', type: 'font/truetype' },
      ...(page ? [{ rel: 'preload', href: 'https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/32.png', as: 'image' }] : [])
    ],
    ...deepCleaner(props)
  }

  React.useEffect(() => {
    if (page?.id) {
      const color = window.getComputedStyle(ref.current).getPropertyValue('background-color')
      setThemeColor(rgbToHex(color))
    }
  }, [page, ref?.current?.className])

  return (
    <>
      <NextSeo {...seoConfig} title={seoConfig.title || seoConfig.defaultTitle} />
      <span ref={ref} className={`!sr-only bg-${page?.style?.customize?.color}`} />
    </>
  )
}

export default React.memo(Seo)
