import React from 'react'
import { RequireAuth } from '../../context/auth'

// ** Layout
import Header from './Header'
import Footer from './Footer'

// ** Utils
import classNames from '../../utils/classNames'

function Layout({ children, className, dashboard, wrapperName, footer = true }) {
  if (dashboard) RequireAuth()

  return (
    <>
      <Header wrapperName={wrapperName} />
      <main className={classNames('flex-1 container mx-auto px-4', wrapperName, dashboard ? '' : '', className)}>{children}</main>
      {footer ? <Footer wrapperName={wrapperName} /> : null}
    </>
  )
}

export default React.memo(Layout)
