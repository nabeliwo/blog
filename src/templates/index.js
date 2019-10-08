import React from 'react'
import { Link, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

import Head from '../components/Head'
import Layout from '../components/Layout'
import TimeComponent from '../components/Time'
import TagLink from '../components/TagLink'

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
      {data.allMarkdownRemark.edges.map(({ node }, i) => (
        <Article key={node.id} i={i}>
          <Date>
            <Time format="YYYY.MM.DD">{node.frontmatter.date}</Time>
          </Date>
          <Title>
            <TitleLink to={node.fields.slug}>{node.frontmatter.title}</TitleLink>
          </Title>
          <Tags>
            {node.frontmatter.tags.map((tag, i) => (
              <li key={tag}>
                <TagLink to={`/tags/${tag}`} color={i % 2 === 0 ? 'pink' : 'blue'}>
                  #{tag}
                </TagLink>
              </li>
            ))}
          </Tags>
          <Description>{node.frontmatter.description}</Description>
        </Article>
      ))}

      <Pagination>
        {pageContext.previousPagePath && (
          <PaginationItem to={pageContext.previousPagePath} className="prev">
            マエ
          </PaginationItem>
        )}
        {pageContext.nextPagePath && (
          <PaginationItem to={pageContext.nextPagePath} className="next">
            ツギ
          </PaginationItem>
        )}
      </Pagination>
    </Layout>
  </>
)

export default Index

const Article = styled.article`
  padding: ${size.space.XXL} 0;
  text-align: center;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.M} 0;
  }
`
const Date = styled.p`
  position: relative;
  display: inline-block;
  margin-bottom: ${size.space.XS};

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + 40px);
    height: 1px;
    background-color: #333;
    transform: translateX(-50%);
    content: '';
  }
`
const Time = styled(TimeComponent)`
  position: relative;
  padding: 0 ${size.space.XXS};
  background-color: #fff;
  color: #444;
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.M};

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.S};
  }
`
const Title = styled.p`
  margin-bottom: ${size.space.XS};
`
const TitleLink = styled(Link)`
  font-size: ${size.font.XL};
  line-height: 1.4;

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.L};
  }

  ${isPc &&
    css`
      transition: color 0.2s ease-in-out;

      &:hover {
        color: #20bffc;
      }
    `}

  ${isSp &&
    css`
      &:active {
        color: #20bffc;
      }
    `}
`
const Tags = styled.ul`
  margin-bottom: ${size.space.XS};

  & > li {
    display: inline-block;
    margin: 0.2rem;
  }
`
const Description = styled.p`
  font-size: ${size.font.S};
  line-height: 1.3;

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.XS};
  }
`
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${size.space.XXL} 0;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.M} 0;
  }
`
const PaginationItem = styled(Link)`
  position: relative;
  display: block;
  margin: 0 ${size.space.XXS};
  color: #444;
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.L};

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.M};
  }

  &.prev::before,
  &.next::before {
    position: absolute;
    top: 50%;
    border: 8px solid transparent;
    transform: translateY(-50%);
    content: '';

    @media all and (max-width: ${size.media.SP_MAX}) {
      border-width: 6px;
    }
  }
  &.prev {
    padding-left: 20px;

    &::before {
      left: 0;
      border-right: 20px solid #444;
      border-left: 0;

      @media all and (max-width: ${size.media.SP_MAX}) {
        border-right-width: 16px;
      }
    }
  }
  &.next {
    padding-right: 20px;

    &::before {
      right: -8px;
      border-right: 0;
      border-left: 20px solid #444;

      @media all and (max-width: ${size.media.SP_MAX}) {
        border-left-width: 16px;
      }
    }
  }

  ${isPc &&
    css`
      transition: color 0.2s ease-in-out;

      &:hover {
        color: #20bffc;

        &.prev::before {
          border-right-color: #20bffc;
        }
        &.next::before {
          border-left-color: #20bffc;
        }
      }
    `}

  ${isSp &&
    css`
      &:active {
        color: #20bffc;

        &.prev::before {
          border-right-color: #20bffc;
        }
        &.next::before {
          border-left-color: #20bffc;
        }
      }
    `}
`
