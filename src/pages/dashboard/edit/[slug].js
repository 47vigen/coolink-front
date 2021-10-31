import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { useAuth } from '../../../context/auth'

// ** UI
import Layout from '../../../components/Layout'
import { Button, Icon, Loader } from '../../../components/Tools'
import ThemeColor from '../../../components/Tools/ThemeColor'

// ** Graphql
import { createApolloClient } from '../../../graphql/apollo'
import { SHOW_PAGE_WITH_SECTIONS } from '../../../graphql/queries'

// ** Utils
import deepCleaner from '../../../utils/deepCleaner'
import Editor from '../../../components/Editor'
import PageHeader from '../../../components/Layout/Header/PageHeader'
import Seo from '../../../config/seo'
import { Tab } from '@headlessui/react'
import classNames from '../../../utils/classNames'

// ** Template
const Template = dynamic(() => import('../../../components/Template'), {
  ssr: false
})

function Edit({ page, sections }) {
  const { loading } = useAuth()
  return (
    <Layout className="flex flex-col" dashboard footer={false}>
      <Loader loading={loading} className="w-full flex-1">
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
            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="flex-1 flex flex-col lg:pe-8 lg:space-y-4">
                <div className="flex items-center text-white space-s-2 bg-gradient-to-l from-primary to-primary-hover p-2 rounded-lg">
                  <Icon name="angle-small-left" />
                  <h3 className="flex-1 text-3xl font-bold">{page.slug}</h3>
                  <Button onClick={openEditStyleModal} icon="share" type="ghost">
                    انتشار
                  </Button>
                  <Button onClick={openEditStyleModal} icon="brush" type="ghost">
                    شخصی سازی
                  </Button>
                </div>
                <div className="hidden lg:!block">
                  <h3 className="flex-1 text-xl font-bold">افزودن بلاک</h3>
                  <p>
                    کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است که امکانات بی نظیری مثل اشتراک لینک‌ها، کانال‌های ارتباطی، دانلود پست ها و
                    ... در اختیار کاربران قرار می‌دهد.
                  </p>
                </div>
                <Tab.Group as="div" className="flex-1 hidden lg:!flex flex-col">
                  <Tab.List className="flex border-b border-line pb-2">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'px-2',
                          selected
                            ? 'font-bold text-primary relative after:block after:absolute after:start-2 after:end-2 after:-bottom-2 after:h-0.5 after:bg-primary after:rounded-t-full'
                            : ''
                        )
                      }
                    >
                      عمومی
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'px-2',
                          selected
                            ? 'font-bold text-primary relative after:block after:absolute after:start-2 after:end-2 after:-bottom-2 after:h-0.5 after:bg-primary after:rounded-t-full'
                            : ''
                        )
                      }
                    >
                      اینستاگرام
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="flex-1 pt-4">
                    <Tab.Panel className="grid grid-cols-3 gap-4">
                      <Item type="links" icon="link" label="لینک یا پیوند" onAddItem={onAddItem} />
                      <Item type="text" icon="document" label="متن یا توضیح" onAddItem={onAddItem} />
                      <Item type="contacts" icon="smartphone" label="اطلاعات تماس" onAddItem={onAddItem} />
                      <Item type="services" icon="comment" label="شبکه‌های‌اجتماعی و سرویس‌ها" onAddItem={onAddItem} />
                      <Item type="locations" icon="location-alt" label="مسیریابی" onAddItem={onAddItem} />
                      <Item type="faq" icon="interrogation" label="پرسش های پرتکرار" onAddItem={onAddItem} />
                    </Tab.Panel>
                    <Tab.Panel className="grid grid-cols-3 gap-4">
                      <Item type="igFeedsLink" icon="picture" label="لینک پست ها" onAddItem={onAddItem} />
                      <Item type="igFeedsDownload" icon="download" label="دانلود پست ها" onAddItem={onAddItem} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="hidden lg:!flex border border-b-0 border-line space-s-4 p-4 rounded-t-xl">
                  <Button className="w-full" disabled={!isNeedSave} onClick={() => save()} loading={loading}>
                    ذخیره آخرین تغییرات
                  </Button>
                  <Button type="ghost" icon="interrogation">
                    راهنما
                  </Button>
                </div>
              </div>
              <div className="flex-1 h-full pt-4 pb-24 lg:pb-10 lg:pt-[4.5rem] !bg-none lg:rounded-2xl lg:overflow-hidden lg:max-h-[calc(100vh-5rem)] lg:max-w-[26.5rem] lg:bg-no-repeat lg:bg-top lg:bg-phone">
                <ThemeColor page={page}>{(themeColor) => <NextSeo {...Seo(themeColor)} title={`ویرایش ${page.title}`} noindex />}</ThemeColor>
                <div className="lg:h-[calc(100vh-10rem)] lg:max-h-[44.5rem] lg:overflow-y-scroll lg:ps-12 lg:pe-5 lg:me-3 lg:rounded-b-3xl">
                  <PageHeader page={page} onEdit={openEditInfoModal} />
                  <Template page={page} sections={sections} onDragEnd={onDragEnd} openEditModal={openEditModal} />
                </div>
                <div className="lg:hidden fixed start-0 end-0 bottom-0 p-4 pt-10 space-y-2 bg-gradient-to-t from-white via-body">
                  <Button type="ghost" icon="plus-small" className="w-full" onClick={openAddModal}>
                    افزودن بلوک
                  </Button>
                  <div className="flex space-s-2">
                    <Button
                      bordered
                      icon="eye"
                      type="secondary"
                      link={`/${page.slug}`}
                      className="px-3 text-base option-btn bg-body bg-opacity-10 backdrop-filter backdrop-blur-md group"
                    />
                    <Button className="w-full" disabled={!isNeedSave} onClick={() => save()} loading={loading}>
                      ذخیره آخرین تغییرات
                    </Button>
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
    query: SHOW_PAGE_WITH_SECTIONS,
    variables: {
      slug: params.slug
    }
  })

  if (dataPage?.showPageWithSections?.page && dataPage?.showPageWithSections?.sections && !errorPage) {
    return {
      props: {
        page: deepCleaner(dataPage.showPageWithSections.page),
        sections: deepCleaner(dataPage.showPageWithSections.sections),
        apolloState: client.cache.extract()
      }
    }
  }

  return {
    notFound: true
  }
}

export default Edit
