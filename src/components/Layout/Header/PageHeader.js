import React from 'react'
import Image from 'next/image'

// ** Utils
import classNames from '../../../utils/classNames'
import { getImgSrc } from '../../../utils/getImgSrc'

// ** UI
import { Link, Icon, Avatar, Element } from '../../Tools'

function PageHeader({ page, linked, onEdit }) {
  const titles = React.useMemo(
    () => ({ title: page.avatar?.customize?.color || 'content', subTitle: page.avatar?.customize?.second || 'line' }),
    [page]
  )

  return (
    <header>
      {page.style?.cover?.url ? (
        <Element
          hoverable={false}
          className={classNames(
            'h-40 -mb-10 rounded-t-none -mt-10 -mx-4 overflow-hidden',
            page.style?.cover?.customize?.rounded === 'full' ? '!rounded-b-[100%]' : '',
            page.style?.cover?.customize?.rounded === 'lg' ? '!rounded-b-3xl' : ''
          )}
          customize={{
            ...page.style?.customize,
            ...page.style?.cover?.customize
          }}
        >
          <Image
            alt="cover"
            width={500}
            height={230}
            objectFit="cover"
            layout="responsive"
            key={page.style.cover.url}
            src={getImgSrc(page.style.cover.url)}
            priority
          />
        </Element>
      ) : null}
      <div
        className={classNames(
          'flex items-center container max-w-md mx-auto',
          page.avatar?.position === 'center' ? 'flex-col items-center' : 'space-s-4'
        )}
      >
        <AvatarSection page={page} linked={linked} onEdit={onEdit} />
        {page.avatar?.position === 'center' ? (
          <>
            <h1 className={classNames('text-lg mt-1', `text-${titles.title}`)}>{page?.title}</h1>
            <span className={classNames('text-base', `text-${titles.subTitle}`)}>{page?.subTitle}</span>
          </>
        ) : (
          <div className="flex flex-col flex-1">
            <h1 className={classNames('text-lg mb-1', `text-${titles.title}`)}>{page?.title}</h1>
            <span className={classNames('text-base', `text-${titles.subTitle}`)}>{page?.subTitle}</span>
          </div>
        )}
      </div>
    </header>
  )
}

const AvatarSection = ({ page, linked, onEdit }) => {
  return (
    <div className="relative w-min">
      {linked ? (
        <Link href={`/${page.slug}`}>
          <Avatar url={page.avatar?.url} className="w-20 h-20" rounded={page.avatar?.customize?.rounded} priority />
        </Link>
      ) : (
        <Avatar url={page.avatar?.url} className="w-20 h-20" rounded={page.avatar?.customize?.rounded} priority />
      )}
      {onEdit ? (
        <button className="absolute bottom-0 left-0 transition duration-300 hover:opacity-60" onClick={onEdit}>
          <Icon name="edit" className="bg-body p-1.5 rounded-ts-md rounded-be-md" />
        </button>
      ) : null}
    </div>
  )
}

export default PageHeader
