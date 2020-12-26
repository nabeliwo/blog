import React, { FC } from 'react'
import classNames from 'classnames/bind'
import { Link } from 'gatsby'

import classes from './Pagination.module.css'

const cx = classNames.bind(classes)

interface Props {
  page: number
  currentPage: number
}

export const PaginationItem: FC<Props> = ({ page, currentPage }) => {
  const humanPage = page + 1

  if (page === currentPage) {
    return <span className={cx({ item: true, active: true })}>{humanPage}</span>
  }

  return (
    <Link to={`/${humanPage === 1 ? '' : humanPage}`} className={classes.item}>
      {humanPage}
    </Link>
  )
}
