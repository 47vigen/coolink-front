import React from 'react'

// ** Template
import { DEFAULT_CUSTOMIZE } from '../Template/Customize/Handler'

// ** Utils
import classNames from '../../utils/classNames'

function Element({ tag = 'div', customize = DEFAULT_CUSTOMIZE, className, children, hoverable = true, ...props }) {
  const cs = React.useMemo(() => ({ ...DEFAULT_CUSTOMIZE, ...customize }), [customize])
  const customizedClassName = React.useMemo(() => {
    switch (cs.type) {
      case 'gradient':
        return classNames(`bg-gradient-to-${cs.direction || 'r'} text-${cs.second} from-${cs.from} to-${cs.to}`, cs.via ? `via-${cs.via}` : '')

      case 'custom':
        return classNames(`bg-${cs.color} text-${cs.second}`, cs.border ? `border border-${cs.border} border-${cs.borderStyle}` : '')

      default:
        return `bg-${cs.color} text-${cs.color} bg-opacity-5`
    }
  }, [cs])

  return React.createElement(
    tag,
    {
      className: classNames(
        hoverable ? 'transition duration-300 hover:opacity-70' : '',
        cs.rounded ? `rounded-${cs.rounded}` : 'rounded-lg',
        cs.animate ? `animate-${cs.animate}` : '',
        customizedClassName,
        className
      ),
      ...props
    },
    children
  )
}

export default React.memo(Element)
