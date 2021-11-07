import React from 'react'
import { Disclosure as HeadlessDisclosure, Transition } from '@headlessui/react'

// ** UI
import { Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function Disclosure({ isDisclosure = true, label, children, className, labelClassName, defaultOpen, dragable, isOpen, extera }) {
  return isDisclosure ? (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        if (isOpen) isOpen(open)
        return (
          <>
            <div
              className={classNames(
                'flex w-full justify-between items-center border border-line rounded-lg overflow-hidden',
                typeof labelClassName === 'function' ? labelClassName(open) : labelClassName
              )}
            >
              <HeadlessDisclosure.Button className="flex flex-1 items-center py-2 transition duration-300 hover:opacity-70 me-auto px-2">
                <div className="flex items-center truncate max-w-[16rem] me-auto space-s-2">{label}</div>
                <Icon name="angle-small-left" className={classNames('text-base transition-all duration-300', open ? 'transform -rotate-90' : '')} />
              </HeadlessDisclosure.Button>
              {dragable && extera ? (
                dragable.canDrag ? (
                  <Icon
                    {...dragable.dragHandleProps}
                    name="apps-sort"
                    className="px-2 border-line border-s self-stretch flex items-center text-secondary"
                  />
                ) : open ? (
                  typeof extera === 'function' ? (
                    extera(open)
                  ) : (
                    extera
                  )
                ) : null
              ) : typeof extera === 'function' ? (
                extera(open)
              ) : (
                extera
              )}
            </div>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition duration-75 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <HeadlessDisclosure.Panel
                className={classNames('origin-top', className || 'p-4 leading-6 border border-line rounded-lg overflow-hidden')}
              >
                {children}
              </HeadlessDisclosure.Panel>
            </Transition>
          </>
        )
      }}
    </HeadlessDisclosure>
  ) : (
    children
  )
}

export default React.memo(Disclosure)
