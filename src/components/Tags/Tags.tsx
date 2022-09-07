import React, { FC } from 'react'
import { Link } from 'gatsby'

import { getTagLabel } from './getTagLabel'
import * as classes from './Tags.module.css'

type Props = {
  tags: GatsbyTypes.Maybe<ReadonlyArray<GatsbyTypes.Maybe<string>>>
}

export const Tags: FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div>
      {tags.map((tag, i) => (
        <Link key={i} to={`/tags/${tag}`} className={classes.item}>
          # {getTagLabel(tag || '')}
        </Link>
      ))}
    </div>
  )
}
