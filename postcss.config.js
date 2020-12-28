module.exports = () => ({
  plugins: [
    require('postcss-custom-media'),
    require('postcss-nested'),
    require('cssnano')({
      preset: [
        'default',
        {
          normalizeUrl: false,
        },
      ],
    }),
  ],
})
