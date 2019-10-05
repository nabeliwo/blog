module.exports = {
  siteMetadata: {
    title: 'ラリルレロ',
    description: '一日一万回、感謝の「がんばるぞい」',
    canonicalUrl: 'https://blog.nabeliwo.com',
    image: 'https://blog.nabeliwo.com/images/logo.jpg',
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
        plugins: ['gatsby-remark-emoji'],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
}
