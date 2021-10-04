import React from 'react'
import { Form, Formik } from 'formik'
import { NextSeo } from 'next-seo'

// ** UI
import Auth from '../components/Layout/Auth'
import { Button, Field, Icon, Link } from '../components/Tools'

// ** Context
import { useAuth } from '../context/auth'

// ** Graphql
import { LOGIN } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

// ** Validation
import * as Yup from 'yup'
const validationSchema = Yup.object().shape({
  email: Yup.string().required('لطفا ایمیل خود را وارد کنید').email('ایمیل وارد شده صحیح نمی‌باشد'),
  password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(5, 'رمز عبور باید بیشتر از 5 کاراکتر باشد')
})

function Login({ query }) {
  const [login] = useMutation(LOGIN)
  const { signIn } = useAuth()

  const [show, setShow] = React.useState(false)

  const onSubmit = React.useCallback(
    (variables) =>
      login({ variables })
        .then(async ({ data: { login } }) => {
          await signIn(login.token, query?.ref || true)
          toast.success('با موفقیت وارد شدید!', { id: 'login' })
          return true
        })
        .catch((err) => console.log(err)),
    [query, signIn, login]
  )

  return (
    <Auth
      extra={
        <Link href={`/sign-up${query?.ref ? '?ref=' + query.ref : ''}`} className="py-2 my-2">
          ثبت نام نکرده اید؟
        </Link>
      }
    >
      <NextSeo title="ورود" noindex />
      <Formik validationSchema={validationSchema} initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="w-full space-y-4">
            <Field label="ایمیل" name="email" type="email" className="text-center" />
            <Field label="رمز عبور" name="password" type={show ? '' : 'password'} className="pl-8 text-center">
              <button type="button" className="absolute top-2.5 left-2.5" onClick={() => setShow((prev) => !prev)}>
                <Icon name={show ? 'eye-crossed' : 'eye'} />
              </button>
            </Field>
            <Button loading={isSubmitting} htmlType="submit" className="w-full">
              ورود
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

export default Login
