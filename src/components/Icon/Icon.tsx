import React, { FC } from 'react'

import { AngleDoubleRight } from './icons/AngleDoubleRight'
import { AngleDoubleLeft } from './icons/AngleDoubleLeft'
import { ChevronRight } from './icons/ChevronRight'
import { ChevronLeft } from './icons/ChevronLeft'

const icons = {
  'angle-double-right': AngleDoubleRight,
  'angle-double-left': AngleDoubleLeft,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
}

type Props = {
  name: keyof typeof icons
  color: string
  size: number
}

export const Icon: FC<Props> = ({ name, color, size }) => {
  const Component = icons[name]

  return <Component color={color} size={size} />
}
