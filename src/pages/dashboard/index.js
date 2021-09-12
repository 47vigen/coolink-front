import React from 'react'

// ** UI
import Layout from '../../components/Layout'
import { Avatar, Button, Icon } from '../../components/Tools'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_MY_PAGES } from '../../graphql/queries'

function Dashboard(props) {
  const { data, loading, error } = useQuery(SHOW_MY_PAGES)

  return (
    <Layout dashboard className="space-y-4">
      <div className="flex relative items-center bg-gradient-to-r from-primary to-primary-hover h-32 sm:h-22 rounded-lg px-10">
        <div>
          <img src="/images/dude.svg" className="absolute w-auto h-40 bottom-0 pt-2 transform ltr:scale-x-[-1]" />
        </div>
        <div className="flex-1" />
        <div className="space-y-1 text-white">
          <h4 className="text-lg font-bold">به کولینک خوش آمدید</h4>
          <div className="flex items-center">
            <span className="text">شروع کنید</span>
            <Icon name="angle-small-left" className="text-base" />
          </div>
        </div>
      </div>
      <Button type="secondary" className="w-full justify-between px-4">
        <span>آموزش ایجاد کولینک</span>
        <Icon name="graduation-cap" className="text-base" />
      </Button>
      <div className="grid grid-cols-2 gap-4">
        {data?.showMyPages?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </Layout>
  )
}

const Item = ({ title, subTitle, slug, profilePic }) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2">
      <div className="flex items-center">
        <Avatar fullName={title} url={profilePic} className="w-12 h-12 me-2" />
        <div className="flex flex-col flex-1">
          <h5>{title}</h5>
          <span className="text-line">{subTitle}</span>
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
