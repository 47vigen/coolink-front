import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'

// ** Graphql
import { useMutation } from '@apollo/client'
import { SEND_CONFIRM_EMAIL } from '../../graphql/mutations'

// ** UI
import { Button, Modal } from '.'

function ConfirmEmail({ type }) {
  const { user } = useAuth()
  const [sendConfirmEmail] = useMutation(SEND_CONFIRM_EMAIL)

  const onClick = React.useCallback(async () => {
    await sendConfirmEmail()
    toast.success('ایمیل تایید با موفقیت برای شما ارسال شد!', { id: 'email' })
  }, [sendConfirmEmail])

  if (user.role === 'USER') {
    switch (type) {
      case 'modal':
        return (
          <Modal isOpen closeModal={() => null} className="max-w-lg space-y-4" theme="transparent" staticContent>
            <div
              className="flex-1 flex flex-col justify-between items-center bg-yellow-100 border border-yellow-300 rounded-lg mb-4 p-4"
              role="alert"
            >
              برای دسترسی به امکانات کولینک لطفا ایمیل خود را تایید کنید سپس این صفحه را رفرش کنید!
              <div className="mt-2 space-s-4">
                <Button link="/dashboard" type="ghost">
                  بازگشت به داشبورد
                </Button>
                <Button autoLoading type="ghost" onClick={onClick}>
                  ارسال مجدد ایمیل تایید
                </Button>
              </div>
            </div>
          </Modal>
        )

      default:
        return (
          <div
            className="flex-1 flex flex-col md:flex-row justify-between items-center bg-yellow-100 border border-yellow-300 rounded-lg mb-4 p-4"
            role="alert"
          >
            برای دسترسی به امکانات کولینک لطفا ایمیل خود را تایید کنید سپس این صفحه را رفرش کنید!
            <Button autoLoading type="ghost" className="block mt-2 md:mt-0" onClick={onClick}>
              ارسال مجدد ایمیل تایید
            </Button>
          </div>
        )
    }
  } else return null
}

export default ConfirmEmail
