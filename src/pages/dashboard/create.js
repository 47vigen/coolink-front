import React from 'react'
import { NextSeo } from 'next-seo'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { usePalette } from 'react-palette'
import { useAuth } from '../../context/auth'

// ** UI
import Layout from '../../components/Layout'
import { Avatar, Field, Upload, Button, Icon, Loader } from '../../components/Tools'

// ** Grapgql
import { useMutation } from '@apollo/client'
import { CREATE_PAGE, GET_PAGE_INFO, UPLOAD_IMAGE } from '../../graphql/mutations'

// ** Utils
import classNames from '../../utils/classNames'
import { getSimilarColor } from '../../utils/getColors'
import { getFileBase } from '../../utils/fileBase'

// ** Validations
import * as Yup from 'yup'
const validationSchema = (step) =>
  Yup.object().shape(
    step === 0
      ? {
          username: Yup.string()
            .required('آیدی اینستاگرام الزامی است!')
            .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gi, 'آیدی اینستاگرام وارد شده صحیح نمی‌باشد!')
        }
      : {
          pk: Yup.string().required(),
          slug: Yup.string()
            .required('آیدی کولینک الزامی است!')
            .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gi, 'آیدی کولینک وارد شده صحیح نمی‌باشد!'),
          title: Yup.string().required('نام/عنوان الزامی است!'),
          subTitle: Yup.string(),
          avatar: Yup.object().shape({
            url: Yup.string()
          }),
          style: Yup.object().shape({
            customize: Yup.object().shape({
              color: Yup.string()
            })
          })
        }
  )

function Create(props) {
  const { loading } = useAuth()
  const ref = React.useRef()
  const Router = useRouter()
  const [step, setStep] = React.useState(0)
  const [getPageInfo] = useMutation(GET_PAGE_INFO)
  const [createPage] = useMutation(CREATE_PAGE)
  const [uploadImage] = useMutation(UPLOAD_IMAGE)
  const { data: dominantColor } = usePalette(ref.current?.values.avatar?.url)

  const uploadBase64Image = React.useCallback(
    async (pk, dataurl) => {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      const image = new File([u8arr], 'fake.jpg', { type: mime })
      const { data } = await uploadImage({ variables: { type: 'profile', pk, image } })
      return data.uploadImage
    },
    [uploadImage]
  )

  const onSubmit = React.useCallback(
    async ({ username, avatar, ...values }) => {
      if (step === 0) {
        try {
          const {
            data: { getPageInfo: getPageInfoData }
          } = await getPageInfo({ variables: { username } })
          const { base64 } = await getFileBase(getPageInfoData.profilePic)
          ref.current.setValues({ pk: getPageInfoData.pk, title: getPageInfoData.fullName, slug: username, avatar: { url: base64 } })
          setStep(1)
        } catch (err) {
          return console.log(err)
        }
      } else {
        try {
          setStep(2)
          const newAvatarUrl = avatar.url?.includes('base64') ? await uploadBase64Image(values.pk, avatar.url) : avatar.url
          await createPage({ variables: { pageInput: { ...values, avatar: { url: newAvatarUrl } } } })
          return await Router.push('/dashboard')
        } catch (err) {
          setStep(1)
          return console.log(err)
        }
      }
    },
    [step, Router, createPage, getPageInfo, uploadBase64Image]
  )

  React.useEffect(() => {
    if (dominantColor?.vibrant) {
      const similarColor = getSimilarColor(dominantColor.vibrant)
      ref.current.setFieldValue('style.customize.color', similarColor.class, false)
    }
  }, [dominantColor])

  return (
    <Layout dashboard>
      <NextSeo title="ایجاد کولینک" noindex />
      <div className="flex space-s-2 mb-4">
        <StepItem label="تایید آیدی" num={0} step={step} />
        <StepItem label="تکمیل اطلاعات" num={1} step={step} />
      </div>
      <Loader loading={loading} className="bg-white rounded-lg p-4">
        <Formik
          innerRef={ref}
          initialValues={{
            pk: '',
            slug: '',
            title: '',
            subTitle: '',
            username: ''
          }}
          validationSchema={validationSchema(step)}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {step === 0 ? (
                <>
                  <Field name="username" label="آیدی اینستاگرام" placeholder="لطفا آیدی اینستاگرام خود را وارد کنید ..." />
                  <Button className="px-4" loading={isSubmitting} htmlType="submit">
                    تایید
                  </Button>
                </>
              ) : (
                <>
                  <Upload.Single
                    type="profile"
                    pk={values.pk}
                    onChange={(url) => setFieldValue('avatar.url', url, false)}
                    className="w-20 h-20 mx-auto rounded-lg overflow-hidden"
                  >
                    <Avatar url={values.avatar?.url} fullName={values.title} className="w-20 h-20 rounded-lg mx-auto mb-2" />
                    <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md transition duration-300" />
                  </Upload.Single>
                  <Field name="slug" label="آیدی کولینک" placeholder="لطفا آیدی اینستاگرام خود را وارد کنید ..." />
                  <Field name="title" label="نام/عنوان" placeholder="لطفا نام/عنوان خود را وارد کنید ..." />
                  <Field name="subTitle" label="زیر عنوان" placeholder="لطفا زیر عنوان خود را وارد کنید ..." />
                  <Button type="secondary" className="px-4 ml-2" onClick={() => setStep(0)}>
                    قبلی
                  </Button>
                  <Button className="px-4" loading={isSubmitting} htmlType="submit">
                    ایجاد کولینک
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Loader>
    </Layout>
  )
}

const StepItem = React.memo(function Component({ label, step, num }) {
  return (
    <div className="relative flex-1 py-2 border-b-2 border-line">
      <span className={classNames('transition-all ease-in-out duration-300', step >= num ? '' : 'text-line')}>{label}</span>
      <div
        className={classNames('absolute border-b-2 border-primary transition-all ease-in-out duration-300', step > num ? 'w-full' : 'w-0')}
        style={{ bottom: -2 }}
      />
    </div>
  )
})

export default Create
