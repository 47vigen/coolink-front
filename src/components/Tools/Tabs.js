import React from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'

// ** Utils
import classNames from '../../utils/classNames'

function Tabs({ labels = [], className, activeClassName, extera, children }) {
  return (
    <HeadlessTab.Group {...(className ? { as: 'div', className } : { as: React.Fragment })}>
      <HeadlessTab.List className="flex items-center border-b border-line pb-2">
        {labels.map((label, idx) => (
          <HeadlessTab
            key={`label-${idx}`}
            className={({ selected }) =>
              classNames(
                'flex items-center px-2 self-stretch',
                selected
                  ? classNames(
                      'text-primary relative after:block after:absolute after:start-2 after:end-2 after:-bottom-2 after:h-0.5 after:bg-primary after:rounded-t-full',
                      activeClassName
                    )
                  : ''
              )
            }
          >
            {label}
          </HeadlessTab>
        ))}
        {extera ? <div className="flex-1 flex items-center justify-end">{extera}</div> : false}
      </HeadlessTab.List>
      <HeadlessTab.Panels className="flex-1 pt-4">{children}</HeadlessTab.Panels>
    </HeadlessTab.Group>
  )
}

export const Tab = HeadlessTab.Panel
export default React.memo(Tabs)
