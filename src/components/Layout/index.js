import React from 'react'
import Header from './Header'
import Footer from './Footer'
import classNames from '../../utils/classNames'
import { RequireAuth } from '../../context/auth'

function Layout({ children, className, dashboard }) {
  if (dashboard) RequireAuth()

  return (
    <>
      <Header />
      <main className={classNames('flex-1 container mx-auto', dashboard ? 'max-w-3xl' : 'max-w-screen-xl', className)}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
