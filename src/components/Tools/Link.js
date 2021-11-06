import React from 'react'
import NextLink from 'next/link'
import classNames from '../../utils/classNames'

function Link({ children, href, className, style, replace }) {
  return (
    <NextLink replace={replace} href={href}>
      <a style={style} className={classNames('relative cursor-pointer hover:text-primary transition ease-in-out duration-200', className)}>
        {children}
      </a>
    </NextLink>
  )
}

export function SimpleLink({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default React.memo(Link)
