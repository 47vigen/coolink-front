import React from 'react'
import Seo from '../../components/Tools/Seo'

// ** UI
import AdminLayout from '../../components/Layout/Admin'
// import { Avatar, Button, Icon, Loader, Link } from '../../components/Tools'

// ** Graphql
// import { useQuery } from '@apollo/client'
// import { SHOW_MY_PAGES } from '../../graphql/queries'

function Admin(props) {
  return (
    <AdminLayout className="flex-1 space-y-4">
      <Seo title="پیشخوان" noindex />
    </AdminLayout>
  )
}

export default Admin
