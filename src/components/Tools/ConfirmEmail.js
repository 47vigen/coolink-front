import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'

// ** Graphql
import { useMutation } from '@apollo/client'
import { SEND_CONFIRM_EMAIL } from '../../graphql/mutations'

// ** UI
import { Button } from '.'
import classNames from '../../utils/classNames'

function ConfirmEmail({ className }) {
  const { user } = useAuth()
  const [sendConfirmEmail] = useMutation(SEND_CONFIRM_EMAIL)

  return user.role === 'USER' ? (
    <div className={classNames('confrim-email', className)}>
      <div
        className="flex-1 flex flex-col md:flex-row justify-between items-center bg-yellow-100 border border-yellow-300 rounded-lg mb-4 p-4"
        role="alert"
      >
        برای دسترسی به امکانات کولینک لطفا ایمیل خود را تایید کنید!
        <Button
          autoLoading
          type="ghost"
          className="block mt-2 md:mt-0"
          onClick={async () => {
            await sendConfirmEmail()
            toast.success('ایمیل تایید با موفقیت برای شما ارسال شد!', { id: 'email' })
          }}
        >
          ارسال مجدد ایمیل تایید
        </Button>
      </div>
    </div>
  ) : null
}

export default ConfirmEmail
