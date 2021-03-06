import React from 'react'

// ** UI
import UserState from './UserState'
import { Button, Link } from '../../Tools'

// ** Images
import Image from 'next/image'
import CoolinkLogo from '../../../../public/images/coolink-logo.svg'

// ** UI
import classNames from '../../../utils/classNames'

function Header(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="container max-w-screen-xl flex justify-between items-center m-auto py-2 px-4">
        <div className="md:w-40 flex items-center">
          <Button
            type="ghost"
            icon="menu-burger"
            className="-my-2 me-2 -ms-2 block md:hidden bg-transparent border-line border-e !min-h-0 h-[min-content] py-2 rounded-none"
            onClick={() => setOpen(true)}
          />
          <UserState />
        </div>
        <nav
          className={classNames(
            'absolute start-0 end-0 flex bg-white top-0 py-3 px-4 z-10 transform transition-all md:relative md:p-0 md:bg-transparent md:shadow-none md:z-0 md:translate-y-0',
            open ? 'shadow-lg' : '-translate-y-11'
          )}
        >
          <ul className="flex space-s-5 ">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="https://virgool.io/coolink">وبلاگ</Link>
            </li>
            <li>
              <Link href="/dashboard/create">شروع کنید!</Link>
            </li>
          </ul>
          <Button type="ghost" icon="angle-small-up" className="block md:hidden ms-auto -m-2" onClick={() => setOpen(false)} />
        </nav>
        <Link href="/" className="md:w-40 ms-4 md:ms-0">
          <Image src={CoolinkLogo} alt="Coolink" />
        </Link>
      </header>
    </>
  )
}

export default Header
