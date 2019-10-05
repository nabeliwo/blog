import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const Head = ({ meta = [], isBlogPost = false, title, description, image, slug }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            social {
              twitter
            }
          }
        }
      }
    `}
    render={data => {
      const { siteMetadata } = data.site
      const metaTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title
      const metaDescription = description || siteMetadata.description
      const metaImage = image || siteMetadata.image
      const metaUrl = slug ? `${siteMetadata.canonicalUrl}${slug}` : siteMetadata.canonicalUrl

      return (
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[
            // General tags
            {
              name: 'description',
              content: metaDescription,
            },
            {
              name: 'image',
              content: metaImage,
            },

            // OpenGraph tags
            {
              name: 'og:url',
              content: metaUrl,
            },
            {
              name: 'og:site_name',
              content: siteMetadata.title,
            },
            {
              name: 'og:type',
              content: isBlogPost ? 'article' : 'website',
            },
            {
              name: 'og:title',
              content: metaTitle,
            },
            {
              name: 'og:description',
              content: metaDescription,
            },
            {
              name: 'og:image',
              content: metaImage,
            },

            // Twitter Card tags
            {
              name: 'twitter:card',
              content: 'summary_large_image', // 1200px × 630px
            },
            {
              name: 'twitter:creator',
              content: siteMetadata.social.twitter,
            },
            {
              name: 'twitter:title',
              content: metaTitle,
            },
            {
              name: 'twitter:description',
              content: metaDescription,
            },
            {
              name: 'twitter:image',
              content: metaImage,
            },
          ].concat(meta)}
          title={metaTitle}
        />
      )
    }}
  />
)

export default Head
