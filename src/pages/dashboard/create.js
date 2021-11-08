import React from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { usePalette } from 'react-palette'
import { useAuth } from '../../context/auth'
import Seo from '../../components/Tools/Seo'

// ** UI
import Dashboard from '../../components/Layout/Dashboard'
import ConfirmEmail from '../../components/Tools/ConfirmEmail'
import { Avatar, Field, Upload, Button, Icon, Loader } from '../../components/Tools'

// ** Grapgql
import { useMutation } from '@apollo/client'
import { SHOW_MY_PAGES } from '../../graphql/queries'
import { CREATE_PAGE, GET_PAGE_INFO, UPLOAD_IMAGE } from '../../graphql/mutations'
import ChooseTemplate from '../../components/Template/ChooseTemplate'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'
import { getFileBase } from '../../utils/fileBase'
import { getSimilarColor } from '../../utils/getColors'

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
  const [step, setStep] = React.useState(0)
  const [getPageInfo] = useMutation(GET_PAGE_INFO)
  const [createPage, { data: created }] = useMutation(CREATE_PAGE, {
    // update: (cache, mutationResult) => {
    //   const data = mutationResult.data.createPage
    //   const rendered = {
    //     id: data?.id,
    //     pk: data?.pk,
    //     slug: data?.slug,
    //     title: data?.title,
    //     subTitle: data?.subTitle,
    //     avatar: {
    //       url: data?.avatar?.url
    //     }
    //   }
    //   const query = cache.readQuery({
    //     query: SHOW_MY_PAGES
    //   })
    //   cache.writeQuery({
    //     query: SHOW_MY_PAGES,
    //     data: { showMyPages: [rendered, ...query?.showMyPages] }
    //   })
    // }
  })
  const [uploadImage] = useMutation(UPLOAD_IMAGE)

  const [dominantColor, setDominantColor] = React.useState({})

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
          setStep(1)
          const {
            data: { getPageInfo: getPageInfoData }
          } = await getPageInfo({ variables: { username } })
          const { base64 } = await getFileBase(getPageInfoData.profilePic)
          ref.current.setValues({ pk: getPageInfoData.pk, title: getPageInfoData.fullName, slug: username, avatar: { url: base64 } })
          setStep(2)
        } catch (err) {
          setStep(0)
          return console.log(err)
        }
      } else if (step === 2) {
        try {
          setStep(3)
          const newAvatarUrl = avatar.url?.includes('base64') ? await uploadBase64Image(values.pk, avatar.url) : avatar.url
          await createPage({ variables: { pageInput: { ...values, avatar: { url: newAvatarUrl } } } })
          setStep(4)
        } catch (err) {
          setStep(2)
          return console.log(err)
        }
      }
    },
    [step, createPage, getPageInfo, uploadBase64Image]
  )

  React.useEffect(() => {
    if (dominantColor?.vibrant) {
      const similarColor = getSimilarColor(dominantColor.vibrant)
      ref?.current?.setFieldValue('style.customize.color', similarColor.class, false)
    }
  }, [dominantColor])

  return (
    <Dashboard dashboard hide={step > 1}>
      <Seo title="ایجاد کولینک" noindex />
      <div className="flex space-s-2 mb-4">
        <StepItem num={0} step={step}>
          تایید آیدی
        </StepItem>
        <StepItem num={2} step={step}>
          تکمیل اطلاعات
        </StepItem>
        <StepItem num={4} step={step}>
          انتخاب قالب
        </StepItem>
      </div>
      <Loader loading={loading} className="bg-white rounded-lg p-4">
        {step < 4 ? (
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
                {step === 0 || step === 1 ? (
                  <>
                    <Field name="username" label="آیدی اینستاگرام" placeholder="لطفا آیدی اینستاگرام خود را وارد کنید ..." />
                    <div className="flex">
                      <Button className="max-h-8 px-4 me-2" loading={isSubmitting} htmlType="submit">
                        تایید
                      </Button>
                      {isSubmitting ? (
                        <div className="flex-1 flex items-center bg-yellow-100 border border-yellow-300 rounded-md min-h-8 px-2 py-1" role="alert">
                          دریافت اطلاعات شما از اینستاگرام ممکن است کمی زمان بر باشد!
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : step === 2 || step === 3 ? (
                  <>
                    <Upload.Single
                      type="profile"
                      pk={values.pk}
                      onChange={(url) => setFieldValue('avatar.url', url, false)}
                      className="w-24 h-24 mx-auto rounded-lg overflow-hidden"
                    >
                      <Avatar url={values.avatar?.url} fullName={values.title} className="w-24 h-24 rounded-lg mx-auto mb-2" />
                      <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-ts-md transition duration-300" />
                    </Upload.Single>
                    <DominantColor key={values.avatar?.url} src={values.avatar?.url} onChange={setDominantColor} />
                    <Field name="slug" label="آیدی کولینک" placeholder="لطفا آیدی اینستاگرام خود را وارد کنید ...">
                      <span className="flex items-center text-secondary absolute top-0 bottom-0 end-2" dir="ltr">
                        https://colk.ir/
                      </span>
                    </Field>
                    <Field name="title" label="نام/عنوان" placeholder="لطفا نام/عنوان خود را وارد کنید ..." />
                    <Field name="subTitle" label="زیر عنوان" placeholder="لطفا زیر عنوان خود را وارد کنید ..." />
                    <Button type="secondary" className="px-4 ml-2" onClick={() => setStep(0)}>
                      قبلی
                    </Button>
                    <Button className="px-4" loading={isSubmitting} htmlType="submit">
                      ایجاد کولینک
                    </Button>
                  </>
                ) : null}
              </Form>
            )}
          </Formik>
        ) : created?.createPage?.id ? (
          <ChooseTemplate page={created.createPage} dominantColor={dominantColor} />
        ) : null}
        <ConfirmEmail type="modal" />
      </Loader>
    </Dashboard>
  )
}

const StepItem = React.memo(function Component({ children, step, num }) {
  return (
    <div
      className={classNames('relative pb-2 border-b-2 border-line transition-all ease-in-out duration-300', step - 1 > num ? 'sm:flex-1' : 'flex-1')}
    >
      <span className={classNames('flex transition-all ease-in-out duration-300 truncate', step >= num ? '' : 'text-secondary')}>
        <span className={classNames('text-lg font-bold me-1 transition-all ease-in-out duration-300', step === num ? 'text-primary' : '')}>
          {num / 2 + 1}.
        </span>
        <span className={classNames('block transition-all ease-in-out duration-300', step - 1 > num ? 'max-w-0 sm:max-w-none overflow-hidden' : '')}>
          {children}
        </span>
      </span>
      <div
        className={classNames('absolute border-b-2 border-primary transition-all ease-in-out duration-300', step > num ? 'w-full' : 'w-0')}
        style={{ bottom: -2 }}
      />
    </div>
  )
})

const DominantColor = React.memo(function Component({ src, onChange }) {
  const { data: dominantColor } = usePalette(getImgSrc(src))

  React.useEffect(() => {
    onChange(dominantColor)
  }, [dominantColor, onChange])

  return null
})

export default Create
