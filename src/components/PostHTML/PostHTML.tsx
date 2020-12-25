import React, { FC } from 'react'

import classes from './PostHTML.module.css'

type Props = {
  html: string
}

export const PostHTML: FC<Props> = ({ html }) => <div className={classes.wrapper} dangerouslySetInnerHTML={{ __html: html }} />
