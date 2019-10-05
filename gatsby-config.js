module.exports = {
  siteMetadata: {
    title: 'ラリルレロ',
    description: '一日一万回、感謝の「がんばるぞい」',
    canonicalUrl: 'https://blog.nabeliwo.com',
    image: 'https://blog.nabeliwo.com/images/logo.png',
    social: {
      twitter: '@nabeliwo',
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
    'gatsby-plugin-twitter',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
}
