import React from 'react'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import { Tab } from '@headlessui/react'

// ** UI
import { Icon, Modal, Button, Avatar, Field, Upload, RadioGroup, Disclosure } from '../Tools'

// ** Template
import { AVATAR_POSITION, AVATAR_ROUNDED, COVER_ROUNDED } from './Customize/Handler'
import { ChooseColor } from './ChooseColor'

// ** Utils
import { getImgSrc } from '../../utils/getImgSrc'
import classNames from '../../utils/classNames'

// ** Validations
import { page as pageValidate } from '../../config/validations'

function EditInfo({ page, isOpenEditInfo, closeEditInfoModal, onEditInfo }) {
  return (
    <Modal tabMode labels={['ویرایش مشخصات', 'آواتار', 'سربرگ']} isOpen={isOpenEditInfo} closeModal={closeEditInfoModal} className="md:max-w-md">
      <Formik initialValues={{ avatar: { url: '' }, title: '', subTitle: '', ...page }} validationSchema={pageValidate} onSubmit={onEditInfo}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex-1 flex flex-col p-4 space-y-4">
            <Tab.Panels className="flex-1">
              <Tab.Panel className="space-y-4">
                <Upload.Single
                  type="profile"
                  pk={values.pk}
                  onChange={(url) => setFieldValue('avatar.url', url, false)}
                  className="w-20 h-20 mx-auto rounded-lg overflow-hidden"
                >
                  <Avatar url={values.avatar?.url} className="w-20 h-20 rounded-lg mx-auto mb-2" />
                  <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md transition duration-300" />
                </Upload.Single>
                <Field name="title" label="نام/عنوان" placeholder="لطفا نام/عنوان خود را وارد کنید ..." />
                <Field name="subTitle" label="زیر عنوان" placeholder="لطفا زیر عنوان خود را وارد کنید ..." />
              </Tab.Panel>
              <Tab.Panel className="space-y-4">
                <Disclosure label="رنگ عنوان">
                  <ChooseColor
                    nullable
                    active={values.avatar?.customize?.color}
                    setActive={(color) => setFieldValue('avatar.customize.color', color)}
                  />
                </Disclosure>
                <Disclosure label="رنگ زیر عنوان">
                  <ChooseColor
                    nullable
                    active={values.avatar?.customize?.second}
                    setActive={(color) => setFieldValue('avatar.customize.second', color)}
                  />
                </Disclosure>
                <Disclosure defaultOpen label="خمیدگی آواتار" className="radio-group">
                  <RadioGroup
                    options={AVATAR_ROUNDED}
                    value={values.avatar?.customize?.rounded}
                    onChange={(value) => setFieldValue('avatar.customize.rounded', value, false)}
                    className="!p-3"
                  />
                </Disclosure>
                <Disclosure defaultOpen label="مکان آواتار" className="radio-group">
                  <RadioGroup
                    options={AVATAR_POSITION(values.avatar?.customize?.rounded)}
                    value={values.avatar?.position}
                    onChange={(value) => setFieldValue('avatar.position', value, false)}
                    className="py-3 px-6"
                  />
                </Disclosure>
              </Tab.Panel>
              <Tab.Panel className="space-y-4">
                <Disclosure defaultOpen label="کاور سربرگ" className="upload">
                  <Upload.Single
                    pk={page.pk}
                    type="cover"
                    onChange={(url) => setFieldValue('style.cover.url', url, false)}
                    className={classNames(
                      'flex justify-center items-center border border-dashed border-line rounded-lg overflow-hidden',
                      values.style?.cover?.url ? '' : 'h-28'
                    )}
                  >
                    {values.style?.cover?.url ? (
                      <>
                        <Image
                          width={350}
                          height={110}
                          objectFit="cover"
                          className="rounded-lg"
                          src={getImgSrc(values.style?.cover?.url)}
                          alt="page background image"
                        />
                        <Button
                          bordered
                          roundless
                          type="ghost"
                          className="absolute z-30 top-10 py-1 text-xs !bg-content !text-white mix-blend-exclusion"
                          onClick={() => setFieldValue('style.cover.url', null, false)}
                        >
                          حذف کاور سربرگ
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-secondary">تصویری برای کاور سربرگ صفحه خود انتخاب کنید!</span>
                    )}
                    <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md" />
                  </Upload.Single>
                </Disclosure>
                <Disclosure defaultOpen label="طرح کاور سربرگ" className="radio-group">
                  <RadioGroup
                    options={COVER_ROUNDED}
                    value={values.style?.cover?.customize?.rounded}
                    onChange={(value) => setFieldValue('style.cover.customize.rounded', value, false)}
                    className="!p-4"
                  />
                </Disclosure>
              </Tab.Panel>
            </Tab.Panels>
            <div className="pb-8 md:pb-0">
              <Button className="w-full" loading={isSubmitting} htmlType="submit">
                ذخیره
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default React.memo(EditInfo)
