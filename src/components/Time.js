import React from 'react'

import { format as formatTime } from '../libs/time'
import { isIe } from '../libs/ua'

const Time = ({ format = 'YYYY年MM月DD日', className = '', children = '' }) => {
  const formatted = formatTime(children, format)

  if (!formatted) return null
  if (isIe) return <span className={className}>{formatted}</span>

  return (
    <time dateTime={children} className={className}>
      {formatted}
    </time>
  )
}

export default Time
