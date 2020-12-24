import React, { FC } from 'react'
import { Link, PageProps, graphql } from 'gatsby'

export const query = graphql`
  query AllPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, skip: $skip, limit: $limit) {
      edges {
        node {
          id
          frontmatter {
            title
            description
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

const Home: FC<PageProps<GatsbyTypes.AllPostsQuery>> = ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id} style={{ marginBottom: 10 }}>
          <p>{node.frontmatter?.title}</p>
          <p>
            <Link to={node.fields?.slug || ''}>{node.fields?.slug}</Link>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Home
