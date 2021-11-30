import React from 'react'
import Image from 'next/image'

// ** Utils
import classNames from '../../../utils/classNames'
import { getImgSrc } from '../../../utils/getImgSrc'

// ** UI
import { Link, Icon, Avatar, Element } from '../../Tools'

function PageHeader({ page, linked, onEdit }) {
  const titles = React.useMemo(
    () => ({ title: page.avatar?.customize?.color || 'content', subTitle: page.avatar?.customize?.second || 'secondary' }),
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
          'relative z-10 flex items-center pt-4',
          onEdit ? '' : 'container max-w-md mx-auto',
          page.avatar?.position === 'center' ? 'flex-col' : 'space-s-4'
        )}
      >
        <AvatarSection page={page} linked={linked} onEdit={onEdit} />
        {page.avatar?.position === 'center' ? (
          <>
            <h1 className={classNames('text-xl mt-2', `text-${titles.title}`)}>{page?.title}</h1>
            <span className={classNames('text-lg', `text-${titles.subTitle}`)}>{page?.subTitle}</span>
          </>
        ) : (
          <div className="flex flex-col justify-between flex-1 min-h-[3.5rem]">
            <h1 className={classNames('text-xl', `text-${titles.title}`)}>{page?.title}</h1>
            <span className={classNames('text-lg', `text-${titles.subTitle}`)}>{page?.subTitle}</span>
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
          <Avatar
            url={page.avatar?.url}
            className={classNames(page.avatar?.position === 'center' ? 'w-24 h-24' : 'w-[5.5rem] h-[5.5rem]')}
            rounded={page.avatar?.customize?.rounded}
            priority
          />
        </Link>
      ) : (
        <Avatar
          url={page.avatar?.url}
          className={classNames(page.avatar?.position === 'center' ? 'w-24 h-24' : 'w-[5.5rem] h-[5.5rem]')}
          rounded={page.avatar?.customize?.rounded}
          priority
        />
      )}
      {onEdit ? (
        <button className="absolute bottom-0 left-0 transition duration-300 hover:opacity-60" onClick={onEdit}>
          <Icon name="edit" className="bg-white p-1.5 rounded-md rounded-be-md" />
        </button>
      ) : null}
    </div>
  )
}

export default React.memo(PageHeader)
