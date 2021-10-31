import React from 'react'
import Seo from '../../components/Tools/Seo'

// ** UI
import Layout from '../../components/Layout'
import { Avatar, Button, Icon, Loader, Link } from '../../components/Tools'
import ConfirmEmail from '../../components/Tools/ConfirmEmail'

// ** Graphql
import { useQuery } from '@apollo/client'
import { SHOW_MY_PAGES } from '../../graphql/queries'

// ** Images
import Image from 'next/image'
import dude from '../../../public/images/dude.svg'

function Dashboard(props) {
  const { data, loading } = useQuery(SHOW_MY_PAGES)

  return (
    <Layout dashboard className="space-y-4">
      <Seo title="داشبورد" noindex />
      <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary-hover h-32 sm:h-22 rounded-lg lg:px-10 px-4">
        <div className="max-w-[13.7rem] min-w-[13.7rem] -mt-5">
          <Image alt="dude" src={dude} width={250} height={176} className="transform ltr:scale-x-[-1]" />
        </div>
        <div className="space-y-1 text-white -ms-10 lg:ms-0">
          <h4 className="text-lg font-bold">به کولینک خوش آمدید</h4>
          <Link href="/dashboard/create" className="flex items-center hover:text-content">
            شروع کنید
            <Icon name="angle-small-left" className="text-base" />
          </Link>
        </div>
      </div>
      <Button type="secondary" className="w-full justify-between px-4">
        <span>آموزش ایجاد کولینک</span>
        <Icon name="graduation-cap" className="text-base" />
      </Button>
      <ConfirmEmail />
      <Loader loading={loading} className="min-h-[10rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.showMyPages?.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </Loader>
    </Layout>
  )
}

const Item = ({ title, subTitle, slug, avatar }) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-2">
      <div className="flex items-center">
        <Avatar fullName={title} url={avatar.url} className="w-12 h-12 me-2" />
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
