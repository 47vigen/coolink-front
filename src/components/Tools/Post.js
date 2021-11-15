import React from 'react'
import Image from 'next/image'
import moment from 'jalali-moment'

// ** UI
import { Avatar, Link } from '.'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

function Post({ title, subTitle, slug, cover, user, createdAt, className, userClassName }) {
  return (
    <div className={classNames('transition-transform duration-500 transform hover:scale-105', className)}>
      <Link href={`/blog/${slug}`}>
        <Image width={1000} height={500} objectFit="cover" className="rounded-lg" src={getImgSrc(cover)} alt={title} />
      </Link>
      <div className="space-y-2">
        <Link href={`/blog/${slug}`}>
          <h4 className="font-bold">{title}</h4>
        </Link>
        <h5 className="text-secondary !mt-1">{subTitle}</h5>
        <div className={classNames('flex items-center', userClassName)}>
          <Avatar fullName={user.name} url={user.picture} className="w-9 h-9 me-2" />
          <div className="flex flex-col flex-1">
            <h6 className="capitalize">{user.name}</h6>
            <span className="text-secondary text-sm">
              {moment(+createdAt)
                .locale('fa')
                .fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Post)
