import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

const Post = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default Post

const Wrapper = styled.div`
  color: blue;
`
