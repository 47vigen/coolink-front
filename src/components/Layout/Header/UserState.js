import React from 'react'
import { Menu, Transition } from '@headlessui/react'

// ** Context
import { useAuth } from '../../../context/auth'

// ** UI
import { Button, Icon, Avatar, Loader } from '../../Tools'

// ** Utils
import classNames from '../../../utils/classNames'

function UserState(props) {
  const { user, signOut, loading } = useAuth()

  return (
    <Loader label={false} loading={loading}>
      {user.id ? (
        <Menu as="div" className="relative inline-block text-end">
          <Menu.Button className="flex items-center space-s-2">
            {({ open }) => (
              <>
                <Avatar url={user.picture} fullName={user.name} className="w-8 h-8" />
                <span className="hidden lg:!block capitalize">{user.name}</span>
                <Icon name="angle-small-left" className={classNames('transition ease-in-out duration-200', open ? 'transform -rotate-90' : '')} />
              </>
            )}
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 start-0 w-40 mt-2 origin-top-start bg-white border border-line lg:border-0 divide-y divide-line rounded-lg shadow-lg focus:outline-none">
              <div className="ps-1 py-1">
                <Menu.Item as={Button} link="/dashboard" type="ghost" className="!justify-start w-full">
                  داشبورد
                </Menu.Item>
                <Menu.Item as={Button} link="/dashboard/create" type="ghost" className="!justify-start w-full">
                  ایجاد کولینک
                </Menu.Item>
              </div>
              {user?.role === 'ADMIN' ? (
                <div className="ps-1 py-1">
                  <Menu.Item as={Button} link="/admin" type="ghost" className="!justify-start w-full">
                    پیشخوان ادمین
                  </Menu.Item>
                </div>
              ) : null}
              <div className="ps-1 py-1">
                <Menu.Item as={Button} type="ghost" icon="sign-out" className="text-danger !justify-start w-full" onClick={() => signOut()}>
                  خروج
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div className="flex items-center space-s-2">
          <Button link="/sign-up" className="md:w-20 min-w-max lg:py-1.5">
            ثبت نام
          </Button>
          <Button link="/login" className="md:w-20 min-w-max lg:py-1.5" type="ghost">
            ورود
          </Button>
        </div>
      )}
    </Loader>
  )
}

export default React.memo(UserState)
