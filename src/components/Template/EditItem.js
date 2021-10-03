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
import { brands, services, contacts } from '../../config'

// ** UI
import { Button, Modal, Field, Listbox, Disclosure, Switch, Element, DragableList } from '../Tools'
import { EmojiOrIcon, EmojiSelector } from '../Tools/EmojiPicker'
// import generateDeepLink from '../../utils/generateDeepLink'

// ** Validations
import { section as sectionValidate } from '../../config/validations'

const dI = (item = {}) => ({ type: '', key: '', value: '', ...item })

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
      initialValues={{ type, title: '', items: [], ...data }}
      validationSchema={sectionValidate}
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
              <Button
                type="secondary"
                bordered
                className="w-full"
                onClick={() => arrayHelpers.push(dI({ options: [{ key: 'icon', value: 'link' }] }))}
              >
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
                  const selected = (value = values.items[idx]?.type) => contacts.find((item) => item.value === value)
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
                        options={contacts}
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
                onClick={() => arrayHelpers.push(dI({ type: contacts[0].value, key: contacts[0].label, options: contacts[0].options }))}
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
                  const selected = (value = values.items[idx]?.type) => services.find((item) => item.value === value)
                  // if (values.items[idx]?.type && values.items[idx]?.value) {
                  //   console.log(generateDeepLink(values.items[idx]?.type, values.items[idx]?.value))
                  // }
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
                        options={services}
                        value={values.items[idx]?.type}
                        renderLabel={({ option, selected }) => (
                          <Element
                            className="flex items-center -my-1 -mx-2 py-1.5 px-4"
                            customize={{ type: 'gradient', second: 'white', ...brands[option.value] }}
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
                onClick={() => arrayHelpers.push(dI({ type: services[0].value, key: services[0].label, options: services[0].options }))}
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
            position={[Number(values.items[0]?.value), Number(values.items[1]?.value)]}
            onChoose={(details) =>
              setFieldValue(
                'items',
                [{ key: 'lat', value: details.lat?.toString() }, { key: 'lng', value: details.lng?.toString() }, values.items[2]],
                false
              )
            }
            className="h-[20rem] flex-1 rounded-md z-0"
          />
          <Field name="items.2.value" label="عنوان آدرس" placeholder="عنوان آدرس را وارد کنید ..." />
          <EmojiFeild idx={2} values={values} setFieldValue={setFieldValue} />
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
              <Button type="secondary" bordered className="w-full" onClick={() => arrayHelpers.push(dI())}>
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
