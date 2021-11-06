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
        <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-[1005] cursor-wait">
          <Icon name="spinner" className={classNames('animate-spin text-primary', loaderClassName)} />
          {label ? <span className="ms-2">در حال بارگذاری ...</span> : null}
        </div>
      ) : null}
    </>
  )
}

export default React.memo(Loader)
