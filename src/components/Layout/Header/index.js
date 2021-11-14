import React from 'react'
import { useAuth } from '../../../context/auth'

// ** UI
import UserState from './UserState'
import { Button, Link } from '../../Tools'

// ** Images
import Image from 'next/image'
import CoolinkLogo from '../../../../public/images/coolink-logo.svg'

// ** UI
import classNames from '../../../utils/classNames'
import onOutside from '../../../utils/onOutside'

function Header({ wrapperName }) {
  const { user } = useAuth()

  const [open, setOpen] = React.useState(false)
  onOutside('mobile-navbar', () => setOpen(false))

  return (
    <header className={classNames('container m-auto mb-4 p-4 flex justify-between items-center', wrapperName)}>
      <div className="md:w-40 flex items-center">
        <Button
          type="ghost"
          icon="menu-burger"
          className="-my-2 me-4 pe-4 -ms-2 block lg:hidden bg-transparent border-line border-e !min-h-0 h-[min-content] py-2 rounded-none"
          onClick={() => setOpen(true)}
        />
        <UserState />
      </div>
      <nav
        id="mobile-navbar"
        className={classNames(
          'absolute start-0 end-0 flex bg-white top-0 py-3 px-4 z-10 transform transition-all lg:relative lg:p-0 lg:bg-transparent lg:shadow-none lg:z-0 lg:translate-y-0',
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
            <Link href={user.id ? '/dashboard/create' : '/sign-up?ref=/dashboard/create'}>شروع کنید!</Link>
          </li>
        </ul>
        <Button type="ghost" icon="angle-small-up" className="block lg:hidden ms-auto -m-2" onClick={() => setOpen(false)} />
      </nav>
      <Link href="/" className="md:w-40 ms-4 lg:ms-0">
        <Image src={CoolinkLogo} alt="Coolink" />
      </Link>
    </header>
  )
}

export default React.memo(Header)
