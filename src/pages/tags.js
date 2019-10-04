import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const Tags = ({ data }) => (
  <Layout>
    <List>
      {data.allMarkdownRemark.group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${tag.fieldValue}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </List>
  </Layout>
)

export default Tags

const List = styled.ul`
  & > li {
    list-style: none;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
`
