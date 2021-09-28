import React from 'react'
import { Switch as HeadLessSwitch } from '@headlessui/react'

// ** Utils
import classNames from '../../utils/classNames'

function Switch({ label, checked, onChange }) {
  return (
    <div className="flex space-s-2 w-full">
      <HeadLessSwitch
        checked={checked}
        onChange={onChange}
        className={classNames(
          'bg-primary relative inline-flex flex-shrink-0 h-[22px] w-[44px] border border-line rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
          checked ? 'bg-opacity-100' : 'bg-opacity-10'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-lg transform transition ease-in-out duration-200 m-[1px]',
            checked ? 'translate-x-[-22px]' : 'translate-x-0'
          )}
        />
      </HeadLessSwitch>
      <div className="flex-1">{label}</div>
    </div>
  )
}

export default React.memo(Switch)
