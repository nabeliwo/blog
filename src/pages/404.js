import React from 'react'
import styled from 'styled-components'

import { size } from '../themes'

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
      <Text>Sorry, 404 Page not found</Text>
    </Layout>
  </>
)

export default NotFound

const Text = styled.p`
  margin-bottom: ${size.space.XXL};
  padding: 100px 0;
  font-size: ${size.font.XL};
  text-align: center;
`
