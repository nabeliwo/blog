'use strict'

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

require('./src/__generated__/gatsby-types')

const { onCreateNode, createPages } = require('./src/gatsby-node/index')

exports.onCreateNode = onCreateNode
exports.createPages = createPages
