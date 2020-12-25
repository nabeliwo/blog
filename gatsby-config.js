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
        url: 'https://github.com/nabeliwo',
      },
    },
  },
  plugins: [
    'gatsby-plugin-typegen',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
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
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-emoji',
        ],
      },
    },
  ],
}
