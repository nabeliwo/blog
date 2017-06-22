module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('autoprefixer')({
      browsers: [
        "last 2 versions",
        "safari >= 7"
      ]
    }),
    require('postcss-flexbugs-fixes')(),
    require('postcss-sorting')(),
    require('csswring')(),
  ]
};
