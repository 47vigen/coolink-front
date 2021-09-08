import React from 'react'
import classNames from '../../../utils/classNames'
import styles from './icon.module.css'

function Icon({ name, className }) {
  return <span className={classNames(styles.base, styles[name], className)} />
}

export default Icon
