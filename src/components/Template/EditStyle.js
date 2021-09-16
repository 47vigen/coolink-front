import React from 'react'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import { Disclosure } from '@headlessui/react'

// ** UI
import { Icon, Modal, Button, Upload } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'
import { getPalette } from '../../utils/getColors'

// ** Validations
import * as Yup from 'yup'
const validationSchema = Yup.object().shape({
  color: Yup.string().nullable(),
  backgroundImage: Yup.string().nullable()
})

function EditStyle({ isOpenEditStyle, closeEditStyleModal, pk, customize, onEditStyle }) {
  return (
    <Modal label="ویرایش ظاهر" isOpen={isOpenEditStyle} closeModal={closeEditStyleModal} className="max-w-sm">
      <Formik initialValues={{ color: '', backgroundImage: '', ...customize }} validationSchema={validationSchema} onSubmit={onEditStyle}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="p-4 space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center border border-line transition duration-300 hover:opacity-70 rounded-lg py-2 px-4">
                    رنگ اصلی
                    <Icon
                      name="angle-small-left"
                      className={classNames('text-base transition-all duration-300', open ? 'transform -rotate-90' : '')}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="p-4 leading-6 border border-line rounded-lg">
                    <div className="grid grid-cols-5 gap-2">
                      {getPalette().map(({ class: color }) => {
                        return <ColorItem key={color} color={color} active={values.color} setActive={() => setFieldValue('color', color)} />
                      })}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center border border-line transition duration-300 hover:opacity-70 rounded-lg py-2 px-4">
                    پس زمینه
                    <Icon
                      name="angle-small-left"
                      className={classNames('text-base transition-all duration-300', open ? 'transform -rotate-90' : '')}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <Upload.Single
                      pk={pk}
                      type="BACKGROUND"
                      onChange={(url) => setFieldValue('backgroundImage', url, false)}
                      className={classNames(
                        'flex justify-center items-center border border-dashed border-line rounded-lg overflow-hidden',
                        values.backgroundImage ? '' : 'h-28'
                      )}
                    >
                      {values.backgroundImage ? (
                        <>
                          <Image
                            width={350}
                            height={110}
                            objectFit="cover"
                            className="rounded-lg"
                            src={getImgSrc(values.backgroundImage)}
                            alt="page background image"
                          />
                          <Button
                            bordered
                            roundless
                            type="ghost"
                            className="absolute z-30 top-10 py-1 text-xs !bg-content !text-white mix-blend-exclusion"
                            onClick={() => setFieldValue('backgroundImage', null, false)}
                          >
                            حذف پس زمینه
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm text-line">تصویری برای پس زمینه صفحه خود انتخاب کنید!</span>
                      )}
                      <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-md" />
                    </Upload.Single>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Button className="w-full" loading={isSubmitting} htmlType="submit">
              ذخیره
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

const ColorItem = ({ color, active, setActive }) => {
  return (
    <button
      type="button"
      className={`bg-${color} h-12 text-white flex justify-center items-center rounded-md transition duration-300 hover:opacity-70`}
      onClick={setActive}
    >
      {active === color ? <Icon name="check" className="text-base" /> : null}
    </button>
  )
}

export default EditStyle
