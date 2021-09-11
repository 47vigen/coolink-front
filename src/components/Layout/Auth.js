import React from 'react'
import Image from 'next/image'
import classNames from '../../utils/classNames'
import { Link } from '../Tools'
import footerLogo from '../../../public/images/footer-logo.svg'

function Auth({ children, extra, className }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="max-w-[20rem] w-full mx-auto rounded-2xl overflow-hidden">
        <div className="bg-primary h-32 bg-cover flex justify-center items-center" style={{ backgroundImage: "url('/images/circles.png')" }}>
          <Link href="/" className="block -mt-2">
            <Image src={footerLogo} alt="logo" />
          </Link>
        </div>
        <div className={classNames('bg-white py-6 px-4 -mt-4 rounded-t-2xl', className)}>{children}</div>
      </div>
      {extra}
    </div>
  )
}

export default Auth
