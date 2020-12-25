import React, { FC } from 'react'
import { Link } from 'gatsby'

import classes from './Tags.module.css'

type Props = {
  tags: GatsbyTypes.Maybe<ReadonlyArray<GatsbyTypes.Maybe<string>>>
}

export const Tags: FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className={classes.list}>
      {tags.map((tag, i) => (
        <Link key={i} to={`/tags/${tag}`} className={classes.item}>
          #{tag}
        </Link>
      ))}
    </div>
  )
}
