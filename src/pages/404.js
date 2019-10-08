import React from 'react'

import Head from '../components/Head'
import Layout from '../components/Layout'

const NotFound = () => (
  <>
    <Head
      title="404 Page not found"
      meta={[
        {
          name: 'robots',
          content: 'noindex',
        },
      ]}
    />
    <Layout>
      <p>404 Page not found</p>
    </Layout>
  </>
)

export default NotFound
