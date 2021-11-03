import React from 'react'
import Seo from '../../components/Tools/Seo'

// ** UI
import DashboardLayout from '../../components/Layout/Dashboard'
import { Avatar, Button, Icon, Loader, Link } from '../../components/Tools'
import ConfirmEmail from '../../components/Tools/ConfirmEmail'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_MY_PAGES } from '../../graphql/queries'

function Dashboard(props) {
  const { data, loading } = useQuery(SHOW_MY_PAGES)

  return (
    <DashboardLayout className="flex-1 space-y-4">
      <Seo title="داشبورد" noindex />
      <Button className="!mt-0 w-full justify-between px-4 bg-gradient-to-r from-yellow-400 to-pink-500 via-red-500">
        <span>آموزش ایجاد کولینک</span>
        <Icon name="brand-instagram" className="text-base" />
      </Button>
      <ConfirmEmail />
      <Loader loading={loading} className="min-h-[10rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.showMyPages?.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </Loader>
    </DashboardLayout>
  )
}

const Item = ({ title, subTitle, slug, avatar }) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2 transition-all duration-500 hover:shadow-lg">
      <div className="flex items-center">
        <Avatar fullName={title} url={avatar.url} className="w-12 h-12 me-2" />
        <div className="flex flex-col flex-1">
          <h5>{title}</h5>
          <span className="text-secondary">{subTitle}</span>
        </div>
      </div>
      <div className="flex space-s-2">
        <Button link={`/${slug}`} bordered className="flex-1">
          مشاهده
        </Button>
        <Button type="secondary" bordered className="px-3" link={`/dashboard/edit/${slug}`}>
          <Icon name="settings-sliders" className="text-base option-btn" />
        </Button>
      </div>
      <div className="flex border border-line rounded-lg">
        <Button type="ghost" className="hover:opacity-60 px-3" onClick={() => navigator.clipboard.writeText(`colk.ir/${slug}`)}>
          <Icon name="copy-alt" className="text-base" />
        </Button>
        <input
          readOnly
          value={`colk.ir/${slug}`}
          className="flex-1 border-r border-line focus:outline-none rounded-none text-left px-3"
          style={{ background: 'none' }}
        />
      </div>
    </div>
  )
}

export default Dashboard
