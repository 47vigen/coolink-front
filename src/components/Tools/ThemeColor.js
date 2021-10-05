import React from 'react'
import Head from 'next/head'

// ** UI
import { rgbToHex } from '../../utils/rgbToHex'

function ThemeColor({ page, children }) {
  const [themeColor, setThemeColor] = React.useState('')

  React.useEffect(() => {
    const colorComponent = document.getElementById('color')
    const color = window.getComputedStyle(colorComponent).getPropertyValue('background-color')
    setThemeColor(rgbToHex(color))
  }, [])

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
      <span id="color" className={`sr-only bg-${page?.style?.customize?.color}`} />
    </>
  )
}

export default ThemeColor
