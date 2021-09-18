import React from 'react'
import Link from '../../Tools/Link'
import UserState from './UserState'

function Header(props) {
  return (
    <>
      <header className="container max-w-screen-xl flex justify-between items-center m-auto py-2 px-4">
        <div className="w-40">
          <UserState />
        </div>
        <nav>
          <ul className="flex space-s-5 ">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="/about-us">درباره ما</Link>
            </li>
            <li>
              <Link href="#">شروع کنید!</Link>
            </li>
          </ul>
        </nav>
        <Link href="/" className="w-40">
          <img className="w-full h-auto" src="/images/coolink-logo.svg" alt="coolink-logo" />
        </Link>
      </header>
    </>
  )
}

export default Header
