import React from 'react'

function onOutside(id, callBack) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const component = document.getElementById(id)
    function handleClickOutside(event) {
      if (component && !component.contains(event.target)) {
        callBack()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [id, callBack])
}

export default onOutside
