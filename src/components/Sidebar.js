import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

import { size, palette } from '../themes'

import TwitterIcon from './icons/Twitter'
import InstagramIcon from './icons/Instagram'
import GithubIcon from './icons/Github'
import FeedIcon from './icons/Feed'
import TagLink from './TagLink'

const query = graphql`
  query {
    site {
      siteMetadata {
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

const Sidebar = () => (
  <StaticQuery
    query={query}
    render={data => {
      const tags = data.allMarkdownRemark.group
      const { social } = data.site.siteMetadata

      return (
        <Wrapper>
          <List>
            <li>
              <Title>アバウト</Title>
              <Profile>
                <img src="/images/nabeliwo.png" width="50" height="50" alt="nabeliwo" />
                <ProfileText>
                  <p>nabeliwo / なべりを</p>
                </ProfileText>
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
                {tags.map((tag, i) => (
                  <li key={tag.fieldValue}>
                    <TagLink to={`/tags/${tag.fieldValue}`} color={i % 2 !== 0 ? 'blue' : ''}>
                      # {tag.fieldValue} ({tag.totalCount})
                    </TagLink>
                  </li>
                ))}
              </Tags>
            </li>
          </List>
        </Wrapper>
      )
    }}
  />
)

export default Sidebar

const Wrapper = styled.aside`
  width: 240px;
`
const List = styled.ul`
  & > li:not(:first-child) {
    margin-top: ${size.space.M};
  }
`
const Title = styled.p`
  position: relative;
  margin-bottom: ${size.space.XS};
  padding-bottom: ${size.space.XXS};
  font-family: 'gagagaga', sans-serif;
  font-size: ${size.font.XL};

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, ${palette.MAIN_PINK}, ${palette.MAIN_LIGHT_BLUE} 100%);
    content: '';
  }
`
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${size.space.XXS};
`
const ProfileText = styled.div`
  margin-left: ${size.space.XXS};
  font-size: ${size.font.M};
`
const About = styled.p`
  margin-bottom: ${size.space.XS};
  font-size: ${size.font.S};
  line-height: 1.5;
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
    fill: #333;
    transition: fill 0.2s ease-in-out;
  }

  @media screen and (min-width: ${size.media.PC_MIN}) {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(0.8);

      svg {
        fill: ${palette.MAIN_LIGHT_BLUE};
      }
    }
  }
`
const Tags = styled.ul`
  & > li {
    display: inline-block;
  }
`
