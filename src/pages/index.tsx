import React from 'react'

import { Layout } from '../components/Layout'

import styles from '../styles/pages/index.module.css'

export default function Home() {
  return (
    <Layout>
      <div className={styles.title}>Hello world!</div>
    </Layout>
  )
}
