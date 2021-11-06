import React from 'react'
import { Tab, Dialog, Transition } from '@headlessui/react'

// ** UI
import Button from './Button'
import Icon from './Icon'

// ** Utils
import classNames from '../../utils/classNames'

function Modal({ tabMode, children, isOpen, closeModal, labels, className, staticContent, theme = 'light' }) {
  const [minHeight, setMinHeight] = React.useState(0)

  const onResizeModal = React.useCallback(() => (typeof window !== 'undefined' ? setMinHeight(window.innerHeight) : null), [])

  React.useEffect(() => {
    window.addEventListener('scroll', onResizeModal)
    return () => {
      window.removeEventListener('scroll', onResizeModal)
    }
  }, [onResizeModal])

  React.useEffect(() => {
    window.addEventListener('resize', onResizeModal)
    return () => {
      window.removeEventListener('resize', onResizeModal)
    }
  }, [onResizeModal])

  React.useEffect(() => {
    onResizeModal()
  }, [isOpen, onResizeModal])

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="font-dana fixed inset-0 z-[1001] overflow-y-auto" dir="rtl" onClose={closeModal} static={staticContent}>
        <div className="min-h-screen md:p-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-content bg-opacity-20" />
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
                'md:inline-block inline-flex flex-col w-full text-right align-middle transition-all transform md:rounded-md md:!min-h-0',
                theme === 'transparent' ? '' : 'bg-white md:shadow-md',
                className
              )}
              style={{ minHeight }}
            >
              {tabMode ? (
                <Tab.Group>
                  <DialogTitle theme={theme} closeModal={closeModal}>
                    <Tab.List className="flex self-stretch -ms-2">
                      {labels.map((label, idx) => (
                        <Tab
                          key={`tabs-${idx}`}
                          className={({ selected }) =>
                            classNames(
                              'px-2',
                              selected
                                ? 'font-bold text-primary relative after:block after:absolute after:start-2 after:end-2 after:-bottom-2 after:h-0.5 after:bg-primary after:rounded-t-full'
                                : ''
                            )
                          }
                        >
                          {label}
                        </Tab>
                      ))}
                    </Tab.List>
                  </DialogTitle>
                  {children}
                </Tab.Group>
              ) : (
                <>
                  {labels ? (
                    <DialogTitle theme={theme} closeModal={closeModal}>
                      <h3 className="font-bold">{labels}</h3>
                    </DialogTitle>
                  ) : null}
                  {children}
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

const DialogTitle = ({ theme, closeModal, children }) => {
  return (
    <Dialog.Title
      as="div"
      className={classNames(
        'flex items-center justify-between py-2 pr-4 pl-2',
        theme === 'transparent' ? 'bg-white rounded-md shadow-md' : 'border-b border-line'
      )}
    >
      {children}
      <Button type="ghost" className="ms-auto" onClick={closeModal}>
        <Icon name="cross-small" />
      </Button>
    </Dialog.Title>
  )
}

export default React.memo(Modal)
