import React from 'react'
import Head from 'next/head'

// ** UI
import { rgbToHex } from '../../utils/rgbToHex'

function ThemeColor({ page, children }) {
  const ref = React.useRef()
  const [themeColor, setThemeColor] = React.useState(undefined)

  React.useEffect(() => {
    const color = window.getComputedStyle(ref.current).getPropertyValue('background-color')
    setThemeColor(rgbToHex(color))
  }, [ref?.current?.className])

  return (
    <>
      <Head>
        <style>
          {themeColor
            ? `
          #nprogress .bar {
            background: ${themeColor} !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px ${themeColor}, 0 0 5px ${themeColor} !important;
          }
          #nprogress .spinner-icon {
            border-top-color: ${themeColor} !important;
            border-left-color: ${themeColor} !important;
          }
        `
            : null}
        </style>
      </Head>
      {children(themeColor)}
      <span ref={ref} className={`sr-only bg-${page?.style?.customize?.color}`} />
    </>
  )
}

export default ThemeColor
