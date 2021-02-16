import React, { FC } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

const query = graphql`
  query Head {
    site {
      siteMetadata {
        title
        description
        image
        siteUrl
        social {
          twitter {
            name
          }
        }
      }
    }
  }
`

type Props = {
  title?: string
  description?: string
  image?: string
  slug?: string
  isBlogPost?: boolean
  meta?: Array<{
    name: string
    content: string
  }>
}

export const Head: FC<Props> = ({ title, description, image, slug, isBlogPost = false, meta = [] }) => {
  const data = useStaticQuery<GatsbyTypes.HeadQuery>(query)
  const siteMetadata = data.site?.siteMetadata

  const pageTitle = title ? `${title} | ${siteMetadata?.title}` : siteMetadata?.title
  const metaDescription = description || siteMetadata?.description
  const metaImage = image ? `${siteMetadata?.siteUrl}${image}` : siteMetadata?.image
  const metaUrl = slug ? `${siteMetadata?.siteUrl}${slug}` : siteMetadata?.siteUrl

  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={pageTitle}
      link={[
        {
          rel: 'shortcut icon',
          href: '/images/favicon.ico',
        },
      ]}
      meta={[
        ...meta,
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
          content: siteMetadata?.title,
        },
        {
          name: 'og:type',
          content: isBlogPost ? 'article' : 'website',
        },
        {
          name: 'og:title',
          content: pageTitle,
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
          content: `@${siteMetadata?.social?.twitter?.name}`,
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
      ]}
    />
  )
}
