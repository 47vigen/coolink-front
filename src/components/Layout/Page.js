import React from 'react'
import { NextSeo } from 'next-seo'

// ** UI
import Link from '../Tools/Link'
import PageHeader from './Header/PageHeader'
import ThemeColor from '../Tools/ThemeColor'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

// ** Images
import Image from 'next/image'
import CoolinkLogo from '../../../public/images/coolink-logo.svg'

// ** Config
import Seo from '../../config/seo'

function Page({ page, title, children }) {
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
      <ThemeColor page={page}>
        {(themeColor) => (
          <NextSeo
            {...Seo(themeColor || '#F1F1F1')}
            title={title || page.title}
            titleTemplate={title ? `%s | ${page.title}` : page.subTitle ? `%s | ${page.subTitle}` : '%s'}
            description={page.subTitle}
          />
        )}
      </ThemeColor>
      <PageHeader linked page={page} />
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
