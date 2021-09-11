import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ** UI
import Button from './Button'
import Icon from './Icon'

// ** Utils
import classNames from '../../utils/classNames'

function Modal({ children, isOpen, closeModal, label, className, staticContent, theme = 'light' }) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="font-body fixed inset-0 z-10 overflow-y-auto" dir="rtl" onClose={closeModal} static={staticContent}>
        <div className="min-h-screen p-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-20 backdrop-filter backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={classNames(
                'inline-block w-full overflow-hidden text-right align-middle transition-all transform rounded-md',
                theme === 'transparent' ? '' : 'bg-white shadow-md',
                className
              )}
            >
              {label ? (
                <Dialog.Title
                  as="div"
                  className={classNames(
                    'flex items-center justify-between py-2 pr-4 pl-2',
                    theme === 'transparent' ? 'bg-white rounded-md shadow-md' : 'border-b border-line'
                  )}
                >
                  <h3 className="font-bold">{label}</h3>
                  <Button type="ghost" onClick={closeModal}>
                    <Icon name="cross-small" />
                  </Button>
                </Dialog.Title>
              ) : null}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
