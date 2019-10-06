import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { size, palette } from '../themes'

const TagLink = ({ to, children, color }) => (
  <Wrapper to={to} color={color}>
    {children}
  </Wrapper>
)

export default TagLink

const Wrapper = styled(Link)`
  ${({ color }) => css`
    opacity: 1;
    display: inline-block;
    margin: 0.2rem;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    background-color: ${color === 'blue' ? palette.MAIN_LIGHT_BLUE : palette.MAIN_PINK};
    font-size: ${size.font.S};

    @media screen and (min-width: ${size.media.PC_MIN}) {
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }
  `}
`
