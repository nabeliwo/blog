import React from 'react'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

const PostHTML = ({ html }) => <Wrapper dangerouslySetInnerHTML={{ __html: html }} />

export default PostHTML

const Wrapper = styled.main`
  h2 {
    position: relative;
    margin: calc(${size.space.XXL} + ${size.space.XXL}) 0 ${size.space.M};
    padding-bottom: ${size.space.XXS};
    font-size: ${size.font.L};
    text-align: center;
    line-height: 1.75;

    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 120px;
      height: 2px;
      background: linear-gradient(to right, #fc1ebd, #20bffc 100%);
      transform: translateX(-50%);
      content: '';
    }

    @media all and (max-width: ${size.media.SP_MAX}) {
      margin: calc(${size.space.XXL} + ${size.space.XXS}) 0 ${size.space.M};
      text-align: left;

      &::after {
        width: 100%;
      }
    }
  }

  h3 {
    margin: ${size.space.M} 0;
    font-weight: bold;
    font-size: ${size.font.M};
    line-height: 2;

    @media all and (max-width: ${size.media.SP_MAX}) {
      line-height: 1.8;
    }
  }

  p {
    margin: ${size.space.M} 0;
    font-size: ${size.font.M};
    line-height: 2;

    @media all and (max-width: ${size.media.SP_MAX}) {
      line-height: 1.8;
    }
  }

  a {
    color: #20bffc;
    text-decoration: underline;
    ${isPc &&
      css`
        &:hover {
          text-decoration: none;
        }
      `}

    ${isSp &&
      css`
        &:active {
          text-decoration: none;
        }
      `}
  }

  ul {
    margin: ${size.space.L} 0;
    padding-left: ${size.space.M};

    @media all and (max-width: ${size.media.SP_MAX}) {
      padding-left: ${size.space.S};
    }

    p {
      margin: 0;
    }

    li {
      position: relative;
      font-size: ${size.font.M};
      line-height: 2;

      &::before {
        position: absolute;
        top: 12px;
        left: -${size.space.S};
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background: linear-gradient(to right, #fc1ebd, #20bffc 100%);
        transform: rotate(45deg);
        content: '';
      }

      @media all and (max-width: ${size.media.SP_MAX}) {
        line-height: 1.8;

        &::before {
          top: 12px;
          left: calc((${size.space.XS} + 2px) * -1);
          width: 8px;
          height: 8px;
        }
      }

      ul {
        margin: 0;

        li::after {
          position: absolute;
          top: 14px;
          left: calc(2px - ${size.space.S});
          width: 6px;
          height: 6px;
          border-radius: 2px;
          background-color: #fff;
          transform: rotate(45deg);
          content: '';

          @media all and (max-width: ${size.media.SP_MAX}) {
            top: 14px;
            left: -${size.space.XS};
            width: 4px;
            height: 4px;
          }
        }
      }
    }
  }

  ol {
    margin: ${size.space.L} 0;
    padding-left: ${size.space.M};

    @media all and (max-width: ${size.media.SP_MAX}) {
      padding-left: ${size.space.S};
    }

    p {
      margin: 0;
    }

    li {
      font-size: ${size.font.M};
      line-height: 2;
      list-style-type: decimal;

      @media all and (max-width: ${size.media.SP_MAX}) {
        line-height: 1.8;
      }

      ol {
        margin: 0;

        li {
          list-style-type: lower-latin;
        }
      }
    }
  }

  strong {
    font-weight: bold;
  }

  table {
    width: 100%;
    font-size: ${size.font.S};
    border-collapse: collapse;

    & > tbody > tr {
      border-top: 1px solid #d9d9d9;

      &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }

    th,
    td {
      padding: ${size.space.XXS};
      border: 1px solid #d9d9d9;
    }

    th {
      font-weight: bold;
    }
  }

  hr {
    display: block;
    width: 20%;
    height: 0;
    margin: calc(${size.space.XXL} + ${size.space.M}) auto;
    border: none;
    border-top: 1px dashed #333;

    @media all and (max-width: ${size.media.SP_MAX}) {
      width: 80%;
      margin: calc(${size.space.XXL} + ${size.space.XXS}) auto;
    }
  }

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 600px;
    margin: 0 auto;
    vertical-align: top;

    @media all and (max-width: ${size.media.SP_MAX}) {
      max-height: 400px;
    }
  }

  pre {
    font-size: ${size.font.S};
  }

  .twitter-tweet,
  .instagram-media {
    margin-right: auto !important;
    margin-left: auto !important;

    @media all and (max-width: ${size.media.SP_MAX}) {
      min-width: 288px !important;
    }
  }

  .gatsby-resp-iframe-wrapper {
    margin: ${size.space.M} 0;
  }
`
