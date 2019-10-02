import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const Index = ({ data }) => (
  <div>
    <List>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>
            <Title>{node.frontmatter.title}</Title>
            <Date>{node.frontmatter.date}</Date>
          </Link>
        </li>
      ))}
    </List>
  </div>
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
