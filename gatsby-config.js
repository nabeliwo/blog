module.exports = {
  siteMetadata: {
    title: 'ナベリヲログ',
    description: '一日一万回、感謝の「がんばるぞい」',
    siteUrl: 'https://blog.nabeliwo.com',
    image: 'https://blog.nabeliwo.com/images/logo.png',
    social: {
      twitter: {
        name: 'nabeliwo',
        url: 'https://twitter.com/nabeliwo',
      },
      instagram: {
        name: 'nabeliwo',
        url: 'https://www.instagram.com/nabeliwo',
      },
      github: {
        name: 'nabeliwo',
        url: 'https://github.com/nabeliwo/blog',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-W361GVK4CZ'],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    'gatsby-plugin-typegen',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 660,
              showCaptions: ['title'],
            },
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 560,
              height: 315,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-emoji',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } },
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        description
                        date
                      }
                      fields { slug }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "nabeliwo blog's RSS Feed",
          },
        ],
      },
    },
  ],
}
