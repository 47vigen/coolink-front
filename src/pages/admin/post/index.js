import React from 'react'
import Image from 'next/image'
import Seo from '../../../components/Tools/Seo'

// ** UI
import Admin from '../../../components/Layout/Admin'
import { Button, Icon, Loader } from '../../../components/Tools'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_POSTS } from '../../../graphql/queries'
import { getImgSrc } from '../../../utils/getImgSrc'

function Posts(props) {
  const { data, loading } = useQuery(SHOW_POSTS)

  return (
    <Admin className="flex-1 space-y-4">
      <Seo title="نوشته ها" noindex nofollow />
      <Loader loading={loading} className="min-h-[10rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.showPosts?.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </Loader>
    </Admin>
  )
}

const Item = ({ title, subTitle, slug, cover, user }) => {
  return (
    <div className="bg-white rounded-lg transition-all duration-500 hover:shadow-lg overflow-hidden">
      <Image width={1000} height={400} objectFit="cover" src={getImgSrc(cover)} alt="page background image" />
      <div className="space-y-2 pt-2 px-4">
        <h5>{title}</h5>
        <span className="text-secondary">{subTitle}</span>
        <div className="flex space-s-2">
          <Button link={`/blog/${slug}`} bordered className="flex-1">
            مشاهده
          </Button>
          <Button type="secondary" icon="edit" bordered link={`/admin/post/edit/${slug}`} />
          <Button type="secondary" icon="trash" bordered disabled />
        </div>
        <div className="-mx-4 px-4 py-2 border-t border-line flex items-center text-secondary text-sm">
          <Icon name="clock" className="me-2" />
          آخرین ویرایش توسط {user.name}
        </div>
      </div>
    </div>
  )
}

export default Posts
