import { useQuery } from '@apollo/client'
import { Disclosure, Transition } from '@headlessui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import Dashboard from '../../components/Layout/Dashboard'
import { Avatar, Button, Field, Icon, Listbox, Switch, Tab, Tabs } from '../../components/Tools'
import { SHOW_MY_PAGES } from '../../graphql/queries'
import classNames from '../../utils/classNames'

function ShortLink(props) {
  const { data: pages, loading: pagesLoading } = useQuery(SHOW_MY_PAGES, { fetchPolicy: 'cache-and-network' })

  const renderPage = React.useCallback(
    ({ option: { id, title, subTitle, avatar }, selected }) => (
      <div className="space-y-2 text-start" key={id}>
        <div className="flex items-center">
          <Avatar fullName={title} url={avatar?.url} className="min-w-[2rem] max-w-[2rem] min-h-[2rem] max-h-[2rem] me-2" />
          <h5 className="flex flex-col flex-1 truncate">{title}</h5>
        </div>
      </div>
    ),
    []
  )

  return (
    <Dashboard className="flex-1">
      <div className="text-white bg-gradient-to-tr from-primary to-primary-hover px-8 py-4 rounded-lg flex flex-col justify-center mb-4">
        <div className="flex items-baseline">
          <h1 className="text-4xl font-bold me-2">کولک،</h1>
          کوتاه‌کننده لینک
        </div>
      </div>
      <Formik initialValues={{ title: '', page: null, isDeep: true }} onSubmit={(values) => pushToSearch(values)}>
        {({ values, setFieldValue }) => (
          <Form>
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="flex items-center space-s-2">
                    <Field name="title" placeholder="لینک خود را وارد کنید ..." wrapperClassName="flex-1" errorless />
                    <Disclosure.Button as={Button} type="ghost" icon="settings"></Disclosure.Button>
                    <Button>کوتاه کن!</Button>
                  </div>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    enter="transition duration-75 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="origin-top mt-4 grid grid-cols-2 gap-4">
                      <Listbox
                        valueProp="id"
                        label="اتصال به صفحه کولینک"
                        onChange={(id) => setFieldValue('page', id, false)}
                        value={values?.page}
                        renderLabel={renderPage}
                        renderSelected={renderPage}
                        selectedClassName="!text-content"
                        options={[{ id: null, title: 'بدون اتصال' }, ...(pages?.showMyPages || [])]}
                      />
                      <Field name="slug" label="پیوند یکتا" placeholder="پیوند یکتا خود را وارد کنید" wrapperClassName="mt-auto" />
                      <div />
                      <Switch label="پشتیبانی از لینک عمیق" checked={values.isDeep} onChange={(e) => setFieldValue('isDeep', e, false)} />
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </Form>
        )}
      </Formik>
    </Dashboard>
  )
}

export default ShortLink
