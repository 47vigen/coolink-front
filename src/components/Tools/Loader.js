import React from 'react'

// ** UI
import { Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'

function Loader({ tag = 'div', loading, label = true, className, loaderClassName, children, ...props }) {
  return React.createElement(
    tag,
    {
      className: classNames('relative', loading ? 'rounded-lg overflow-hidden pointer-events-none' : '', className),
      ...props
    },
    <>
      {children}
      {loading ? (
        <>
          <div className="absolute inset-0 bg-white bg-opacity-50 z-[1005] cursor-wait" />
          <div className="absolute inset-0 flex justify-center items-center z-[1006] cursor-wait max-h-40">
            <span className={classNames('inline-flex items-center bg-body bg-opacity-50 p-2 rounded-lg', label ? 'px-4' : '')}>
              <Icon name="spinner" className={classNames('animate-spin text-primary', loaderClassName)} />
              {label ? <span className="ms-2">در حال بارگذاری ...</span> : null}
            </span>
          </div>
        </>
      ) : null}
    </>
  )
}

export default React.memo(Loader)
