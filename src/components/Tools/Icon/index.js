import React from 'react'
import { useRouter } from 'next/router'

import classNames from '../../../utils/classNames'
import isRtl from '../../../utils/isRtl'

import styles from './icon.module.css'

function Icon({ name, className, style }) {
  const { locale } = useRouter()
  const renderedName = isRtl(locale) ? name : name.replace('right', 'left') === name ? name.replace('left', 'right') : name.replace('right', 'left')

  return (
    <i
      style={style}
      className={classNames(styles.base, styles[renderedName], isRtl(locale) ? className : className?.replace('-rotate-90', 'rotate-90'))}
    />
  )
}

export default Icon
