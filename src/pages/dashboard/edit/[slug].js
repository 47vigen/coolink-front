import React from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '../../../context/auth'
import Seo from '../../../components/Tools/Seo'
import { Menu, Transition } from '@headlessui/react'

// ** UI
import Layout from '../../../components/Layout'
import { Button, Icon, Loader, Tab, Tabs } from '../../../components/Tools'
import PageHeader from '../../../components/Layout/Header/PageHeader'

// ** Graphql
import { createApolloClient } from '../../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS_BY_SLUG } from '../../../graphql/queries'

// ** Utils
import Editor from '../../../components/Editor'
import classNames from '../../../utils/classNames'
import deepCleaner from '../../../utils/deepCleaner'

// ** Template
const Template = dynamic(() => import('../../../components/Template'), {
  ssr: false
})

function Edit({ page, sections }) {
  const { loading } = useAuth()
  return (
    <Layout className="flex flex-col" dashboard footer={false}>
      <Loader loading={loading} className="flex flex-col w-full flex-1">
        <Editor page={page} sections={sections}>
          {({
            page,
            sections,
            save,
            isNeedSave,
            loading,
            onDragEnd,
            openAddModal,
            openEditInfoModal,
            openEditStyleModal,
            openEditModal,
            onAddItem
          }) => (
            <div className="flex-1 flex flex-col lg:flex-row -mt-4 lg:mt-0 items-stretch">
              <div className="lg:flex-1 flex flex-col lg:pe-8 lg:space-y-4">
                <div className="flex items-center space-s-2 -mt-2 -mx-4 mb-2 py-2 bg-white shadow-lg px-2 sm:rounded-lg sm:shadow-none lg:bg-transparent lg:border border-line lg:mx-0 ">
                  <div className="flex-1 flex items-center justify-end" dir="ltr">
                    <span className="me-1">colk.ir/</span>
                    <h3 className="text-primary text-2xl font-bold">{page.slug}</h3>
                  </div>
                  <Menu as="div" className="relative inline-block text-end">
                    <Menu.Button as={Button} type="ghost" icon="settings" />
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-50 end-0 w-40 mt-2 origin-top-end bg-white border border-line lg:border-0 divide-y divide-line rounded-lg shadow-lg focus:outline-none">
                        <div className="ps-1 py-1">
                          <Menu.Item as={Button} type="ghost" icon="share" className="!justify-start w-full" onClick={openEditStyleModal}>
                            انتشار
                          </Menu.Item>
                          <Menu.Item as={Button} type="ghost" icon="brush" className="!justify-start w-full" onClick={openEditStyleModal}>
                            شخصی سازی
                          </Menu.Item>
                        </div>
                        <div className="ps-1 py-1">
                          <Menu.Item as={Button} type="ghost" icon="trash" className="text-danger !justify-start w-full" onClick={openEditStyleModal}>
                            حذف کولینک
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="hidden lg:!block">
                  <h3 className="flex-1 text-xl font-bold">افزودن بلوک</h3>
                  <p>
                    کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و
                    ... در اختیار کاربران قرار می‌دهد.
                  </p>
                </div>
                <Tabs labels={['عمومی', 'اینستاگرام']} activeClassName="font-bold" className="flex-1 hidden lg:!flex flex-col">
                  <Tab className="grid grid-cols-3 gap-4">
                    <Item type="links" icon="link" label="لینک یا پیوند" onAddItem={onAddItem} />
                    <Item type="text" icon="document" label="متن یا توضیح" onAddItem={onAddItem} />
                    <Item type="contacts" icon="smartphone" label="اطلاعات تماس" onAddItem={onAddItem} />
                    <Item type="services" icon="comment" label="شبکه‌های‌اجتماعی و سرویس‌ها" onAddItem={onAddItem} />
                    <Item type="locations" icon="location-alt" label="مسیریابی" onAddItem={onAddItem} />
                    <Item type="faq" icon="interrogation" label="پرسش های پرتکرار" onAddItem={onAddItem} />
                  </Tab>
                  <Tab className="grid grid-cols-3 gap-4">
                    <Item type="igFeedsLink" icon="picture" label="لینک پست ها" onAddItem={onAddItem} />
                    <Item type="igFeedsDownload" icon="download" label="دانلود پست ها" onAddItem={onAddItem} />
                  </Tab>
                </Tabs>
                <div className="hidden lg:!flex border border-b-0 border-line space-s-2 p-2 rounded-t-xl">
                  <Button className="w-full" disabled={!isNeedSave} onClick={() => save()} loading={loading}>
                    ذخیره آخرین تغییرات
                  </Button>
                  <Button type="ghost" icon="interrogation">
                    راهنما
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex flex-col h-full rounded-t-2xl !bg-none -mt-1 lg:mt-0 lg:block lg:pb-10 lg:pt-[3.5rem] lg:rounded-2xl lg:max-h-[calc(100vh-5rem)] lg:max-w-[26.5rem] lg:bg-no-repeat lg:bg-top lg:bg-phone">
                <Seo page={page} title={`ویرایش ${page.title}`} noindex />
                <div className="flex-1 flex flex-col lg:h-[calc(100vh-8.75rem)] lg:max-h-[44.5rem] lg:overflow-y-scroll lg:ps-12 lg:pe-5 lg:me-3">
                  <div
                    dir={page.style?.display?.direction || 'rtl'}
                    className={classNames(
                      `font-${page.style?.display?.font || 'dana'}`,
                      'flex-1 -mx-3 pt-4 pb-32 px-2 rounded overflow-hidden lg:pb-4 lg:flex-none',
                      page.style?.background?.color ? `bg-${page.style.background.color} !px-3` : ''
                    )}
                  >
                    <PageHeader page={page} onEdit={openEditInfoModal} />
                    <Template page={page} sections={sections} onDragEnd={onDragEnd} openEditModal={openEditModal} />
                  </div>
                </div>
                <div className="lg:hidden fixed z-10 start-0 end-0 bottom-0 py-16 bg-gradient-to-t from-body to-transparent" />
                <div className="lg:hidden fixed z-20 start-0 end-0 bottom-0 bg-gradient-to-t from-white via-body">
                  <div className="relative z-30 container mx-auto p-4 space-y-2">
                    <Button type="ghost" icon="plus-small" className="w-full border border-line" onClick={openAddModal}>
                      افزودن بلوک
                    </Button>
                    <div className="flex space-s-2">
                      <Button
                        bordered
                        icon="eye"
                        type="secondary"
                        link={`/${page.slug}`}
                        target="_blank"
                        className="px-3 text-base option-btn bg-body bg-opacity-10 backdrop-filter backdrop-blur-md group"
                      />
                      <Button className="w-full" disabled={!isNeedSave} onClick={() => save()} loading={loading}>
                        ذخیره آخرین تغییرات
                      </Button>
                      <Button
                        bordered
                        type="secondary"
                        icon="interrogation"
                        className="px-3 text-base option-btn bg-body bg-opacity-10 backdrop-filter backdrop-blur-md group"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Editor>
      </Loader>
    </Layout>
  )
}

const Item = React.memo(function Component({ type, icon, label, onAddItem }) {
  return (
    <button
      className="flex flex-col items-center justify-center bg-white rounded-md py-4 hover:bg-body-hover transition ease-in-out duration-300 focus:outline-none"
      onClick={() => onAddItem(type)}
    >
      <Icon name={icon} className="text-lg" />
      <span className="mt-1">{label}</span>
    </button>
  )
})

export async function getServerSideProps({ params }) {
  const client = createApolloClient()
  const { data: dataPage, error: errorPage } = await client.query({
    query: SHOW_PAGE_WITH_SECTIONS_BY_SLUG,
    variables: {
      slug: params.slug
    }
  })

  if (dataPage?.showPageWithSectionsBySlug?.page && dataPage?.showPageWithSectionsBySlug?.sections && !errorPage) {
    return {
      props: {
        page: deepCleaner(dataPage.showPageWithSectionsBySlug.page),
        sections: deepCleaner(dataPage.showPageWithSectionsBySlug.sections),
        apolloState: client.cache.extract()
      }
    }
  }

  return {
    notFound: true
  }
}

export default Edit
