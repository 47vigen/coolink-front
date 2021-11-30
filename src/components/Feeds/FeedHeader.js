import React from 'react'

// ** UI
import { SimpleLink } from '../Tools/Link'
import { Avatar, Element, Icon, Link } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'
import { useRouter } from 'next/router'

function FeedHeader({ title, page, section, back }) {
  const router = useRouter()
  const custom = React.useCallback((idx) => (section.customized ? section.customize[idx] || {} : {}), [section.customized, section.customize])
  const titles = React.useMemo(
    () => ({ title: page.avatar?.customize?.color || 'content', subTitle: page.avatar?.customize?.second || 'secondary' }),
    [page]
  )

  return (
    <header className="relative z-10 flex items-center container max-w-md mx-auto">
      <Link href={`/${page.slug}`}>
        <Avatar url={page.avatar?.url} className="w-16 h-16" rounded={page.avatar?.customize?.rounded} priority />
      </Link>
      <div className="flex flex-col flex-1 ms-4 truncate">
        <h1 className={classNames('text-lg truncate', `text-${titles.title}`)}>{title || section.items[0].key || 'پست ها'}</h1>
        <span className={classNames('text-base truncate', `text-${titles.subTitle}`)}>{page?.title}</span>
      </div>
      <Element
        href={back}
        tag={SimpleLink}
        className="px-3 self-stretch flex items-center ms-4"
        customize={{ ...page.style.customize, ...custom(0) }}
      >
        <Icon name="angle-left" className="text-base" />
      </Element>
    </header>
  )
}

export default React.memo(FeedHeader)
