module.exports = {
  siteMetadata: {
    title: 'ナベリヲログ',
    description: '一日一万回、感謝の「がんばるぞい」',
  },
  plugins: [
    'gatsby-plugin-typegen',
    'gatsby-plugin-postcss',
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
  ],
}
