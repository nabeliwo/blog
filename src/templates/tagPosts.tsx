import { Link, PageProps, graphql } from 'gatsby'
import React, { FC } from 'react'

import { Layout } from '../components/Layout'
import { getTagLabel } from '../components/Tags'
import { Time } from '../components/Time'
import * as classes from '../styles/pages/tagPosts.module.css'

export const query = graphql`
  query TagPosts($tag: String) {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

type Props = PageProps<GatsbyTypes.TagPostsQuery> & {
  pageContext: {
    tag: string
  }
}

const TagPosts: FC<Props> = ({ data, pageContext }) => {
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <Layout>
      <div className={classes.wrapper}>
        <p className={classes.description}>
          # {getTagLabel(pageContext.tag)} のタグがついた記事は{totalCount}件あります。
        </p>

        <section>
          {edges.map(({ node }) => {
            const { id, frontmatter, fields } = node

            return (
              <article key={id} className={classes.article}>
                <p className={classes.date}>
                  <Time format="YYYY.MM.DD">{frontmatter?.date || ''}</Time>
                </p>

                <h2 className={classes.title}>
                  <Link to={fields?.slug || ''}>{frontmatter?.title}</Link>
                </h2>
              </article>
            )
          })}
        </section>

        <div className={classes.links}>
          <Link to="/" className={classes.moveLink}>
            ホームに戻る
          </Link>

          <button className={classes.moveLink} onClick={() => scrollTo(0, 0)}>
            ページトップに戻る
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default TagPosts
