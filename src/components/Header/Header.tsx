import React, { FC } from 'react'
import { Link } from 'gatsby'

import { Logo } from '../Logo'
import classes from './Header.module.css'

type Props = {
  isBlogPost?: boolean
}

export const Header: FC<Props> = ({ isBlogPost = false }) => {
  const logoLink = (
    <Link to="/" className={classes.link}>
      <Logo />
    </Link>
  )

  return <header className={classes.wrapper}>{isBlogPost ? logoLink : <h1>{logoLink}</h1>}</header>
}
