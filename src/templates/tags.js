import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <List>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields.slug}>
              <Title>{node.frontmatter.title}</Title>
            </Link>
            <div>
              {node.frontmatter.tags.map(tag => (
                <Link key={tag} to={`/tags/${tag}`}>
                  #{tag}
                </Link>
              ))}
            </div>
            <Date>{node.frontmatter.date}</Date>
            <p>{node.frontmatter.description}</p>
          </li>
        ))}
      </List>
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default Tags

const List = styled.ul`
  & > li {
    list-style: none;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
`
const Title = styled.h2`
  margin: 0 0 10px;
  font-size: bold;
`
const Date = styled.p`
  margin: 0;
`
