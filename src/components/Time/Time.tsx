import React, { FC } from 'react'

type Props = {
  format: string
  children: string
}

export const Time: FC<Props> = ({ format, children }) => {
  const d = new Date(children)

  if (d.toString() === 'Invalid Date') return null

  let dateStr = format

  dateStr = dateStr.replace(/YYYY/, `${d.getFullYear()}`)
  dateStr = dateStr.replace(/MM/, `${d.getMonth() + 1}`.padStart(2, '0'))
  dateStr = dateStr.replace(/DD/, `${d.getDate()}`.padStart(2, '0'))

  return <time dateTime={children}>{dateStr}</time>
}
