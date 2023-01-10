import classNames from 'classnames/bind'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import * as classes from './Pagination.module.css'

const cx = classNames.bind(classes)

type Props = {
  targetPage: number
  direction: 'prev' | 'next'
  disabled: boolean
  double?: boolean
}

const getIcon = (direction: 'prev' | 'next', double: boolean) => {
  return direction === 'prev' ? (double ? FaAngleDoubleLeft : FaChevronLeft) : double ? FaAngleDoubleRight : FaChevronRight
}

export const PaginationControllerItem: FC<Props> = ({ targetPage, direction, disabled, double = false }) => {
  const Icon = getIcon(direction, double)
  const humanPage = targetPage + 1

  return (
    <Link to={`/${humanPage === 1 ? '' : humanPage}`} className={cx({ item: true, disabled })}>
      <Icon size={13} />
    </Link>
  )
}
