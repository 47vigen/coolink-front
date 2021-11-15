import React from 'react'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'

// ** UI
import TiptopEditor from './TiptopEditor'
import { Button, Field, Icon, Loader, Upload } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'

// ** Graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import { SHOW_ONE_POST, SHOW_POSTS } from '../../graphql/queries'
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutations'

function PostEditor({ slug = '' }) {
  const router = useRouter()
  const editor = useEditor({ extensions: [StarterKit, Highlight], content: '' })

  const [run, { data, loading }] = useLazyQuery(SHOW_ONE_POST, {
    variables: { slug },
    onCompleted: (data) => editor.commands.insertContent(data?.showOnePost?.body),
    fetchPolicy: 'cache-and-network'
  })
  const [create] = useMutation(CREATE_POST, {
    onCompleted: () => router.push('/admin/post'),
    update: async (cache, mutationResult) => {
      const data = mutationResult.data.createPost

      // show all
      const query = await cache.readQuery({
        query: SHOW_POSTS
      })
      cache.writeQuery({
        query: SHOW_POSTS,
        data: { ...query, showPosts: [data, ...query?.showPosts] }
      })
    }
  })
  const [update] = useMutation(UPDATE_POST, {
    onCompleted: () => router.push('/admin/post'),
    update: async (cache, mutationResult) => {
      const data = mutationResult.data.updatePost

      // show all
      const query = await cache.readQuery({
        query: SHOW_POSTS
      })
      const post = query?.showPosts?.find((post) => data.id === post.id)
      const showPosts = post ? query.showPosts.map((p) => (p.id === post.id ? post : p)) : [data]
      cache.writeQuery({
        query: SHOW_POSTS,
        data: { ...query, showPosts }
      })

      // show one
      const queryOne = await cache.readQuery({
        query: SHOW_ONE_POST,
        variables: { slug: data.slug }
      })
      cache.writeQuery({
        query: SHOW_ONE_POST,
        variables: { slug: data.slug },
        data: { ...queryOne, showOnePost: { ...queryOne?.showOnePost, ...data } }
      })
    }
  })

  const onSubmit = React.useCallback(
    ({ id, user, views, ...values }) => {
      const body = editor.getHTML()
      if (slug) {
        return update({ variables: { id: data?.showOnePost?.id, postInput: { ...values, body } } })
      } else {
        return create({ variables: { postInput: { ...values, body } } })
      }
    },
    [create, data?.showOnePost?.id, editor, slug, update]
  )

  React.useEffect(() => {
    if (slug) run()
  }, [slug, run])

  return (
    <Loader loading={loading}>
      <Formik
        onSubmit={onSubmit}
        key={JSON.stringify(data || {})}
        initialValues={{ title: '', subTitle: '', slug: '', cover: '', ...data?.showOnePost }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex-1 flex flex-col space-y-4">
            <div className="bg-white p-4 rounded-xl">
              <Upload.Single
                pk="blog"
                type="post"
                onChange={(url) => setFieldValue('cover', url, false)}
                className={classNames(
                  'flex justify-center items-center border border-dashed border-line rounded-lg overflow-hidden',
                  values.cover ? '' : 'h-56'
                )}
              >
                {values.cover ? (
                  <>
                    <Image
                      width={1000}
                      height={400}
                      objectFit="cover"
                      className="rounded-lg"
                      src={getImgSrc(values.cover)}
                      alt="page background image"
                    />
                    <Button
                      bordered
                      roundless
                      type="ghost"
                      className="absolute z-30 top-4 end-4 !bg-content !text-white mix-blend-exclusion"
                      onClick={() => setFieldValue('cover', null, false)}
                    >
                      حذف کاور نوشته
                    </Button>
                  </>
                ) : (
                  <span className="text-sm text-secondary">تصویری برای کاور نوشته خود انتخاب کنید!</span>
                )}
                <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md" />
              </Upload.Single>
            </div>
            <div className="bg-white p-4 rounded-xl space-y-4">
              <Field required name="title" label="عنوان" placeholder="لطفا عنوان نوشته خود را وارد کنید ..." />
              <Field name="subTitle" label="زیر عنوان" placeholder="لطفا زیر عنوان نوشته خود را وارد کنید ..." />
              <Field required name="slug" label="پیوند یکتا" placeholder="لطفا پیوند یکتا نوشته خود را وارد کنید ..." />
              <TiptopEditor editor={editor} />
            </div>
            <Button loading={isSubmitting} htmlType="submit" className="w-full">
              ذخیره نوشته
            </Button>
          </Form>
        )}
      </Formik>
    </Loader>
  )
}

export default PostEditor
