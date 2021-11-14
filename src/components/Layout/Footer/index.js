import React from 'react'

// ** UI
import { Button } from '../../Tools'

// ** Utils
import classNames from '../../../utils/classNames'

function Footer({ wrapperName }) {
  return (
    <footer className={classNames('container mx-auto mt-8 px-4', wrapperName)}>
      <div className="flex flex-col xl:flex-row justify-between items-center bg-content text-white rounded-t-2xl p-4">
        <p className="text-center xl:text-start pb-4 xl:pb-0">
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

export default React.memo(Footer)
