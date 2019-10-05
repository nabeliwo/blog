import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Head from '../components/Head'
import Layout from '../components/Layout'

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, skip: $skip, limit: $limit) {
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

const Index = ({ data, pageContext }) => (
  <>
    <Head />
    <Layout>
      <List>
        {data.allMarkdownRemark.edges.map(({ node }) => (
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

      {pageContext.previousPagePath && <Link to={pageContext.previousPagePath}>Previous</Link>}
      {pageContext.nextPagePath && <Link to={pageContext.nextPagePath}>Next</Link>}
    </Layout>
  </>
)

export default Index

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
