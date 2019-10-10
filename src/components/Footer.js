import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

import TwitterIcon from './icons/Twitter'
import InstagramIcon from './icons/Instagram'
import GithubIcon from './icons/Github'
import FeedIcon from './icons/Feed'
import TagLink from './TagLink'

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          twitter {
            url
          }
          instagram {
            url
          }
          github {
            url
          }
        }
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const Footer = () => (
  <StaticQuery
    query={query}
    render={data => {
      const tags = data.allMarkdownRemark.group
      const { title, social } = data.site.siteMetadata

      return (
        <Wrapper>
          <Top>
            <List>
              <li>
                <Title>アバウト</Title>
                <Profile>
                  <ProfileImage>
                    <div>
                      <img src="/images/nabeliwo.png" width="100" height="100" alt="nabeliwo" />
                    </div>
                  </ProfileImage>
                  <p>nabeliwo / なべりを</p>
                </Profile>
                <About>技術とアニメとゲームと本と日常について書きます。</About>
                <Icons>
                  <li>
                    <Anchor href={social.twitter.url} target="_blank" rel="noopener noreferrer">
                      <TwitterIcon />
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon />
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href={social.github.url} target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/rss.xml">
                      <FeedIcon />
                    </Anchor>
                  </li>
                </Icons>
              </li>
              <li>
                <Title>タグ</Title>
                <Tags>
                  {tags.map(tag => (
                    <li key={tag.fieldValue}>
                      <TagLink to={`/tags/${tag.fieldValue}`} color="white">
                        {tag.fieldValue} ({tag.totalCount})
                      </TagLink>
                    </li>
                  ))}
                </Tags>
              </li>
            </List>
          </Top>

          <Bottom>
            <Copy>© 2019</Copy>
            <SiteName>{title}</SiteName>
          </Bottom>
        </Wrapper>
      )
    }}
  />
)

export default Footer

const Wrapper = styled.footer`
  background: linear-gradient(to right, #fc1ebd, #20bffc 100%);
  color: #fff;
`
const Top = styled.div`
  padding: ${size.space.XXL} ${size.space.S};
  text-align: center;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.S} ${size.space.XS};
  }
`
const List = styled.ul`
  & > li:not(:first-child) {
    margin-top: ${size.space.XXL};

    @media all and (max-width: ${size.media.SP_MAX}) {
      margin-top: ${size.space.L};
    }
  }
`
const Title = styled.p`
  display: inline-block;
  margin-bottom: ${size.space.XS};
  padding: 0 ${size.space.XS} ${size.space.XXS};
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.XL};

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.L};
  }
`
const Profile = styled.div`
  margin-bottom: ${size.space.XS};
  font-size: ${size.font.M};

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.S};
  }
`
const ProfileImage = styled.div`
  overflow: hidden;
  display: inline-block;
  width: 140px;
  height: 140px;
  margin-bottom: ${size.space.S};
  transform: rotate(-45deg);

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    transform: rotate(45deg);
  }

  @media all and (max-width: ${size.media.SP_MAX}) {
    margin-bottom: ${size.space.XS};
  }
`
const About = styled.p`
  margin-bottom: ${size.space.XS};
  font-size: ${size.font.S};
  line-height: 1.5;

  @media all and (max-width: ${size.media.SP_MAX}) {
    font-size: ${size.font.XS};
  }
`
const Icons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  & > li {
    margin: 0 0.5rem;
  }
`
const Anchor = styled.a`
  display: inline-block;

  svg {
    fill: #fff;
    transition: fill 0.2s ease-in-out;
  }

  ${isPc &&
    css`
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }
    `}

  ${isSp &&
    css`
      &:active {
        transform: scale(1.2);
      }
    `}
`
const Tags = styled.ul`
  & > li {
    display: inline-block;
    margin: 0.2rem;
  }
`
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${size.space.M} 0;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.XS} 0;
  }
`
const Copy = styled.p`
  margin-right: 0.4rem;
  font-size: ${size.font.S};
`
const SiteName = styled.span`
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.M};
`
