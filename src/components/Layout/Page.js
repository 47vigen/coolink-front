import React from 'react'

// ** UI
import Link from '../Tools/Link'
import PageHeader from './Header/PageHeader'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'

// ** Images
import Image from 'next/image'
import CoolinkLogo from '../../../public/images/coolink-logo.svg'

function Page({ page, children }) {
  return (
    <div
      className="w-full lg:max-w-md lg:my-4 lg:rounded-xl mx-auto flex-1 flex flex-col p-4"
      style={{
        backgroundImage: page.customize?.backgroundImage ? `url('${getImgSrc(page.customize.backgroundImage)}')` : null
      }}
    >
      <PageHeader page={page} />
      <main className="flex-1 container lg:max-w-md mx-auto">{children}</main>
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
