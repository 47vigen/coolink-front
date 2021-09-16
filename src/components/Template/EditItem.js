import React from 'react'
import { Form, Formik, FieldArray } from 'formik'

// ** UI
import { Button, Modal, Icon, Field } from '../Tools'

// ** Validations
import * as Yup from 'yup'
const InsideValidationSchema = (type) => {
  switch (type) {
    case 'LINKS':
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

    case 'TEXT':
      return {
        text: Yup.string().required('متن الزامی است!')
      }

    case 'CONTACTS':
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

    case 'MESSANGERS':
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

    case 'LOCATIONS':
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

    case 'FAQ':
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

function EditItem({ isOpenEdit, closeEditModal, onEditItem, currentEditItem, onRemoveItem }) {
  return (
    <Modal label="ویرایش آپشن" isOpen={isOpenEdit} closeModal={() => closeEditModal(false)} className="max-w-sm">
      <div className="p-4">
        <RenderEditItem currentEditItem={currentEditItem} onEditItem={onEditItem} onRemoveItem={onRemoveItem} />
      </div>
    </Modal>
  )
}

const RenderEditItem = React.memo(function Component({ currentEditItem: { id, type, ...data }, onEditItem, onRemoveItem }) {
  return (
    <Formik
      initialValues={{ title: '', ...data }}
      validationSchema={Yup.object().shape({
        title: Yup.string(),
        ...InsideValidationSchema(type)
      })}
      onSubmit={(values) => onEditItem({ ...values, type, id })}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field name="title" label="عنوان بخش" placeholder="عنوان بخش را وارد کنید ..." className="bg-body" borderless />
          <InsideBody type={type} values={values} />
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

const InsideBody = React.memo(function Component({ type, values }) {
  switch (type) {
    case 'LINKS':
      return (
        <FieldArray
          name="links"
          render={(arrayHelpers) => (
            <>
              {values.links?.map((links, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center mb-0.5">
                      <span className="text-line text-xs italic">لینک #{index + 1}</span>
                      <span className="flex-1 border-b border-line mx-2" />
                      <Button className="text-danger" onClick={() => arrayHelpers.remove(index)} type="ghost">
                        <Icon name="trash" />
                      </Button>
                    </div>
                    <Field name={`links.${index}.url`} label="آدرس لینک" placeholder="آدرس لینک را وارد کنید ..." />
                    <Field name={`links.${index}.title`} label="عنوان لینک" placeholder="عنوان لینک را وارد کنید ..." />
                  </div>
                )
              })}
              <Button type="secondary" bordered className="w-full mb-4" onClick={() => arrayHelpers.push()}>
                ایجاد لینک
              </Button>
            </>
          )}
        />
      )

    case 'TEXT':
      return <Field name="text" label="متن" placeholder="متن را وارد کنید ..." textarea />

    case 'CONTACTS':
      return (
        <>
          <Field name="contacts.mobile" label="شماره همراه" placeholder="شماره همراه را وارد کنید ..." />
          <Field name="contacts.phone" label="شماره تلفن ثابت" placeholder="شماره تلفن‌ثابت را وارد کنید ..." />
          <Field name="contacts.email" label="ایمیل" placeholder="ایمیل را وارد کنید ..." />
          <Field name="contacts.fax" label="فکس" placeholder="فکس را وارد کنید ..." />
        </>
      )

    case 'MESSANGERS':
      return (
        <>
          <Field name="messengers.telegram" label="تلگرام" placeholder="آیدی تلگرام را وارد کنید ..." />
          <Field name="messengers.whatsapp" label="واتساپ" placeholder="شماره واتساپ را وارد کنید ..." />
          <Field name="messengers.twitter" label="توییتر" placeholder="آیدی توییتر را وارد کنید ..." />
          <Field name="messengers.youtube" label="یوتیوب" placeholder="آدرس یوتیوب را وارد کنید ..." />
          <Field name="messengers.linkedin" label="لینکدین" placeholder="آدرس لینکدین را وارد کنید ..." />
        </>
      )

    case 'LOCATIONS':
      return (
        <FieldArray
          name="locations"
          render={(arrayHelpers) => (
            <>
              {values.locations?.map((locations, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center mb-0.5">
                      <span className="text-line text-xs italic">موقعیت #{index + 1}</span>
                      <span className="flex-1 border-b border-line mx-2" />
                      <Button className="text-danger" onClick={() => arrayHelpers.remove(index)} type="ghost">
                        <Icon name="trash" />
                      </Button>
                    </div>
                    <Field name={`locations.${index}.url`} label="آدرس موقعیت" placeholder="آدرس موقعیت را وارد کنید ..." />
                    <Field name={`locations.${index}.title`} label="عنوان موقعیت" placeholder="عنوان موقعیت را وارد کنید ..." />
                  </div>
                )
              })}
              <Button type="secondary" bordered className="w-full mb-4" onClick={() => arrayHelpers.push()}>
                ایجاد موقعیت
              </Button>
            </>
          )}
        />
      )

    case 'FAQ':
      return (
        <>
          <FieldArray
            name="FAQ"
            render={(arrayHelpers) => (
              <>
                {values.faq?.map((faqs, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center mb-0.5">
                        <span className="text-line text-xs italic">پرسش‌وپاسخ #{index + 1}</span>
                        <span className="flex-1 border-b border-line mx-2" />
                        <Button className="text-danger" onClick={() => arrayHelpers.remove(index)} type="ghost">
                          <Icon name="trash" />
                        </Button>
                      </div>
                      <Field name={`faq.${index}.question`} placeholder="پرسش را وارد کنید ..." className="pr-10">
                        <span className="absolute top-1.5 p-1 bg-body right-1 w-8 rounded-md text-center text-line font-bold">Q</span>
                      </Field>
                      <Field name={`faq.${index}.answer`} placeholder="پاسخ را وارد کنید ..." className="pr-10" textarea>
                        <span className="absolute top-1.5 p-1 bg-body right-1 w-8 rounded-md text-center text-line font-bold">A</span>
                      </Field>
                    </div>
                  )
                })}
                <Button type="secondary" bordered className="w-full mb-4" onClick={() => arrayHelpers.push()}>
                  ایجاد پرسش‌وپاسخ
                </Button>
              </>
            )}
          />
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

export default EditItem
