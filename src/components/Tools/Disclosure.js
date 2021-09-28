import React from 'react'
import { Disclosure as HeadlessDisclosure } from '@headlessui/react'

// ** UI
import { Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function Disclosure({ isDisclosure = true, label, children, className, defaultOpen, dragable, isOpen, extera }) {
  return isDisclosure ? (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        if (isOpen) isOpen(open)
        return (
          <>
            <div className="flex w-full justify-between items-center border border-line rounded-lg overflow-hidden">
              {dragable ? (
                <Icon
                  {...dragable.dragHandleProps}
                  name="apps-sort"
                  className={classNames(
                    'px-2 border-line border-e self-stretch flex items-center transition-all text-xs',
                    dragable.canDrag ? 'me-2' : '-ms-8 me-4'
                  )}
                />
              ) : null}
              <HeadlessDisclosure.Button
                className={classNames('flex flex-1 items-center py-2 transition duration-300 hover:opacity-70 me-auto', dragable ? 'pe-2' : 'px-4')}
              >
                <div className="flex items-center truncate max-w-[16rem] me-auto space-s-2">{label}</div>
                <Icon name="angle-small-left" className={classNames('text-base transition-all duration-300', open ? 'transform -rotate-90' : '')} />
              </HeadlessDisclosure.Button>
              {extera}
            </div>
            <HeadlessDisclosure.Panel className={className || 'p-4 leading-6 border border-line rounded-lg overflow-hidden'}>
              {children}
            </HeadlessDisclosure.Panel>
          </>
        )
      }}
    </HeadlessDisclosure>
  ) : (
    children
  )
}

export default Disclosure
