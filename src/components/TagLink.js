import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { isPc, isSp } from '../libs/ua'
import { size } from '../themes'

const TagLink = ({ to, color = '', children }) => (
  <Wrapper to={to} className={color}>
    {children}
  </Wrapper>
)

export default TagLink

const Wrapper = styled(Link)`
  display: inline-block;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: ${size.font.S};
  color: #333;

  &.pink {
    background-color: #fc1ebd;
  }

  &.blue {
    background-color: #20bffc;
  }

  ${isPc &&
    css`
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    `}

  ${isSp &&
    css`
      &:active {
        opacity: 0.7;
      }
    `}
`
