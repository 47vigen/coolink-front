import React from 'react'

// ** UI
import { Link, Icon, Avatar } from '../../Tools'

function PageHeader({ page, linked, onEdit }) {
  return (
    <header className="flex items-center container lg:max-w-md mx-auto">
      <div className="relative w-20 me-4">
        {linked ? (
          <Link href={`/${page.slug}`}>
            <Avatar url={page.profilePic} className="w-20 h-20" />
          </Link>
        ) : (
          <Avatar url={page.profilePic} className="w-20 h-20" />
        )}
        {onEdit ? (
          <button className="absolute bottom-0 left-0 transition duration-300 hover:opacity-60" onClick={onEdit}>
            <Icon name="edit" className="bg-body p-1.5 rounded-md" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-lg mb-1">{page?.title}</h1>
        <span className="text-line text-base">{page?.subTitle}</span>
      </div>
    </header>
  )
}

export default PageHeader
