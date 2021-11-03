import React from 'react'
import { useAuth } from '../../context/auth'
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
  const { user } = useAuth()

  return (
    <Layout dashboard>
      <Seo title="داشبورد" noindex />
      <div className="flex items-stretch space-s-4 lg:space-s-8">
        <div className="relative lg:flex-1 max-w-[16rem]">
          <div className="flex flex-col sticky top-4 items-center lg:items-start space-y-5 text-2xl">
            <Link href="/dashboard" className="flex items-baseline text-content hover:text-content hover:opacity-70">
              <div
                className="w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current text-primary"
                dangerouslySetInnerHTML={{
                  __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512" height="512"><g><path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"/><g><path d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z"/><path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"/></g></g></svg>`
                }}
              />
              <h6 className="hidden lg:!block">داشبورد</h6>
            </Link>
            <Link href="/dashboard" className="flex items-baseline text-secondary hover:text-content">
              <div
                className="w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current"
                dangerouslySetInnerHTML={{
                  __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M19,3H5A5.006,5.006,0,0,0,0,8H24A5.006,5.006,0,0,0,19,3Z"/><path d="M0,16a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm7-.5A1.5,1.5,0,1,1,5.5,14,1.5,1.5,0,0,1,7,15.5"/></svg>`
                }}
              />
              <h6 className="hidden lg:!block">کول‌کارت</h6>
            </Link>
            <Link href="/dashboard" className="flex items-baseline text-secondary hover:text-content">
              <div
                className="w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current"
                dangerouslySetInnerHTML={{
                  __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M22.5,21H5.5A2.5,2.5,0,0,1,3,18.5V1.5a1.5,1.5,0,0,0-3,0v17A5.506,5.506,0,0,0,5.5,24h17a1.5,1.5,0,0,0,0-3Z"/><path d="M9.5,9A1.5,1.5,0,0,0,8,10.5v7a1.5,1.5,0,0,0,3,0v-7A1.5,1.5,0,0,0,9.5,9Z"/><path d="M14,13.5v4a1.5,1.5,0,0,0,3,0v-4a1.5,1.5,0,0,0-3,0Z"/><path d="M20,9.5v8a1.5,1.5,0,0,0,3,0v-8a1.5,1.5,0,0,0-3,0Z"/><path d="M6,7.5a1.487,1.487,0,0,0,.936-.329L9.214,5.35a2.392,2.392,0,0,1,3.191.176,5.43,5.43,0,0,0,7.3.3l3.764-3.185A1.5,1.5,0,1,0,21.531.355L17.768,3.54A2.411,2.411,0,0,1,14.526,3.4a5.389,5.389,0,0,0-7.186-.4L5.063,4.829A1.5,1.5,0,0,0,6,7.5Z"/></svg>`
                }}
              />
              <h6 className="hidden lg:!block">آمار</h6>
            </Link>
            <Link href="/dashboard" className="group flex items-baseline text-secondary hover:text-content">
              <Avatar
                className="w-[1.625rem] h-[1.625rem] self-center lg:me-2 lg:mb-1 border-2 border-secondary group-hover:border-content rounded-full"
                url={user?.picture}
                fullName={user?.name}
              />
              <h6 className="hidden lg:!block">پروفایل</h6>
            </Link>
            <Button link="/dashboard/create" className="w-full rounded-lg font-bold !min-h-[2.5rem]">
              <div
                className="w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current"
                dangerouslySetInnerHTML={{
                  __html: `<svg class="w-full h-auto" id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm4 13h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z"/></svg>`
                }}
              />
              <h6 className="hidden lg:!block">ایجاد کولینک</h6>
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Button className="w-full justify-between px-4 bg-gradient-to-r from-yellow-400 to-pink-500 via-red-500">
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
        </div>
      </div>
    </Layout>
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
