import React from 'react'
import Seo from '../components/Tools/Seo'

function ServerError(props) {
  return (
    <div className="flex-1 flex justify-center items-center text-xs">
      <Seo title="500" />
      <h1 className="text-primary font-bold text-5xl ml-4">500</h1>
      <div className=" flex flex-col border-r border-line pr-4">
        <h2>خطا در ارتباط با سرور!</h2>
      </div>
    </div>
  )
}

export default ServerError
