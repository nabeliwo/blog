import React, { FC } from 'react'
import { Link, PageProps, graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Time } from '../components/Time'
import { PostHTML } from '../components/PostHTML'

import classes from '../styles/pages/post.module.css'
import { Tags } from '../components/Tags'

export const query = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        image
        tags
      }
      fields {
        slug
      }
    }
  }
`

const Post: FC<PageProps<GatsbyTypes.PostQuery>> = ({ data }) => {
  const title = data.markdownRemark?.frontmatter?.title
  const description = data.markdownRemark?.frontmatter?.description
  const date = data.markdownRemark?.frontmatter?.date
  const image = data.markdownRemark?.frontmatter?.image
  const tags = data.markdownRemark?.frontmatter?.tags
  const slug = data.markdownRemark?.fields?.slug
  const html = data.markdownRemark?.html
  // const encodedPageFullTitle = encodeURIComponent(`${title} | ${siteMetadata.title}`)
  // const encodedPagePermalink = encodeURIComponent(`${siteMetadata.siteUrl}${slug}`)

  return (
    <Layout title={title} description={description} image={image} slug={slug} isBlogPost>
      <article>
        <div className={classes.head}>
          <p className={classes.date}>
            <Time format="YYYY.MM.DD">{date || ''}</Time>
          </p>

          <h1 className={classes.title}>{title}</h1>

          <Tags tags={tags} />

          {image && <img className={classes.keyVisual} src={image} width="100%" alt="" />}
        </div>

        <div className={classes.content}>
          <PostHTML html={html || ''} />
        </div>
      </article>
    </Layout>
  )
}

export default Post
