import React from 'react'
import { Tab } from '@headlessui/react'
import { Form, Formik, FieldArray } from 'formik'
import dynamic from 'next/dynamic'
const ChoosableMap = dynamic(() => import('../Tools/Map/ChoosableMap'), {
  ssr: false
})

// ** Template
import Customize from './Customize'

// ** Config
import { BRANDS } from '../../config'

// ** UI
import { Button, Modal, Field, Listbox, Disclosure, Switch, Element, DragableList } from '../Tools'
import { EmojiOrIcon, EmojiSelector } from '../Tools/EmojiPicker'

// ** Validations
import * as Yup from 'yup'
const InsideValidationSchema = (type) => {
  switch (type) {
    case 'links':
      return {
        links: Yup.array()
          .required()
          .min(1)
          .of(
            Yup.object()
              .required()
              .shape({
                url: Yup.string()
                  .required('آدرس لینک الزامی است!')
                  .matches(
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                    'آدرس لینک وارد شده صحیح نمی‌باشد!'
                  ),
                title: Yup.string().required('عنوان لینک الزامی است!')
              })
          )
      }

    case 'text':
      return {
        text: Yup.string().required('متن الزامی است!')
      }

    case 'contacts':
      return {
        contacts: Yup.object()
          .required()
          .test('contacts', '', (values) => {
            if (!values) return false

            const checkObject = Object.values(Object.fromEntries(Object.entries(values).filter(([_, v]) => v && v))).length

            return checkObject
          })
          .shape({
            mobile: Yup.string().matches(/^(09)\d{9}$/g, 'شماره همراه وارد شده صحیح نمی‌باشد'),
            phone: Yup.string().matches(/^(0)\d{10}$/g, 'شماره تلفن‌ثابت وارد شده صحیح نمی‌باشد'),
            email: Yup.string().email('ایمیل وارد شده صحیح نمی‌باشد'),
            fax: Yup.string()
          })
      }

    case 'messengers':
      return {
        messengers: Yup.object()
          .required()
          .test('messengers', '', (values) => {
            if (!values) return false

            const checkObject = Object.values(Object.fromEntries(Object.entries(values).filter(([_, v]) => v && v))).length

            return checkObject
          })
          .shape({
            telegram: Yup.string().matches(/^(?!\d)(?:(?![@#])[\w])+$/gi, 'آیدی تلگرام وارد شده صحیح نمی‌باشد'),
            whatsapp: Yup.string().matches(/^(09)\d{9}$/g, 'شماره واتساپ وارد شده صحیح نمی‌باشد'),
            twitter: Yup.string().matches(/^@?(\w){1,15}$/gi, 'آیدی توییتر وارد شده صحیح نمی‌باشد'),
            youtube: Yup.string().matches(/(https?:\/\/)?(www\.)?youtube\.com\/(channel|user)\/[\w-]+/gi, 'آدرس یوتیوب وارد شده صحیح نمی‌باشد'),
            linkedin: Yup.string().matches(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/gi, 'آدرس لینکدین وارد شده صحیح نمی‌باشد')
          })
      }

    case 'locations':
      return {
        locations: Yup.array()
          .required()
          .min(1, 'حداقل یک مورد نیاز است!')
          .of(
            Yup.object()
              .required()
              .shape({
                url: Yup.string()
                  .required('آدرس موقعیت الزامی است!')
                  .matches(
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                    'آدرس موقعیت وارد شده صحیح نمی‌باشد!'
                  ),
                title: Yup.string().required('عنوان موقعیت الزامی است!')
              })
          )
      }

    case 'faq':
      return {
        faq: Yup.array()
          .required()
          .min(1)
          .of(
            Yup.object()
              .required()
              .shape({
                question: Yup.string().required('پرسش الزامی است!'),
                answer: Yup.string().required('پاسخ الزامی است!')
              })
          )
      }

    default:
      return null
  }
}

const CONTACTS_TYPE = [
  {
    label: 'شماره همراه',
    value: 'mobile',
    options: [{ key: 'icon', value: 'smartphone' }]
  },
  {
    label: 'شماره تلفن ثابت',
    value: 'phone',
    options: [{ key: 'icon', value: 'building' }]
  },
  {
    label: 'ایمیل',
    value: 'email',
    options: [{ key: 'icon', value: 'envelope' }]
  },
  {
    label: 'فکس',
    value: 'fax',
    options: [{ key: 'icon', value: 'print' }]
  }
]

const SERVISES_TYPE = [
  {
    label: 'تلگرام',
    value: 'telegram',
    options: [
      {
        key: 'icon',
        value: 'brand-telegram'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'دیسکورد',
    value: 'discord',
    options: [
      {
        key: 'icon',
        value: 'brand-discord'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اسکایپ',
    value: 'skype',
    options: [
      {
        key: 'icon',
        value: 'brand-skype'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'فیسبوک',
    value: 'facebook',
    options: [
      {
        key: 'icon',
        value: 'brand-facebook'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'واتساپ',
    value: 'whatsapp',
    options: [
      {
        key: 'icon',
        value: 'brand-whatsapp'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'کیک',
    value: 'kik',
    options: [
      {
        key: 'icon',
        value: 'brand-kik'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'لاین',
    value: 'line',
    options: [
      {
        key: 'icon',
        value: 'brand-line'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'وایبر',
    value: 'viber',
    options: [
      {
        key: 'icon',
        value: 'brand-viber'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اینستاگرام',
    value: 'instagram',
    options: [
      {
        key: 'icon',
        value: 'brand-instagram'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'یوتیوب',
    value: 'youtube',
    options: [
      {
        key: 'icon',
        value: 'brand-youtube'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'آپارات',
    value: 'aparat',
    options: [
      {
        key: 'icon',
        value: 'brand-aparat'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'توییتر',
    value: 'twitter',
    options: [
      {
        key: 'icon',
        value: 'brand-twitter'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'لینکدین',
    value: 'linkedin',
    options: [
      {
        key: 'icon',
        value: 'brand-linkedin'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'کلاب هوس',
    value: 'clubhouse',
    options: [
      {
        key: 'emoji',
        value: 'wave'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'توییچ',
    value: 'twitch',
    options: [
      {
        key: 'icon',
        value: 'brand-twitch'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'پاترئون',
    value: 'patreon',
    options: [
      {
        key: 'icon',
        value: 'brand-patreon'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'پینترست',
    value: 'pinterest',
    options: [
      {
        key: 'icon',
        value: 'brand-pinterest'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'تیک تاک',
    value: 'tiktok',
    options: [
      {
        key: 'icon',
        value: 'brand-tiktok'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'انکر',
    value: 'anchor',
    options: [
      {
        key: 'icon',
        value: 'brand-anchor'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'بریکر',
    value: 'breaker',
    options: [
      {
        key: 'icon',
        value: 'brand-breaker'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اپل موزیک',
    value: 'applemusic',
    options: [
      {
        key: 'icon',
        value: 'brand-applemusic'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'کست باکس',
    value: 'castbox',
    options: [
      {
        key: 'icon',
        value: 'brand-castbox'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'گوگل پادکست',
    value: 'googlepodcasts',
    options: [
      {
        key: 'icon',
        value: 'brand-googlepodcasts'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'آیتونز',
    value: 'itunes',
    options: [
      {
        key: 'icon',
        value: 'brand-itunes'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اورکست',
    value: 'overcast',
    options: [
      {
        key: 'icon',
        value: 'brand-overcast'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'پاکت کستس',
    value: 'pocketcasts',
    options: [
      {
        key: 'icon',
        value: 'brand-pocketcasts'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'پادبین',
    value: 'podbean',
    options: [
      {
        key: 'icon',
        value: 'brand-podbean'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'رادیو پابلیک',
    value: 'radiopublic',
    options: [
      {
        key: 'icon',
        value: 'brand-radiopublic'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'ساوند کلاد',
    value: 'soundcloud',
    options: [
      {
        key: 'icon',
        value: 'brand-soundcloud'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اسپاتیفای',
    value: 'spotify',
    options: [
      {
        key: 'icon',
        value: 'brand-spotify'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'استیتچر',
    value: 'stitcher',
    options: [
      {
        key: 'icon',
        value: 'brand-stitcher'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'کافه بازار',
    value: 'cafebazaar',
    options: [
      {
        key: 'icon',
        value: 'brand-cafebazaar'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'گوگل پلی',
    value: 'googleplay',
    options: [
      {
        key: 'icon',
        value: 'brand-googleplay'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'اپ استور',
    value: 'appstore',
    options: [
      {
        key: 'icon',
        value: 'brand-appstore'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'مایکت',
    value: 'myket',
    options: [
      {
        key: 'icon',
        value: 'brand-myket'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'لپس',
    value: 'lapps',
    options: [
      {
        key: 'icon',
        value: 'brand-lapps'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'سیب اپ',
    value: 'sibapp',
    options: [
      {
        key: 'icon',
        value: 'brand-sibapp'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'بیهنس',
    value: 'behance',
    options: [
      {
        key: 'icon',
        value: 'brand-behance'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  },
  {
    label: 'دریبل',
    value: 'dribbble',
    options: [
      {
        key: 'icon',
        value: 'brand-dribbble'
      },
      {
        key: 'brandStyle',
        value: '0'
      }
    ]
  }
]

function EditItem({ page, isOpenEdit, closeEditModal, onEditItem, currentEditItem, onRemoveItem }) {
  return (
    <Modal tabMode labels={['ویرایش آپشن', 'سفارشی سازی']} isOpen={isOpenEdit} closeModal={() => closeEditModal(false)} className="max-w-sm">
      <div className="p-4">
        <RenderEditItem page={page} currentEditItem={currentEditItem} onEditItem={onEditItem} onRemoveItem={onRemoveItem} />
      </div>
    </Modal>
  )
}

const RenderEditItem = React.memo(function Component({ page, currentEditItem: { id, type, ...data }, onEditItem, onRemoveItem }) {
  return (
    <Formik
      initialValues={{ title: '', items: [], ...data }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
        // ...InsideValidationSchema(type)
      })}
      onSubmit={(values) => onEditItem({ ...values, type, id })}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="space-y-4">
          <Tab.Panels>
            <Tab.Panel className="space-y-4">
              <InsideBody type={type} values={values} setFieldValue={setFieldValue} />
            </Tab.Panel>
            <Tab.Panel className="space-y-4">
              <Field name="title" label="عنوان بخش" placeholder="عنوان بخش را وارد کنید ..." />
              <Customize type={type} page={page} values={values} setFieldValue={setFieldValue} />
            </Tab.Panel>
          </Tab.Panels>
          <div className="flex space-s-2">
            <Button className="w-full" loading={isSubmitting} htmlType="submit">
              ذخیره
            </Button>
            <Button
              bordered
              autoLoading
              icon="trash"
              type="secondary"
              className="text-base !text-danger"
              onClick={async () => await onRemoveItem(id)}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
})

const InsideBody = React.memo(function Component({ type, values, setFieldValue }) {
  switch (type) {
    case 'links':
      return (
        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <>
              <DragableList list={values.items} onChange={(items) => setFieldValue('items', items, false)}>
                {({ item, idx, dragHandleProps, onOpenDisclosure, canDrag }) => (
                  <Disclosure
                    label={`لینک #${idx + 1}`}
                    dragable={{ canDrag, dragHandleProps }}
                    isOpen={(open) => onOpenDisclosure(open)}
                    className="space-y-4 border border-line rounded-lg p-4 mt-4"
                    extera={
                      <Button
                        icon="trash"
                        className="text-danger border-line border-s !rounded-none self-stretch"
                        onClick={() => arrayHelpers.remove(idx)}
                        type="ghost"
                      />
                    }
                  >
                    <Field name={`items.${idx}.key`} label="عنوان لینک" placeholder="عنوان لینک را وارد کنید ..." />
                    <Field name={`items.${idx}.value`} label="آدرس لینک" placeholder="آدرس لینک را وارد کنید ..." />
                    <Switch
                      label="این لینک اجبارا خارج از اینستاگرام باز شود؟"
                      checked={values.items[idx].options[1]?.value === '1'}
                      onChange={(toggle) => setFieldValue(`items.${idx}.options.1`, { key: 'redirect', value: toggle ? '1' : '0' }, false)}
                    />
                    <EmojiFeild idx={idx} values={values} setFieldValue={setFieldValue} />
                  </Disclosure>
                )}
              </DragableList>
              <Button type="secondary" bordered className="w-full" onClick={() => arrayHelpers.push({ options: [{ key: 'icon', value: 'link' }] })}>
                ایجاد لینک
              </Button>
            </>
          )}
        />
      )

    case 'text':
      return <Field name="items.0.value" label="متن" placeholder="متن را وارد کنید ..." textarea row={5} />

    case 'contacts':
      return (
        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <>
              <DragableList list={values.items} onChange={(items) => setFieldValue('items', items, false)}>
                {({ item, idx, dragHandleProps, onOpenDisclosure, canDrag }) => {
                  const selected = (value = values.items[idx]?.type) => CONTACTS_TYPE.find((item) => item.value === value)
                  return (
                    <Disclosure
                      dragable={{ canDrag, dragHandleProps }}
                      isOpen={(open) => onOpenDisclosure(open)}
                      label={values.items[idx]?.key || selected().label}
                      className="space-y-4 border border-line rounded-lg p-4 mt-4"
                      extera={
                        <Button
                          icon="trash"
                          className="text-danger border-line border-s !rounded-none self-stretch"
                          onClick={() => arrayHelpers.remove(idx)}
                          type="ghost"
                        />
                      }
                    >
                      <Listbox
                        label="راه ارتباطی"
                        options={CONTACTS_TYPE}
                        value={values.items[idx]?.type}
                        onChange={(value) =>
                          setFieldValue(
                            `items.${idx}`,
                            { ...values.items[idx], type: value, key: selected(value).label, options: selected(value).options },
                            false
                          )
                        }
                      />
                      <Field name={`items.${idx}.key`} label="عنوان" placeholder="عنوان را وارد کنید ..." />
                      <Field name={`items.${idx}.value`} label={selected().label} placeholder={`${selected().label} را وارد کنید ...`} />
                      <EmojiFeild idx={idx} values={values} setFieldValue={setFieldValue} />
                    </Disclosure>
                  )
                }}
              </DragableList>
              <Button
                bordered
                type="secondary"
                className="w-full"
                onClick={() => arrayHelpers.push({ type: CONTACTS_TYPE[0].value, key: CONTACTS_TYPE[0].label, options: CONTACTS_TYPE[0].options })}
              >
                ایجاد راه ارتباطی
              </Button>
            </>
          )}
        />
      )

    case 'services':
      return (
        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <>
              <DragableList list={values.items} onChange={(items) => setFieldValue('items', items, false)}>
                {({ item, idx, dragHandleProps, onOpenDisclosure, canDrag }) => {
                  const selected = (value = values.items[idx]?.type) => SERVISES_TYPE.find((item) => item.value === value)
                  return (
                    <Disclosure
                      dragable={{ canDrag, dragHandleProps }}
                      isOpen={(open) => onOpenDisclosure(open)}
                      label={values.items[idx]?.key || selected().label}
                      className="space-y-4 border border-line rounded-lg p-4 mt-4"
                      extera={
                        <Button
                          icon="trash"
                          className="text-danger border-line border-s !rounded-none self-stretch"
                          onClick={() => arrayHelpers.remove(idx)}
                          type="ghost"
                        />
                      }
                    >
                      <Listbox
                        label="سرویس ها"
                        options={SERVISES_TYPE}
                        value={values.items[idx]?.type}
                        renderLabel={({ option, selected }) => (
                          <Element
                            className="flex items-center -my-1 -mx-2 py-1.5 px-4"
                            customize={{ type: 'gradient', second: 'white', ...BRANDS[option.value] }}
                          >
                            <span className="emoji-or-icon flex items-center me-2">
                              <EmojiOrIcon
                                size={20}
                                type={option.options[0].key}
                                name={option.options[0].value}
                                className="text-base flex items-center"
                              />
                            </span>
                            {option.label}
                          </Element>
                        )}
                        onChange={(value) =>
                          setFieldValue(
                            `items.${idx}`,
                            { ...values.items[idx], type: value, key: selected(value).label, options: selected(value).options },
                            false
                          )
                        }
                      />
                      <Field name={`items.${idx}.key`} label="عنوان" placeholder="عنوان را وارد کنید ..." />
                      <Field name={`items.${idx}.value`} label={selected().label} placeholder={`${selected().label} را وارد کنید ...`} />
                      <Switch
                        label="از رنگ‌بندی برند استفاده شود؟"
                        checked={values.items[idx].options[1]?.value === '1'}
                        onChange={(toggle) => setFieldValue(`items.${idx}.options.1`, { key: 'brandStyle', value: toggle ? '1' : '0' }, false)}
                      />
                      <EmojiFeild idx={idx} values={values} setFieldValue={setFieldValue} />
                    </Disclosure>
                  )
                }}
              </DragableList>
              <Button
                bordered
                type="secondary"
                className="w-full"
                onClick={() => arrayHelpers.push({ type: SERVISES_TYPE[0].value, key: SERVISES_TYPE[0].label, options: SERVISES_TYPE[0].options })}
              >
                ایجاد سرویس جدید
              </Button>
            </>
          )}
        />
      )

    case 'locations':
      return (
        <>
          <ChoosableMap
            position={[values.items ? Number(values.items[0]?.value) : null, values.items ? Number(values.items[1]?.value) : null]}
            onChoose={(details) =>
              setFieldValue(
                'items',
                [
                  { key: 'lat', value: details.lat?.toString() },
                  { key: 'lng', value: details.lng?.toString() },
                  { key: 'originalAddress', value: details.originalAddress }
                ],
                false
              )
            }
            className="h-[20rem] flex-1 rounded-md z-0"
          />
          {values.items && values.items[2]?.value ? (
            <Field textarea row={3} name="items.2.value" label="آدرس" placeholder="آدرس را وارد کنید ..." />
          ) : null}
        </>
      )

    case 'faq':
      return (
        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <>
              <DragableList list={values.items} onChange={(items) => setFieldValue('items', items, false)}>
                {({ item, idx, dragHandleProps, onOpenDisclosure, canDrag }) => (
                  <Disclosure
                    dragable={{ canDrag, dragHandleProps }}
                    isOpen={(open) => onOpenDisclosure(open)}
                    label={values.items[idx]?.key || `پرسش‌وپاسخ #${idx + 1}`}
                    className="space-y-4 border border-line rounded-lg p-4 mt-4"
                    extera={
                      <Button
                        icon="trash"
                        className="text-danger border-line border-s !rounded-none self-stretch"
                        onClick={() => arrayHelpers.remove(idx)}
                        type="ghost"
                      />
                    }
                  >
                    <Field name={`items.${idx}.key`} placeholder="پرسش را وارد کنید ..." className="ps-10">
                      <span className="absolute top-1 p-1 bg-body start-1 w-8 rounded-md text-center text-content font-bold text-xs">Q</span>
                    </Field>
                    <Field name={`items.${idx}.value`} placeholder="پاسخ را وارد کنید ..." className="ps-10" textarea row={5}>
                      <span className="absolute top-1 p-1 bg-body start-1 w-8 rounded-md text-center text-content font-bold text-xs">A</span>
                    </Field>
                  </Disclosure>
                )}
              </DragableList>
              <Button type="secondary" bordered className="w-full" onClick={() => arrayHelpers.push()}>
                ایجاد پرسش‌وپاسخ
              </Button>
            </>
          )}
        />
      )

    case 'igFeedsLink':
      return (
        <>
          <Field name="items.0.key" label="عنوان" placeholder="عنوان را وارد کنید ..." />
          <EmojiFeild idx={0} values={values} setFieldValue={setFieldValue} />
        </>
      )

    case 'igFeedsDownload':
      return (
        <>
          <Field name="items.0.key" label="عنوان" placeholder="عنوان را وارد کنید ..." />
          <EmojiFeild idx={0} values={values} setFieldValue={setFieldValue} />
        </>
      )

    default:
      return (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg mb-4 p-4" role="alert">
          تنظیماتی برای این آپشن وجود ندارد!
        </div>
      )
  }
})

const EmojiFeild = React.memo(function Component({ idx, values, setFieldValue }) {
  const selected = React.useMemo(() => values.items[idx]?.options[0], [idx, values])
  const iconLabel = React.useMemo(
    () => selected?.value?.split('|')[0]?.replace(/-/g, ' ')?.replace(/_/g, ' ')?.replace('brand', '')?.trim() || 'انتخاب آیکون',
    [selected]
  )
  const select = React.useCallback((value) => setFieldValue(`items.${idx}.options.0`, value, false), [idx, setFieldValue])

  return (
    <Disclosure
      label={
        <>
          <EmojiOrIcon size={20} type={selected?.key} name={selected?.value} className="text-base flex items-center" />
          <span className="capitalize">{iconLabel}</span>
        </>
      }
      extera={
        selected?.value ? (
          <Button icon="trash" className="text-danger border-line border-s !rounded-none self-stretch" onClick={() => select(null)} type="ghost" />
        ) : null
      }
      className="emoji"
    >
      <EmojiSelector onSelect={(value) => select({ key: value.type, value: value.name })} />
    </Disclosure>
  )
})

export default React.memo(EditItem)
