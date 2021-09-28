import React from 'react'
import { RadioGroup as HeadLessRadioGroup } from '@headlessui/react'

// ** UI
import { Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function RadioGroup({ label, options = [], value, onChange, className, wrapperClassName }) {
  return (
    <HeadLessRadioGroup value={value} onChange={onChange}>
      {label ? <HeadLessRadioGroup.Label className="block mb-2">{label}</HeadLessRadioGroup.Label> : null}
      <div className={wrapperClassName || 'flex space-s-2'}>
        {options?.map((option, idx) => (
          <HeadLessRadioGroup.Option
            as="button"
            type="button"
            key={`option-${idx}`}
            value={option.value}
            className={({ checked }) =>
              classNames(
                'flex-1 flex items-center justify-center rounded-md border relative p-2',
                checked ? 'border-primary' : 'border-line',
                className
              )
            }
          >
            {({ checked }) => (
              <>
                {option.content}
                {checked ? (
                  <Icon name="check" className="absolute bottom-0 start-0 p-1 bg-primary text-white text-xs rounded-te-md rounded-bs-md" />
                ) : null}
              </>
            )}
          </HeadLessRadioGroup.Option>
        ))}
      </div>
    </HeadLessRadioGroup>
  )
}

export default React.memo(RadioGroup)
