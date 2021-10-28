import React from 'react'
import { RequireAuth } from '../../context/auth'

// ** Layout
import Header from './Header'
import Footer from './Footer'

// ** Utils
import classNames from '../../utils/classNames'

function Layout({ children, className, dashboard, footer = true }) {
  if (dashboard) RequireAuth()

  return (
    <>
      <Header />
      <main className={classNames('flex-1 container mx-auto px-4', dashboard ? '' : '', className)}>{children}</main>
      {footer ? <Footer /> : null}
    </>
  )
}

export default Layout
