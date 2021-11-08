import React from 'react'
import { Menu, Transition } from '@headlessui/react'

// ** UI
import { Avatar, Button, Element } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'

const TemplateItem = ({ avatar, style, title, subTitle, slug, onSelect }) => {
  const titles = React.useMemo(() => ({ title: avatar?.customize?.color || 'content', subTitle: avatar?.customize?.second || 'secondary' }), [avatar])
  return (
    <Menu as="div" className="relative flex flex-col">
      <Menu.Button className="flex flex-col flex-1 w-full">
        {() => (
          <div
            dir={style?.display?.direction || 'rtl'}
            className={classNames(
              'flex flex-col flex-1 w-full rounded-lg p-4 overflow-hidden border border-line transition duration-300',
              style?.background?.color ? `bg-${style.background.color}` : 'bg-body',
              style?.display?.direction === 'ltr' ? 'text-left' : 'text-right',
              `font-${style?.display?.font || 'dana'}`
            )}
          >
            <div className={classNames('relative z-10 flex items-center', avatar?.position === 'center' ? 'flex-col items-center' : 'space-s-2')}>
              <Avatar url={avatar?.url} className="w-16 h-16" rounded={avatar?.customize?.rounded} priority />
              {avatar?.position === 'center' ? (
                <>
                  <h1 className={classNames('text-sm mt-2', `text-${titles.title}`)}>{title}</h1>
                  <span className={classNames('text-xs', `text-${titles.subTitle}`)}>{subTitle}</span>
                </>
              ) : (
                <div className="flex flex-col flex-1">
                  <h1 className={classNames('text-sm', `text-${titles.title}`)}>{title}</h1>
                  <span className={classNames('text-xs', `text-${titles.subTitle}`)}>{subTitle}</span>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2 pointer-events-none">
              <Element customize={style?.customize} className="p-2">
                <div
                  className={classNames(
                    'w-3/4 h-1 rounded-full my-0.5',
                    `bg-${style?.customize?.type === 'default' ? style?.customize?.color : style?.customize?.second || 'content'}`
                  )}
                />
              </Element>
              <Element customize={style?.customize} className="p-2">
                <div
                  className={classNames(
                    'w-3/5 h-1 rounded-full my-0.5',
                    `bg-${style?.customize?.type === 'default' ? style?.customize?.color : style?.customize?.second || 'content'}`
                  )}
                />
              </Element>
            </div>
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
        <Menu.Items className="flex absolute z-50 start-0 end-0 -bottom-6 origin-top bg-white border border-line rounded-b-lg shadow-lg focus:outline-none">
          <Menu.Item as={Button} autoLoading onClick={onSelect} type="ghost" icon="brush" className="!justify-start w-full">
            انتخاب قالب
          </Menu.Item>
          {slug ? (
            <Menu.Item
              as={Button}
              icon="eye"
              type="ghost"
              link={`/${slug}`}
              target="_blank"
              className="!justify-start rounded-ts-none rounded-bs-none border-s border-line"
            />
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default React.memo(TemplateItem)
