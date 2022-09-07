import React, { ComponentProps, FC, ReactNode } from 'react'

import { Head } from '../Head'
import { Header } from '../Header'
import { Footer } from '../Footer'
import * as classes from './Layout.module.css'

type Props = {
  children: ReactNode
} & ComponentProps<typeof Head>

export const Layout: FC<Props> = ({ children, isBlogPost, ...props }) => {
  return (
    <>
      <Head {...props} />

      <Header isBlogPost={isBlogPost} />

      <main className={classes.main}>{children}</main>

      <Footer />
    </>
  )
}
