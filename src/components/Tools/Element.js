import React from 'react'

// ** Utils
import classNames from '../../utils/classNames'

const DEFAULT_STYLES = {
  type: 'DEFAULT',
  rounded: 'lg',
  animate: null,
  color: 'primary',
  background: 'primary',
  border: null,
  borderStyle: 'solid',
  direction: 'r',
  from: 'primary',
  to: 'primary',
  via: null
}

function Element({ tag = 'div', customize = DEFAULT_STYLES, className, children, ...props }) {
  const cs = React.useMemo(() => ({ ...DEFAULT_STYLES, ...customize }), [customize])
  const customizedClassName = React.useMemo(() => {
    switch (cs.type) {
      case 'GRADIENT':
        return classNames(`bg-gradient-to-${cs.direction} from-${cs.from} to-${cs.to} bg-${cs.color}`, cs.via ? `via-${via}` : '')

      case 'CUSTOM':
        return classNames(`bg-${cs.background}`, cs.border ? `border-${cs.border} border-${cs.borderStyle}` : '')

      default:
        return `bg-${cs.color} bg-opacity-5`
    }
  }, [cs])

  return React.createElement(
    tag,
    {
      className: classNames(
        `transition duration-300 hover:opacity-70 rounded-${cs.rounded} text-${cs.color}`,
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
