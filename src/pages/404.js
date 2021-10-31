import React from 'react'
import Seo from '../components/Tools/Seo'

// ** UI
import { Button } from '../components/Tools'

function NotFound(props) {
  return (
    <div className="flex-1 flex justify-center items-center text-xs">
      <Seo title="404" />
      <h1 className="text-primary font-bold text-5xl ml-4">404</h1>
      <div className=" flex flex-col border-r border-line pr-4">
        <h2 className="mb-4"> صفحه مورد نظر پیدا نشد!</h2>
        <div className="">
          <Button link="/" className="ml-2">
            صفحه اصلی
          </Button>
          <Button link="/dashboard/create" type="secondary">
            ایجاد کولینک
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
