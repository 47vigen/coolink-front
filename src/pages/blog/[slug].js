import React from 'react'
import Image from 'next/image'
import moment from 'jalali-moment'
import toast from 'react-hot-toast'
import { Form, Formik } from 'formik'
import { useAuth } from '../../context/auth'
import Seo from '../../components/Tools/Seo'

// ** UI
import Layout from '../../components/Layout'
import PostItem from '../../components/Tools/Post'
import { Avatar, Button, Field } from '../../components/Tools'

// ** Graphql
import { useMutation } from '@apollo/client'
import { CREATE_COMMENT } from '../../graphql/mutations'
import { createApolloClient } from '../../graphql/apollo'
import { SHOW_COMMENTS, SHOW_ONE_POST, SHOW_POSTS } from '../../graphql/queries'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'

function Post({ post, posts, comments }) {
  const { user } = useAuth()
  const ref = React.useRef()
  const [run, { data }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => toast.success('دیدگاه شما با موفقیت ثبت شد!', { id: 'createComment' }),
    onError: () => toast.error('متاسفانه، دیدگاه شما ثبت نشد!', { id: 'createComment' })
  })

  const onSubmit = React.useCallback(
    (values) => {
      toast.loading('در حال ثبت دیدگاه ...', { id: 'createComment' })
      return run({ variables: values })
    },
    [run]
  )

  return (
    <Layout className="flex">
      <Seo title={post.title} description={post.subTitle} />
      <article className="grid grid-cols-4">
        <section id="content" className="row-span-1 col-span-4 lg:col-span-3">
          <h1 className="font-bold text-2xl">{post.title}</h1>
          <h2 className="text-lg text-secondary mb-4">{post.subTitle}</h2>
          <Image width={1000} height={400} objectFit="cover" className="rounded-lg" src={getImgSrc(post?.cover)} alt={post?.title} />
          <div className="content py-4" dangerouslySetInnerHTML={{ __html: post.body }} />
          <div className="flex items-center mb-4 pb-4 border-b border-line">
            <Avatar fullName={post.user.name} url={post.user.picture} className="w-10 h-10 me-2" />
            <div className="flex flex-col flex-1">
              <h6 className="capitalize">{post.user.name}</h6>
              <span className="text-secondary text-sm">
                منتشر شده در{' '}
                {moment(+post.createdAt)
                  .locale('fa')
                  .fromNow()}
              </span>
            </div>
          </div>
        </section>
        <aside className="relative border-line row-span-2 col-span-4 lg:col-span-1 lg:ms-8 lg:ps-8 lg:border-s">
          <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-line lg:space-y-4 lg:border-0 lg:block lg:sticky lg:top-8 mb:pb-0 mb:mb-0">
            {posts?.slice(0, 3)?.map((post, idx) => (
              <PostItem key={post.id} {...post} className={classNames(idx >= 2 ? 'hidden lg:!block' : '')} userClassName="hidden lg:!flex" />
            ))}
          </div>
        </aside>
        <section id="comments" className="space-y-6 row-span-1 col-span-4 lg:col-span-3">
          <h1 className="font-bold text-xl -mb-2">دیدگاه ها</h1>
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div key={comment.id} className="flex items-center">
                <Avatar fullName={comment.user.name} url={comment.user.picture} className="w-10 h-10 me-2" />
                <div className="flex flex-col flex-1">
                  <h6 className="capitalize">{comment.user.name}</h6>
                  <span className="text-secondary text-sm">
                    {moment(+comment.createdAt)
                      .locale('fa')
                      .fromNow()}
                  </span>
                </div>
              </div>
              <div className="bg-white p-2 rounded-md">{comment.body}</div>
            </div>
          ))}
          {user?.id ? (
            <Formik innerRef={ref} key={user.id} initialValues={{ body: '', post: post.id, user: user.id }} onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form id="add-comment" className="space-y-2">
                  <div className="flex items-center">
                    <Avatar fullName={user.name} url={user.picture} className="w-10 h-10 me-2" />
                    <div className="flex flex-col flex-1">
                      <h6 className="capitalize">{user.name}</h6>
                      <span className="text-secondary text-sm">دیدگاه خود را بیان کنید!</span>
                    </div>
                  </div>
                  <Field name="body" textarea row={3} />
                  <Button loading={isSubmitting} htmlType="submit" className="!flex ms-auto">
                    ثبت دیدگاه
                  </Button>
                </Form>
              )}
            </Formik>
          ) : null}
        </section>
      </article>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const client = createApolloClient()
  const { data: dataOne, error } = await client.query({
    query: SHOW_ONE_POST,
    variables: { slug: params.slug }
  })

  if (dataOne?.showOnePost?.id && !error) {
    const { data: comments } = await client.query({
      query: SHOW_COMMENTS,
      variables: { post: dataOne.showOnePost.id }
    })

    const { data } = await client.query({
      query: SHOW_POSTS
    })

    return {
      props: {
        posts: data?.showPosts,
        post: dataOne.showOnePost,
        comments: comments?.showComments,
        apolloState: client.cache.extract()
      }
    }
  }

  return {
    notFound: true
  }
}

export default Post
