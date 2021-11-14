import React from 'react'
import { useRouter } from 'next/router'

// ** UI
import { Link } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function MenuItem({ pathname = '', label = '', children, soon = false, notInclude = false }) {
  const router = useRouter()
  const active = React.useMemo(
    () => (notInclude ? pathname === router.pathname : router.pathname.includes(pathname)),
    [notInclude, pathname, router.pathname]
  )

  return !soon ? (
    <Link
      href={pathname}
      className={classNames(
        'group flex items-baseline',
        active ? '!text-content hover:!text-content hover:!opacity-70' : '!text-secondary hover:!text-content'
      )}
    >
      {typeof children === 'function' ? children({ active }) : children}
      <h6 className="hidden lg:!block">{label}</h6>
    </Link>
  ) : (
    <div
      className={classNames(
        'relative group flex items-baseline cursor-pointer transition ease-in-out duration-200',
        active ? '!text-content hover:!text-content hover:!opacity-70' : '!text-secondary hover:!text-content'
      )}
    >
      {typeof children === 'function' ? children({ active }) : children}
      <h6 className="hidden lg:!block">{label}</h6>
    </div>
  )
}

export default React.memo(MenuItem)
