import React, { FC } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query Head {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export const Head: FC = () => {
  const hoge = useStaticQuery<GatsbyTypes.HeadQuery>(query)

  console.log(hoge.site?.siteMetadata?.title)
  console.log(hoge.site?.siteMetadata?.description)

  return <div />
}
