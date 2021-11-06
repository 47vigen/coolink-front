import React from 'react'
import { Menu, Transition } from '@headlessui/react'

// ** Context
import { useAuth } from '../../../context/auth'

// ** UI
import { Button, Link, Icon, Avatar, Loader } from '../../Tools'

// ** Utils
import classNames from '../../../utils/classNames'

function UserState(props) {
  const { user, signOut, loading } = useAuth()

  return (
    <Loader label={false} loading={loading}>
      {user.id ? (
        <Menu as="div" className="relative inline-block text-end">
          <Menu.Button>
            {({ open }) => (
              <div className="flex items-center space-s-2">
                <Avatar url={user.picture} fullName={user.name} className="w-8 h-8" />
                <span className="hidden lg:!block capitalize">{user.name}</span>
                <Icon name="angle-small-left" className={classNames('transition ease-in-out duration-200', open ? 'transform -rotate-90' : '')} />
              </div>
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
                <Menu.Item>
                  <Link href="/dashboard" className={classNames('group flex rounded-md items-center w-full ps-2 py-2')}>
                    داشبورد
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/dashboard/create" className={classNames('group flex rounded-md items-center w-full ps-2 py-2')}>
                    ایجاد کولینک
                  </Link>
                </Menu.Item>
              </div>
              <div className="ps-1 py-1">
                <Menu.Item
                  as="button"
                  className={classNames('text-danger group flex rounded-md items-center w-full ps-2 py-2')}
                  onClick={() => signOut()}
                >
                  <Icon name="sign-out" className="me-2" />
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
