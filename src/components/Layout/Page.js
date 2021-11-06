import React from 'react'
import Seo from '../Tools/Seo'

// ** UI
import Link from '../Tools/Link'
import PageHeader from './Header/PageHeader'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

function Page({ page, title, children }) {
  const logo = React.useMemo(() => {
    const code = page.style?.background?.color ? Number(page.style?.background?.color.split('-').pop()) : 50
    return code >= 500 ? { svg: '#FFFFFF', class: 'border-white' } : { svg: '#2D2D2D', class: 'border-content' }
  }, [page.style?.background?.color])

  return (
    <div
      className={classNames(
        'w-full max-w-md lg:my-4 lg:rounded-xl mx-auto flex-1 flex flex-col p-4 overflow-hidden',
        page.style?.background?.color ? `bg-${page.style.background.color} bg-cover bg-top` : ''
      )}
      style={{
        backgroundImage: page.style?.background?.url ? `url('${getImgSrc(page.style.background.url)}')` : null
      }}
    >
      <Seo page={page} title={title || page.subTitle} titleTemplate={`%s | ${page.title}`} description={page.subTitle} />
      <PageHeader linked page={page} />
      <main className="flex-1 container max-w-md mx-auto">{children}</main>
      <footer>
        <Link
          href="/"
          className={classNames('block w-20 p-1 mx-auto rounded-md border border-opacity-50', logo.class)}
          dangerouslySetInnerHTML={{
            __html: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 159.9 21.1" style="enable-background:new 0 0 159.9 21.1;" xml:space="preserve"> <style type="text/css"> 
            .st0{fill:#05C46B;}.st1{fill:${logo.svg};}</style> <g id="Group_51" transform="translate(-186.113 -122.403)"> <g id="Group_44" transform="translate(186.113 122.671)"> <path id="Path_19" class="st0" d="M4.7,14.2V6.6c0-0.8,0.7-1.5,1.5-1.5h9.5c0.8,0,1.5,0.7,1.5,1.5V12H21V6.6c0-0.5-0.1-1-0.2-1.5 c-0.7-2.2-2.7-3.7-5-3.7H6.2C3.3,1.3,1,3.7,1,6.6v7.6c0,2.8,2.3,5.2,5.1,5.2H8v-3.7H6.1C5.3,15.7,4.7,15,4.7,14.2z"/> <path id="Path_20" class="st0" d="M24.7,1.3h-1.9v3.7h1.9c0.8,0.1,1.4,0.7,1.4,1.5v7.6c0,0.8-0.7,1.5-1.5,1.5H15 c-0.8,0-1.5-0.7-1.5-1.5c0,0,0,0,0,0V8.8H9.8v5.6c0,0.5,0.1,0.9,0.2,1.4c0.7,2.2,2.7,3.7,5,3.7h9.5c2.9,0,5.2-2.3,5.2-5.2V6.6 C29.8,3.7,27.5,1.4,24.7,1.3z"/> </g> <g id="Group_45" transform="translate(218.675 122.667)"> <path id="Path_21" class="st1" d="M19.1,19.5H6.2c-2.9,0-5.2-2.3-5.2-5.2V6.6c0-2.9,2.3-5.2,5.2-5.2h12.9v3.7H6.2 c-0.8,0-1.5,0.7-1.5,1.5v7.6c0,0.8,0.7,1.5,1.5,1.5h12.9V19.5z"/> </g> <g id="Group_46" transform="translate(303.409 122.66)"> <path id="Path_22" class="st1" d="M1,19.5V6.6c0-2.9,2.3-5.2,5.2-5.2h7.6c2.9,0,5.2,2.3,5.2,5.2v12.9h-3.7V6.6 c0-0.8-0.7-1.5-1.5-1.5H6.2c-0.8,0-1.5,0.7-1.5,1.5v12.9H1z"/> </g> <g id="Group_47" transform="translate(295.971 130.091)"> <rect id="Rectangle_339" x="1" y="1.3" class="st1" width="3.7" height="10.7"/> </g>
             <g id="Group_48" transform="translate(287.963 122.652)"> <rect id="Rectangle_340" x="1" y="1.3" class="st1" width="3.7" height="18.1"/> </g> <g id="Group_49" transform="translate(240.531 122.652)"> <path id="Path_23" class="st1" d="M15.7,19.5H6.2c-2.9,0-5.2-2.3-5.2-5.2V6.6c0-2.9,2.3-5.2,5.2-5.2h9.5c2.9,0,5.2,2.3,5.2,5.2 v7.6C21,17.1,18.6,19.5,15.7,19.5z M6.2,5.1c-0.8,0-1.5,0.7-1.5,1.5v7.6c0,0.8,0.7,1.5,1.5,1.5h9.5c0.8,0,1.5-0.7,1.5-1.5V6.6 c0-0.8-0.7-1.5-1.5-1.5L6.2,5.1z"/> </g> <g id="Group_50" transform="translate(264.247 122.652)"> <path id="Path_24" class="st1" d="M15.7,19.5H6.2c-2.9,0-5.2-2.3-5.2-5.2V6.6c0-2.9,2.3-5.2,5.2-5.2h9.5c2.9,0,5.2,2.3,5.2,5.2 v7.6C21,17.1,18.6,19.5,15.7,19.5z M6.2,5.1c-0.8,0-1.5,0.7-1.5,1.5v7.6c0,0.8,0.7,1.5,1.5,1.5h9.5c0.8,0,1.5-0.7,1.5-1.5V6.6 c0-0.8-0.7-1.5-1.5-1.5L6.2,5.1z"/> </g> <path id="Rectangle_341" class="st1" d="M298.8,124L298.8,124c1,0,1.9,0.8,1.9,1.9l0,0c0,1-0.8,1.9-1.9,1.9l0,0 c-1,0-1.9-0.8-1.9-1.9l0,0C296.9,124.8,297.8,124,298.8,124z"/> <path id="Path_25" class="st1" d="M338.2,130.6L338.2,130.6l6.9-6.9h-5.3l-9.3,9.3l0,0l-0.6,0.6v-9.9h-3.7v18.4h3.7v-3.3l3.2-3.2 l6.4,6.4h5.3l-9.1-9.1L338.2,130.6z"/> </g> </svg>`
          }}
        />
      </footer>
    </div>
  )
}

export default React.memo(Page)
