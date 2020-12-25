import React, { FC } from 'react'
import { Link } from 'gatsby'

import classes from './Pagination.module.css'

interface Props {
  page: number
  currentPage: number
}

export const PaginationItem: FC<Props> = ({ page, currentPage }) => {
  const humanPage = page + 1

  if (page === currentPage) {
    return <span className={`${classes.item} ${classes.active}`}>{humanPage}</span>
  }

  return (
    <Link to={`/${humanPage === 1 ? '' : humanPage}`} className={classes.item}>
      {humanPage}
    </Link>
  )
}
