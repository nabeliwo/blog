import React, { ComponentProps, FC } from 'react'

import { Head } from '../Head'
import { Header } from '../Header'
import { Footer } from '../Footer'
import classes from './Layout.module.css'

export const Layout: FC<ComponentProps<typeof Head>> = ({ children, isBlogPost, ...props }) => {
  return (
    <>
      <Head {...props} />

      <Header isBlogPost={isBlogPost} />

      <main className={classes.main}>{children}</main>

      <Footer />
    </>
  )
}
