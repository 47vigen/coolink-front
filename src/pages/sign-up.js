import React from 'react'
import { NextSeo } from 'next-seo'
import toast from 'react-hot-toast'
import { Form, Formik } from 'formik'

// ** UI
import Auth from '../components/Layout/Auth'
import { Button, Field, Icon, Link } from '../components/Tools'

// ** Context
// import { useAuth } from '../context/auth'

// ** Graphql
// import { CREATE_USER } from '../graphql/mutations'
// import { useMutation } from '@apollo/client'

// ** Validation
import * as Yup from 'yup'
const validationSchema = Yup.object().shape({
  email: Yup.string().required('لطفا ایمیل خود را وارد کنید').email('ایمیل وارد شده صحیح نمی‌باشد'),
  password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(5, 'رمز عبور باید بیشتر از 5 کاراکتر باشد')
})

function SignUp({ query }) {
  // const [createUser] = useMutation(CREATE_USER)
  // const { signIn } = useAuth()

  const [show, setShow] = React.useState(false)

  const onSubmit = React.useCallback(
    (variables) => toast.success('اطلاعاتتون رو نگه دارید! ما هنوز تو راهیم :(', { id: 'createUser', duration: 5000 }),
    []
    // createUser({ variables })
    //   .then(async ({ data: { createUser } }) => {
    //     await signIn(createUser.token, query?.ref || true)
    //     toast.success('ثبت نام باموقیت انجام شد! لطفا ایمیل خود را بررسی کنید', { id: 'createUser', duration: 5000 })
    //     return true
    //   })
    //   .catch((err) => console.log(err)),
    // [query, signIn, createUser]
  )

  return (
    <Auth
      extra={
        <Link replace href={`/login${query?.ref ? '?ref=' + query.ref : ''}`} className="py-2 my-2">
          ثبت نام کرده اید؟
        </Link>
      }
    >
      <NextSeo title="ثبت نام" noindex />
      <Formik validationSchema={validationSchema} initialValues={{ name: '', email: '', password: '' }} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="w-full space-y-4">
            <Field label="نام" name="name" className="text-center" />
            <Field required label="ایمیل" name="email" type="email" className="text-center" />
            <Field required label="رمز عبور" name="password" type={show ? '' : 'password'} className="pl-8 text-center">
              <button type="button" className="absolute top-2.5 left-2.5" onClick={() => setShow((prev) => !prev)}>
                <Icon name={show ? 'eye-crossed' : 'eye'} />
              </button>
            </Field>
            <Button loading={isSubmitting} htmlType="submit" className="w-full">
              ثبت نام
            </Button>
          </Form>
        )}
      </Formik>
    </Auth>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query
    }
  }
}

export default SignUp
