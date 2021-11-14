import React from 'react'
import PostEditor from '../../../../components/Editor/PostEditor'

// ** UI
import Admin from '../../../../components/Layout/Admin'

function EditPost({ slug }) {
  return (
    <Admin className="flex-1 space-y-4">
      <PostEditor slug={slug} />
    </Admin>
  )
}

export async function getServerSideProps({ params, req }) {
  if (params.slug) {
    return {
      props: {
        slug: params.slug
      }
    }
  }
  return {
    notFound: true
  }
}

export default EditPost
