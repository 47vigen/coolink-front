import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth'

// ** UI
import Layout from '.'
import { Avatar, Button, Link } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'

function Dashboard({ className, children, hide }) {
  const { user } = useAuth()

  return (
    <Layout dashboard>
      <div className="flex items-stretch space-s-4 lg:space-s-8">
        <div
          className={classNames(
            'relative lg:flex-1 max-w-[16rem] transition-all duration-300',
            hide ? '-ms-14 pe-1 opacity-0 invisible lg:opacity-100 lg:visible lg:ms-0 lg:pe-0' : ''
          )}
        >
          <div className="flex flex-col sticky top-4 items-center lg:items-start space-y-5 text-2xl">
            <MenuItem pathname="/dashboard" label="داشبورد">
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512" height="512"><g><path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"/><g><path d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z"/><path d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"/></g></g></svg>`
                  }}
                />
              )}
            </MenuItem>
            <MenuItem soon pathname="/dashboard/card" label="کول‌کارت">
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M19,3H5A5.006,5.006,0,0,0,0,8H24A5.006,5.006,0,0,0,19,3Z"/><path d="M0,16a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm7-.5A1.5,1.5,0,1,1,5.5,14,1.5,1.5,0,0,1,7,15.5"/></svg>`
                  }}
                />
              )}
            </MenuItem>
            <MenuItem pathname="/dashboard/statistics" label="آمار">
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M22.5,21H5.5A2.5,2.5,0,0,1,3,18.5V1.5a1.5,1.5,0,0,0-3,0v17A5.506,5.506,0,0,0,5.5,24h17a1.5,1.5,0,0,0,0-3Z"/><path d="M9.5,9A1.5,1.5,0,0,0,8,10.5v7a1.5,1.5,0,0,0,3,0v-7A1.5,1.5,0,0,0,9.5,9Z"/><path d="M14,13.5v4a1.5,1.5,0,0,0,3,0v-4a1.5,1.5,0,0,0-3,0Z"/><path d="M20,9.5v8a1.5,1.5,0,0,0,3,0v-8a1.5,1.5,0,0,0-3,0Z"/><path d="M6,7.5a1.487,1.487,0,0,0,.936-.329L9.214,5.35a2.392,2.392,0,0,1,3.191.176,5.43,5.43,0,0,0,7.3.3l3.764-3.185A1.5,1.5,0,1,0,21.531.355L17.768,3.54A2.411,2.411,0,0,1,14.526,3.4a5.389,5.389,0,0,0-7.186-.4L5.063,4.829A1.5,1.5,0,0,0,6,7.5Z"/></svg>`
                  }}
                />
              )}
            </MenuItem>
            <MenuItem soon pathname="/dashboard/profile" label="پروفایل">
              {({ active }) => (
                <Avatar
                  className="w-[1.625rem] h-[1.625rem] self-center lg:me-2 lg:mb-1 border-2 border-secondary group-hover:border-content rounded-full"
                  url={user?.picture}
                  fullName={user?.name}
                />
              )}
            </MenuItem>
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
        <div className={classNames('flex-1', className)}>{typeof children === 'function' ? children({ user }) : children}</div>
      </div>
    </Layout>
  )
}

const MenuItem = ({ pathname, label, children, soon }) => {
  const router = useRouter()
  const active = React.useMemo(() => pathname === router.pathname, [pathname, router.pathname])

  return !soon ? (
    <Link
      href={pathname}
      className={classNames(
        'group flex items-baseline',
        active ? '!text-content hover:!text-content hover:!opacity-70' : '!text-secondary hover:!text-content'
      )}
    >
      {typeof children === 'function' ? children({ active }) : children}
      <h6 className="hidden lg:!block">{label}</h6>
    </Link>
  ) : (
    <div
      className={classNames(
        'relative group flex items-baseline cursor-pointer transition ease-in-out duration-200',
        active ? '!text-content hover:!text-content hover:!opacity-70' : '!text-secondary hover:!text-content'
      )}
    >
      {typeof children === 'function' ? children({ active }) : children}
      <h6 className="hidden lg:!block">{label}</h6>
    </div>
  )
}

export default React.memo(Dashboard)
