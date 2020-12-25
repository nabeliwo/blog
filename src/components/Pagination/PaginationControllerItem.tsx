import React, { FC } from 'react'
import { Link } from 'gatsby'

import { Icon } from '../Icon'

import classes from './Pagination.module.css'

type Props = {
  targetPage: number
  direction: 'prev' | 'next'
  disabled: boolean
  double?: boolean
}

const getIconProps = (
  direction: 'prev' | 'next',
  double: boolean,
): 'angle-double-left' | 'chevron-left' | 'angle-double-right' | 'chevron-right' => {
  return direction === 'prev' ? (double ? 'angle-double-left' : 'chevron-left') : double ? 'angle-double-right' : 'chevron-right'
}

export const PaginationControllerItem: FC<Props> = ({ targetPage, direction, disabled, double = false }) => {
  const humanPage = targetPage + 1

  return (
    <Link to={`/${humanPage === 1 ? '' : humanPage}`} className={`${classes.item} ${disabled ? classes.disabled : ''}`}>
      <Icon name={getIconProps(direction, double)} color={disabled ? '#c1bdb7' : '#333'} size={13} />
    </Link>
  )
}
