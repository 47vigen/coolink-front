import React from 'react'

// ** UI
import { Icon } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'
import { getPalette } from '../../utils/getColors'

export const ChooseColor = ({ active, setActive, nullable, colorFull }) => {
  return (
    <div className="max-h-48 -m-4 overflow-y-auto smooth-scrollbar">
      <div className="grid grid-cols-10 gap-1 m-2">
        {getPalette(nullable, colorFull).map(({ class: color }) => {
          return <ColorItem key={color} color={color} active={active || null} setActive={() => setActive(color)} />
        })}
      </div>
    </div>
  )
}

export const ColorItem = ({ color, active, setActive }) => {
  const code = React.useMemo(() => (color ? Number(color.split('-').pop()) : 50), [color])

  return (
    <button
      type="button"
      className={classNames(
        'h-7 flex justify-center items-center rounded-md transition duration-300 hover:opacity-70 border border-line',
        color ? `bg-${color}` : 'empty-btn col-span-full'
      )}
      onClick={setActive}
    >
      {active === color ? <Icon name="check" className={code >= 500 ? 'text-white' : 'text-content'} /> : null}
    </button>
  )
}
