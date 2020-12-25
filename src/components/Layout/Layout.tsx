import { Link } from 'gatsby'
import React, { ComponentProps, FC } from 'react'

import { Head } from '../Head'
import { Logo } from '../Logo'

import classes from './Layout.module.css'

export const Layout: FC<ComponentProps<typeof Head>> = ({ children, isBlogPost, ...props }) => {
  return (
    <>
      <Head {...props} />

      <header className={classes.header}>
        {isBlogPost ? (
          <Link to="/" className={classes.logoLink}>
            <Logo />
          </Link>
        ) : (
          <h1>
            <Link to="/" className={classes.logoLink}>
              <Logo />
            </Link>
          </h1>
        )}
      </header>

      <main className={classes.main}>{children}</main>
    </>
  )
}
