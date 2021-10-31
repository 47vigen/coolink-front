import React from 'react'
import Seo from '../components/Tools/Seo'

function Offline(props) {
  return (
    <div className="flex-1 flex justify-center items-center text-xs">
      <Seo title="408" />
      <h1 className="text-primary font-bold text-5xl ml-4">408</h1>
      <div className=" flex flex-col border-r border-line pr-4">
        <h2>اتصال خود را با اینترنت بررسی کنید!</h2>
      </div>
    </div>
  )
}

export default Offline
