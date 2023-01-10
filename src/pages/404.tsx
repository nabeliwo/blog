import { Link } from 'gatsby'
import React from 'react'

import { Layout } from '../components/Layout'
import * as classes from '../styles/pages/404.module.css'

const NotFound = () => (
  <Layout
    title="404 Page not found"
    meta={[
      {
        name: 'robots',
        content: 'noindex',
      },
    ]}
  >
    <div className={classes.wrapper}>
      <div className={classes.head}>
        <h2 className={classes.title}>404 - Page not found</h2>
        <p>Sorry, This page does not exist.</p>
      </div>

      <p className={classes.description}>
        お探しのページは一時的にアクセスができない状況にあるか、削除・変更された可能性があります。
      </p>

      <Link to="/" className={classes.link}>
        トップページへ戻る
      </Link>
    </div>
  </Layout>
)

export default NotFound
