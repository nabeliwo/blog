import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { size } from '../themes'

import Head from '../components/Head'
import Layout from '../components/Layout'
import TimeComponent from '../components/Time'
import TagLink from '../components/TagLink'
import PostHTML from '../components/PostHTML'

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        tags
        image
      }
      fields {
        slug
      }
    }
  }
`

const Post = ({ data }) => {
  const { frontmatter, html, fields } = data.markdownRemark
  const { title, description, date, tags, image } = frontmatter

  return (
    <>
      <Head title={title} description={description} image={image} slug={fields.slug} isBlogPost />
      <Layout>
        <article>
          <ArticleHead>
            <Date>
              <Time format="YYYY.MM.DD">{date}</Time>
            </Date>
            <Title>{title}</Title>
            <Tags>
              {tags.map((tag, i) => (
                <li key={tag}>
                  <TagLink to={`/tags/${tag}`} color={i % 2 === 0 ? 'pink' : 'blue'}>
                    #{tag}
                  </TagLink>
                </li>
              ))}
            </Tags>
          </ArticleHead>
          <PostHTML html={html} />
        </article>
      </Layout>
    </>
  )
}

export default Post

const ArticleHead = styled.div`
  margin-bottom: ${size.space.XXL};
  text-align: center;
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
const Title = styled.h1`
  margin-bottom: ${size.space.XS};
  font-size: ${size.font.XL};
  line-height: 1.4;

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: 24px;
  }
`
const Tags = styled.ul`
  & > li {
    display: inline-block;
    margin: 0.2rem;
  }
`
