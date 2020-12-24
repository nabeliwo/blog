import React, { FC } from 'react'
import { PageProps, graphql } from 'gatsby'

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        tags
        image
      }
      fields {
        slug
      }
    }
  }
`

const Post: FC<PageProps<GatsbyTypes.PostQuery>> = ({ data }) => {
  return (
    <div>
      <p style={{ marginBottom: 20 }}>{data.markdownRemark?.frontmatter?.title}</p>
      <p style={{ marginBottom: 20 }}>{data.markdownRemark?.frontmatter?.date}</p>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark?.html || '' }} />
    </div>
  )
}

export default Post
