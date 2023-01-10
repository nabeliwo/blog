import { Link, PageProps, graphql } from 'gatsby'
import React, { FC } from 'react'

import { Layout } from '../components/Layout'
import { Pagination } from '../components/Pagination'
import { Tags } from '../components/Tags'
import { Time } from '../components/Time'
import * as classes from '../styles/pages/index.module.css'

export const query = graphql`
  query AllPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, skip: $skip, limit: $limit) {
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

type Props = PageProps<GatsbyTypes.AllPostsQuery> & {
  pageContext: {
    numberOfPages: number
    pageNumber: number
  }
}

const Home: FC<Props> = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <section className={classes.wrapper}>
        {posts.map(({ node }) => {
          const { id, frontmatter, fields } = node

          return (
            <article key={id} className={classes.article}>
              <p className={classes.date}>
                <Time format="YYYY.MM.DD">{frontmatter?.date || ''}</Time>
              </p>

              <h2 className={classes.title}>
                <Link to={fields?.slug || ''}>{frontmatter?.title}</Link>
              </h2>

              <p className={classes.description}>{frontmatter?.description}</p>

              <Tags tags={frontmatter?.tags} />
            </article>
          )
        })}
      </section>

      <div className={classes.paginationWrapper}>
        <Pagination totalPages={pageContext.numberOfPages} currentPage={pageContext.pageNumber} />
      </div>
    </Layout>
  )
}

export default Home
