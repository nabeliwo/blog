import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

import Head from '../components/Head'
import Layout from '../components/Layout'
import TimeComponent from '../components/Time'
import TagLink from '../components/TagLink'
import PostHTML from '../components/PostHTML'
import FacebookIcon from '../components/icons/Facebook'
import TwitterIcon from '../components/icons/Twitter'
import HatenaIcon from '../components/icons/Hatena'
import PocketIcon from '../components/icons/Pocket'

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
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
  const { siteMetadata } = data.site
  const { frontmatter, html, fields } = data.markdownRemark
  const { title, description, date, tags, image } = frontmatter
  const encodedPageFullTitle = encodeURIComponent(`${title} | ${siteMetadata.title}`)
  const encodedPagePermalink = encodeURIComponent(`${siteMetadata.siteUrl}${fields.slug}`)

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
            {image && <KeyVisual src={image} alt={title} />}
          </ArticleHead>
          <PostHTML html={html} />
          <Share>
            <li>
              <ShareItem
                className="facebook"
                href={`http://www.facebook.com/share.php?u=${encodedPagePermalink}&t=${encodedPageFullTitle}`}
                target="new"
              >
                <ShareIcon>
                  <FacebookIcon />
                </ShareIcon>
              </ShareItem>
            </li>
            <li>
              <ShareItem
                className="twitter"
                href={`http://twitter.com/intent/tweet?text=${encodedPageFullTitle}%0a${encodedPagePermalink}`}
                onclick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1' ); return false;"
                target="new"
              >
                <ShareIcon>
                  <TwitterIcon />
                </ShareIcon>
              </ShareItem>
            </li>
            <li>
              <ShareItem
                className="hatena"
                href={`http://b.hatena.ne.jp/add?mode=confirm&url=${encodedPagePermalink}&title=${encodedPageFullTitle}`}
                onclick="window.open(encodeURI(decodeURI(this.href)), 'hatenawindow', 'width=500, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;"
              >
                <ShareIcon>
                  <HatenaIcon />
                </ShareIcon>
              </ShareItem>
            </li>
            <li>
              <ShareItem
                className="pocket"
                href={`http://getpocket.com/edit?url=${encodedPagePermalink}&title=${encodedPageFullTitle}`}
                onclick="window.open(encodeURI(decodeURI(this.href)), 'pocketwindow', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes'); return false;"
              >
                <ShareIcon>
                  <PocketIcon />
                </ShareIcon>
              </ShareItem>
            </li>
          </Share>
        </article>
      </Layout>
    </>
  )
}

export default Post

const ArticleHead = styled.div`
  margin-bottom: calc(${size.space.XXL} + ${size.space.M});
  text-align: center;

  @media all and (max-width: ${size.media.SP_MAX}) {
    margin-bottom: calc(${size.space.XXL} + ${size.space.S});
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
const KeyVisual = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 600px;
  margin: ${size.space.XXL} auto 0;
  vertical-align: top;

  @media all and (max-width: ${size.media.SP_MAX}) {
    max-width: calc(100% + ${size.space.M});
    max-height: auto;
    margin: ${size.space.S} -${size.space.XS} 0;
  }
`
const Share = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: calc(${size.space.XXL} + ${size.space.M}) 0 calc(${size.space.XXL} + ${size.space.XXL});

  & > li {
    margin: 0 0.7rem;
  }

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: 24px;
  }
`
const ShareItem = styled.a`
  position: relative;
  display: block;
  width: 35px;
  height: 35px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    content: '';
  }

  &.facebook::before {
    background-color: #315096;
  }
  &.twitter::before {
    background-color: #55acee;
  }
  &.hatena::before {
    background-color: #008fde;
  }
  &.pocket::before {
    background-color: #ef4456;
  }

  ${isPc &&
    css`
      &:hover::before {
        transition: transform 0.3s;
        transform: rotate(135deg);
      }
    `}

  ${isSp &&
    css`
      &:active {
        filter: brightness(120%);
      }
    `}
`
const ShareIcon = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    fill: #fff;
  }
`
