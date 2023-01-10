import { Link, PageProps, graphql } from 'gatsby'
import React, { FC } from 'react'
import { FiFacebook, FiPocket, FiTwitter } from 'react-icons/fi'
import { SiHatenabookmark } from 'react-icons/si'

import { Layout } from '../components/Layout'
import { PostHTML } from '../components/PostHTML'
import { Tags } from '../components/Tags'
import { Time } from '../components/Time'
import * as classes from '../styles/pages/post.module.css'

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

type PostType = {
  fields: { slug: string }
  frontmatter: { title: string }
}

type Props = PageProps<GatsbyTypes.PostQuery> & {
  pageContext: {
    next: PostType | null
    previous: PostType | null
  }
}

const Post: FC<Props> = ({ data, pageContext }) => {
  const title = data.markdownRemark?.frontmatter?.title
  const description = data.markdownRemark?.frontmatter?.description
  const date = data.markdownRemark?.frontmatter?.date
  const image = data.markdownRemark?.frontmatter?.image
  const tags = data.markdownRemark?.frontmatter?.tags
  const slug = data.markdownRemark?.fields?.slug
  const html = data.markdownRemark?.html
  const siteTitle = data.site?.siteMetadata?.title
  const siteUrl = data.site?.siteMetadata?.siteUrl
  const encodedPageFullTitle = encodeURIComponent(`${title} | ${siteTitle}`)
  const encodedPagePermalink = encodeURIComponent(`${siteUrl}${slug}`)
  const facebookShareUrl = `http://www.facebook.com/share.php?u=${encodedPagePermalink}&t=${encodedPageFullTitle}`
  const twitterShareUrl = `http://twitter.com/intent/tweet?text=${encodedPageFullTitle}%0a${encodedPagePermalink}`
  const hatenaShareUrl = `http://b.hatena.ne.jp/add?mode=confirm&url=${encodedPagePermalink}&title=${encodedPageFullTitle}`
  const pocketShareUrl = `http://getpocket.com/edit?url=${encodedPagePermalink}&title=${encodedPageFullTitle}`

  const nextPost = pageContext.next
  const previousPost = pageContext.previous

  return (
    <Layout title={title} description={description} image={image} slug={slug} isBlogPost>
      <article>
        <div className={classes.head}>
          <p className={classes.date}>
            <Time format="YYYY.MM.DD">{date || ''}</Time>
          </p>

          <h1 className={classes.title}>{title}</h1>

          <Tags tags={tags} />

          {image && (
            <div className={classes.keyVisual}>
              <img src={image} width="100%" alt="" />
            </div>
          )}
        </div>

        <div className={classes.content}>
          <PostHTML html={html || ''} />
        </div>
      </article>

      <div className={classes.share}>
        <div className={classes.shareInner}>
          <p className={classes.shareTitle}>Share</p>

          <ul className={classes.shareList}>
            <li>
              <a href={facebookShareUrl} target="new">
                <FiFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href={twitterShareUrl}
                onClick={(e) => {
                  e.preventDefault()

                  window.open(
                    twitterShareUrl,
                    'tweetwindow',
                    'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1',
                  )
                }}
                target="new"
              >
                <FiTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href={hatenaShareUrl}
                onClick={(e) => {
                  e.preventDefault()

                  window.open(hatenaShareUrl, 'hatenawindow', 'width=500, height=450, menubar=no, toolbar=no, scrollbars=yes')
                }}
              >
                <SiHatenabookmark size={24} />
              </a>
            </li>
            <li>
              <a
                href={pocketShareUrl}
                onClick={(e) => {
                  e.preventDefault()

                  window.open(pocketShareUrl, 'pocketwindow', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes')
                }}
              >
                <FiPocket size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.links}>
        <ul className={classes.otherPosts}>
          {nextPost && (
            <li>
              <p className={classes.otherPostLabel}>新しい記事</p>

              <Link className={classes.otherPostLink} to={nextPost.fields.slug}>
                {nextPost.frontmatter.title}
              </Link>
            </li>
          )}

          {previousPost && (
            <li>
              <p className={classes.otherPostLabel}>前の記事</p>

              <Link className={classes.otherPostLink} to={previousPost.fields.slug}>
                {previousPost.frontmatter.title}
              </Link>
            </li>
          )}
        </ul>

        <div className={classes.move}>
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

export default Post
