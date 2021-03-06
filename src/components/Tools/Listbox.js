import React from 'react'
import { Listbox as HeadlessListbox, Transition } from '@headlessui/react'

// ** UI
import { Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function Listbox({ label, options, value, onChange, renderLabel }) {
  const selected = React.useMemo(() => options.find((option) => option.value === value) || options[0], [value, options])

  return (
    <HeadlessListbox value={value} onChange={onChange}>
      <div className="relative">
        {label ? <HeadlessListbox.Label className="block mb-2">{label}</HeadlessListbox.Label> : null}
        <HeadlessListbox.Button className="flex w-full justify-between items-center border border-line transition duration-300 hover:opacity-70 rounded-lg py-2 px-4">
          <span className="block truncate">{selected.label}</span>
          <Icon name="angle-small-down" />
        </HeadlessListbox.Button>
        <Transition as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <HeadlessListbox.Options className="absolute w-full py-1 mt-2 overflow-auto bg-white border border-line rounded-md shadow-2xl max-h-60 smooth-scrollbar focus:outline-none z-10">
            {options.map((option, idx) => (
              <HeadlessListbox.Option
                key={`option-${idx}`}
                className={({ active }) =>
                  classNames('cursor-default select-none relative py-2 px-4', active ? 'text-primary bg-primary bg-opacity-10' : '')
                }
                value={option.value}
              >
                {({ selected, active }) => (
                  <>
                    {renderLabel ? renderLabel({ option, selected }) : <span className="block truncate">{option.label}</span>}
                    {selected ? (
                      <span className={classNames('absolute inset-y-0 left-0 flex items-center pl-3', renderLabel ? '!text-white !pl-5' : '')}>
                        <Icon name="check" />
                      </span>
                    ) : null}
                  </>
                )}
              </HeadlessListbox.Option>
            ))}
          </HeadlessListbox.Options>
        </Transition>
      </div>
    </HeadlessListbox>
  )
}

export default React.memo(Listbox)
