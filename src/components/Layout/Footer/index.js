import React from 'react'

// ** UI
import { Button } from '../../Tools'

// ** Images
import Image from 'next/image'
import FooterLogo from '../../../../public/images/footer-logo.svg'

function Footer(props) {
  return (
    <footer className="container max-w-screen-xl mx-auto pb-2 px-4">
      <div className="flex flex-col items-center space-y-3 border-t border-line pt-4">
        <Image src={FooterLogo} alt="Coolink" />
        <p className="text-center max-w-lg mx-auto">
          کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و ... در
          اختیار کاربران قرار دارد.
        </p>
        <div className="space-s-2">
          <Button link="mailto://info@colk.ir" icon="envelope" circle />
          <Button link="https://twitter.com/coolink_ir" icon="brand-twitter" circle />
          <Button link="https://instagram.com/coolink.ir" icon="brand-instagram" circle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
