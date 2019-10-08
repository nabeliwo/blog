import React from 'react'
import { Link, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

import Head from '../components/Head'
import Layout from '../components/Layout'
import Time from '../components/Time'
import TagLink from '../components/TagLink'

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
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

const TagPosts = ({ pageContext, data }) => {
  const { tag: pageTag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `#${pageTag} のタグの記事は${totalCount}件あります。`

  return (
    <>
      <Head
        title={`#${pageTag} の記事一覧`}
        description={`ラリルレロの #${pageTag} タグの記事一覧です。`}
        slug={`/tags/${pageTag}`}
      />
      <Layout>
        <Title>{tagHeader}</Title>

        <Articles>
          {edges.map(({ node }) => {
            const { date, title, tags } = node.frontmatter

            return (
              <Article key={node.id}>
                <Date>
                  <Time format="YYYY.MM.DD">{date}</Time>
                </Date>
                <PostTitle>
                  <TitleLink to={node.fields.slug}>{title}</TitleLink>
                </PostTitle>
                <Tags>
                  {tags.map((tag, i) => (
                    <li key={tag}>
                      <TagLink to={`/tags/${tag}`} color={i % 2 === 0 ? 'pink' : 'blue'}>
                        #{tag}
                      </TagLink>
                    </li>
                  ))}
                </Tags>
              </Article>
            )
          })}
        </Articles>
      </Layout>
    </>
  )
}

export default TagPosts

const Title = styled.h2`
  margin-bottom: ${size.space.XXL};
  font-size: ${size.font.L};
  line-height: 1.4;

  @media all and (max-width: ${size.media.SP_MAX}) {
    margin-bottom: ${size.space.M};
    font-size: ${size.font.M};
  }
`
const Articles = styled.div`
  margin-bottom: calc(${size.space.XXL} + ${size.space.XXL});

  @media all and (max-width: ${size.media.SP_MAX}) {
    margin-bottom: ${size.space.XXL};
  }
`
const Article = styled.article`
  padding: ${size.space.S} 0;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.XS} 0;
  }
`
const Date = styled.p`
  margin-bottom: ${size.space.XXS};
  color: #444;
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.M};

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.S};
  }
`
const PostTitle = styled.p`
  margin-bottom: ${size.space.XXS};
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
  & > li {
    display: inline-block;
    margin: 0.2rem;
  }
`
