import React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query TagPosts($tag: String) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const TagPosts = () => {
  return <div>hoge</div>
}

export default TagPosts
