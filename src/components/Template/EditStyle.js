import React from 'react'
// import Image from 'next/image'
import { Form, Formik } from 'formik'
import { Tab } from '@headlessui/react'

// ** UI
import { Icon, Modal, Button, Upload, Disclosure, RadioGroup } from '../Tools'

// ** Template
import { ChooseColor } from './ChooseColor'
import { DIRECTIIONS, DEFAULT_CUSTOMIZE, DefaultCustomize, FONTS } from './Customize/Handler'

// ** Utils
// import classNames from '../../utils/classNames'
// import { getImgSrc } from '../../utils/getImgSrc'

// ** Validations
import { style as styleValidate } from '../../config/validations'

function EditStyle({ isOpenEditStyle, closeEditStyleModal, pk, style, onEditStyle }) {
  return (
    <Modal tabMode labels={['ظاهر پیشفرض آیتم ها', 'ظاهر کلی']} isOpen={isOpenEditStyle} closeModal={closeEditStyleModal} className="md:max-w-md">
      <Formik
        initialValues={{ customize: DEFAULT_CUSTOMIZE, background: { url: '', color: '' }, display: { direction: 'rtl', font: 'dana' }, ...style }}
        validationSchema={styleValidate}
        onSubmit={onEditStyle}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex-1 flex flex-col p-4 space-y-4">
            <Tab.Panels className="flex-1">
              <Tab.Panel className="space-y-4">
                <DefaultCustomize values={values} setFieldValue={setFieldValue} />
              </Tab.Panel>
              <Tab.Panel className="space-y-4">
                <Disclosure label="فونت صفحه" className="radio-group">
                  <RadioGroup
                    options={FONTS}
                    value={values?.display?.font}
                    onChange={(value) => setFieldValue('display.font', value, false)}
                    className="py-3 px-6 w-full"
                    wrapperClassName="space-y-2"
                  />
                </Disclosure>
                <Disclosure label="رنگ عنوان بلوک ها">
                  <ChooseColor nullable active={values.titles?.color} setActive={(color) => setFieldValue('titles.color', color)} />
                </Disclosure>
                <Disclosure label="رنگ پس زمینه">
                  <ChooseColor nullable active={values.background?.color} setActive={(color) => setFieldValue('background.color', color)} />
                </Disclosure>
                <Disclosure label="تراز محتوا" className="radio-group">
                  <RadioGroup
                    options={DIRECTIIONS}
                    value={values?.display?.direction}
                    onChange={(value) => setFieldValue('display.direction', value, false)}
                    className="py-3 px-6"
                  />
                </Disclosure>
                {/* <Disclosure label="تصویر پس زمینه" className="upload">
                  <Upload.Single
                    pk={pk}
                    type="background"
                    onChange={(url) => setFieldValue('background.url', url, false)}
                    className={classNames(
                      'flex justify-center items-center border border-dashed border-line rounded-lg overflow-hidden',
                      values.background?.url ? '' : 'h-28'
                    )}
                  >
                    {values.background?.url ? (
                      <>
                        <Image
                          width={350}
                          height={110}
                          objectFit="cover"
                          className="rounded-lg"
                          src={getImgSrc(values.background?.url)}
                          alt="page background image"
                        />
                        <Button
                          bordered
                          roundless
                          type="ghost"
                          className="absolute z-30 top-10 py-1 text-xs !bg-content !text-white mix-blend-exclusion"
                          onClick={() => setFieldValue('background.url', null, false)}
                        >
                          حذف پس زمینه
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-secondary">تصویری برای پس زمینه صفحه خود انتخاب کنید!</span>
                    )}
                    <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md" />
                  </Upload.Single>
                </Disclosure> */}
              </Tab.Panel>
            </Tab.Panels>
            <Button className="w-full" loading={isSubmitting} htmlType="submit">
              ذخیره
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default React.memo(EditStyle)
