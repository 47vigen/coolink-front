import React from 'react'

// ** UI
import { Icon } from '../Tools'

const Flag = ({ type }) => {
  switch (type) {
    case 'slide':
      return <Icon name="copy-alt" className="w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white text-content" />
    case 'video':
      return <Icon name="play" className="w-min absolute top-0 start-0 p-1 rounded-be-md rounded-ts-md bg-white text-content" />
  }
}

export default React.memo(Flag)
