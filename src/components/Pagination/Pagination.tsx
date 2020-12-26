import React, { FC } from 'react'

import { PaginationItem } from './PaginationItem'
import { PaginationControllerItem } from './PaginationControllerItem'

import classes from './Pagination.module.css'

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination: FC<Props> = ({ totalPages, currentPage }) => {
  if (totalPages <= 1) return null

  const prevPage = (
    <>
      <li className={classes.prevDouble}>
        <PaginationControllerItem direction="prev" targetPage={0} disabled={currentPage === 0} double />
      </li>
      <li className={classes.prev}>
        <PaginationControllerItem direction="prev" targetPage={currentPage - 1} disabled={currentPage === 0} />
      </li>
    </>
  )

  const pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
    .filter((page) => page >= 0 && page <= totalPages - 1)
    .map((page) => (
      <li key={page}>
        <PaginationItem page={page} currentPage={currentPage} />
      </li>
    ))

  const nextPage = (
    <>
      <li className={classes.next}>
        <PaginationControllerItem direction="next" targetPage={currentPage + 1} disabled={currentPage === totalPages - 1} />
      </li>
      <li className={classes.nextDouble}>
        <PaginationControllerItem direction="next" targetPage={totalPages - 1} disabled={currentPage === totalPages - 1} double />
      </li>
    </>
  )

  return (
    <nav className={classes.wrapper}>
      <ul className={classes.list}>
        {prevPage}
        {pages}
        {nextPage}
      </ul>
    </nav>
  )
}
