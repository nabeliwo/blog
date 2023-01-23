import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { FiGithub, FiInstagram, FiRss, FiTwitter } from 'react-icons/fi'

import * as classes from './Footer.module.css'

const query = graphql`
  query Footer {
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
  }
`

export const Footer = () => {
  const data = useStaticQuery<GatsbyTypes.FooterQuery>(query)
  const social = data.site?.siteMetadata?.social

  return (
    <footer className={classes.wrapper}>
      <div className={classes.about}>
        <img src="/images/nabeliwo.png" alt="nabeliwo icon" width={100} />
        <p className={classes.name}>nabeliwo / なべりを</p>
        <p className={classes.description}>このブログでは特にジャンルを絞らず、僕が日常で感じたことを書きます。</p>
      </div>

      <ul className={classes.social}>
        <li>
          <a href={social?.twitter?.url} className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <FiTwitter size={22} />
          </a>
        </li>
        <li>
          <a href={social?.instagram?.url} className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <FiInstagram size={22} />
          </a>
        </li>
        <li>
          <a href={social?.github?.url} className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <FiGithub size={22} />
          </a>
        </li>
        <li>
          <a href="/rss.xml" className={classes.socialLink}>
            <FiRss size={22} />
          </a>
        </li>
      </ul>

      <p className={classes.copyright}>© 2019 nabeliwo.com</p>
    </footer>
  )
}
