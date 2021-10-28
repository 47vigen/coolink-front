import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

// ** UI
import Icon from './Icon'

// ** Utils
import classNames from '../../utils/classNames'

function Button({
  children,
  type,
  bordered,
  circle,
  onClick,
  htmlType,
  link,
  loading,
  className,
  autoLoading,
  roundless,
  icon,
  end,
  disabled,
  iconClassName
}) {
  const [pageLoading, setPageLoading] = React.useState(false)
  const [currentLoading, setCurrentLoading] = React.useState(false)

  const roundedClass = React.useMemo(() => (circle ? 'rounded-full' : roundless ? 'rounded' : 'rounded-md'), [circle, roundless])

  const defaultClasses = React.useMemo(() => 'px-2 min-h-[2rem] inline-flex items-center justify-center transition-all ease-in-out duration-200', [])

  const disabledClasses = React.useMemo(
    () =>
      'disabled:bg-secondary disabled:bg-opacity-10 disabled:text-secondary disabled:border disabled:border-line disabled:hover:opacity-70 disabled:cursor-not-allowed',
    []
  )

  const typeClasses = React.useMemo(() => {
    switch (type) {
      case 'secondary':
        return `bg-line hover:bg-opacity-80 text-content`
      case 'ghost':
        return `bg-white hover:bg-opacity-80 text-content`
      case 'black':
        return `bg-content hover:bg-opacity-80 text-white`
      default:
        return `bg-primary hover:bg-opacity-80 text-white`
    }
  }, [type])

  Router.events.on('routeChangeStart', () => setPageLoading(true))
  Router.events.on('routeChangeComplete', () => setPageLoading(false))
  Router.events.on('routeChangeError', () => setPageLoading(false))

  const borderedClasses = React.useMemo(() => {
    switch (type) {
      case 'secondary':
        return `bg-transparent text-content border border-line hover:opacity-70`
      case 'ghost':
        return `bg-transparent text-content border border-white hover:opacity-70`
      default:
        return `bg-transparent text-primary border border-primary hover:opacity-70`
    }
  }, [type])

  if (link && !disabled) {
    return (
      <Link href={link}>
        <a className={classNames(bordered ? borderedClasses : typeClasses, roundedClass, defaultClasses, className)}>
          {icon ? <Icon name={icon} className={classNames(end ? 'order-1 mr-2' : children ? 'ml-2' : '', iconClassName)} /> : null}
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button
        className={classNames(bordered ? borderedClasses : typeClasses, roundedClass, defaultClasses, disabledClasses, className)}
        onClick={
          !disabled && !loading && !currentLoading && !pageLoading
            ? autoLoading
              ? async () => {
                  setCurrentLoading(true)
                  await onClick()
                  setCurrentLoading(false)
                }
              : onClick
            : null
        }
        type={htmlType || 'button'}
        disabled={disabled}
      >
        {loading || currentLoading ? (
          <Icon name="spinner" className={classNames('animate-spin ', end ? 'order-1 mr-2' : children ? 'ml-2' : '', iconClassName)} />
        ) : icon ? (
          <Icon name={icon} className={classNames(end ? 'order-1 mr-2' : children ? 'ml-2' : '', iconClassName)} />
        ) : null}
        {children}
      </button>
    )
  }
}

export default Button
