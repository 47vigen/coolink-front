import React from 'react'
import Image from 'next/image'
import moment from 'jalali-moment'
import Seo from '../../components/Tools/Seo'

// ** UI
import Layout from '../../components/Layout'
import Post from '../../components/Tools/Post'
import { Avatar, Button, Icon, Link } from '../../components/Tools'

// ** Graphql
import { SHOW_POSTS } from '../../graphql/queries'
import { createApolloClient } from '../../graphql/apollo'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'

function index({ posts }) {
  return (
    <Layout>
      <Seo title="وبلاگ" description="جایی برای استفاده از تجارب کاربران کولینک" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 transition-transform duration-500 transform hover:scale-105 !mt-0">
        <Link href={`/blog/${posts[0].slug}`}>
          <Image width={1000} height={425} objectFit="cover" className="rounded-lg" src={getImgSrc(posts[0]?.cover)} alt={posts[0]?.title} />
        </Link>
        <div className="flex flex-col justify-end space-y-2 pb-2">
          <Link href={`/blog/${posts[0].slug}`}>
            <h2 className="font-bold text-xl">{posts[0].title}</h2>
            <h3 className="text-lg text-secondary !mt-0">{posts[0].subTitle}</h3>
          </Link>
          <p>{posts[0].body?.replace(/<.+?>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 400)} ...</p>
          <div className="flex items-center">
            <Avatar fullName={posts[0].user.name} url={posts[0].user.picture} className="w-10 h-10 me-2" />
            <div className="flex flex-col flex-1">
              <h6 className="capitalize">{posts[0].user.name}</h6>
              <span className="text-secondary text-sm">
                منتشر شده در{' '}
                {moment(+posts[0].createdAt)
                  .locale('fa')
                  .fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 border-t border-line pt-8 mt-6">
        {posts?.slice(1, posts?.length)?.map((post, idx) => (
          <Post key={post.id + idx} {...post} userClassName="hidden lg:!flex" />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params, req }) {
  const client = createApolloClient()
  const { data, error } = await client.query({
    query: SHOW_POSTS
  })

  return {
    props: {
      posts: data.showPosts,
      apolloState: client.cache.extract()
    }
  }
}

export default index
