import React from 'react'
import { graphql } from 'gatsby'

import Head from '../components/Head'
import Layout from '../components/Layout'

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        image
      }
      fields {
        slug
      }
    }
  }
`

const Post = ({ data }) => {
  const { frontmatter, html, fields } = data.markdownRemark
  const { title, description, date, image } = frontmatter

  return (
    <>
      <Head title={title} description={description} image={image} slug={fields.slug} isBlogPost />
      <Layout>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </>
  )
}

export default Post
