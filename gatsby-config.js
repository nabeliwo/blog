module.exports = {
  siteMetadata: {
    title: 'ラリルレロ',
    description: '一日一万回、感謝の「がんばるぞい」',
    author: 'nabeliwo',
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
        url: 'https://github.com/nabeliwo',
      },
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 560,
              height: 315,
            },
          },
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
              return allMarkdownRemark.edges.map(edge => {
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
                  sort: { fields: [frontmatter___date], order: DESC },
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
    'gatsby-plugin-twitter',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
}
