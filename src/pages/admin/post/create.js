import React from 'react'
import PostEditor from '../../../components/Editor/PostEditor'

// ** UI
import Admin from '../../../components/Layout/Admin'

function CreatePost(props) {
  return (
    <Admin className="flex-1 space-y-4">
      <PostEditor />
    </Admin>
  )
}

export default CreatePost
