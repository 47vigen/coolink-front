import React from 'react'
import Image from 'next/image'

// UI
import Icon from './Icon'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'

const AVATAR_COLORS = ['#B2BEC3', '#273C75', '#FFD32A', '#DFBCF9', '#Eb2F06', '#75E08F']

function Avatar({ url, fullName, loading, rounded, className, icon }) {
  const [backgroundColor] = React.useState(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)])

  return (
    <div
      key={url}
      className={classNames(
        'relative flex justify-center items-center text-white font-bold transition',
        rounded ? `rounded-${rounded}` : 'rounded-lg',
        url ? 'border border-line overflow-hidden' : '',
        className
      )}
      style={{ backgroundColor }}
    >
      {loading ? (
        <Icon name="spinner" className="animate-spin" />
      ) : icon ? (
        <Icon name={icon} className="text-2xl" />
      ) : (
        <span className="capitalize">{fullName?.toString().substring(0, 1) || 'م'}</span>
      )}
      {url ? (
        <div className="absolute top-[-0.5px] left-[-0.5px] right-[-0.5px] bottom-[-0.5px]">
          <Image alt="avatar" key={url} width={100} height={100} src={getImgSrc(url)} />
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(Avatar)
