import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { size } from '../themes'

const Header = () => (
  <Wrapper>
    <Logo to="/">
      <img className="blue" src="/images/logo-blue.png" width="591" height="95" />
      <img className="pink" src="/images/logo-pink.png" width="591" height="95" />
    </Logo>
  </Wrapper>
)

export default Header

const Wrapper = styled.header`
  padding: 100px 0 80px;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.XXL} 0;
  }
`
const Logo = styled(Link)`
  position: relative;
  display: block;
  width: 591px;
  height: 95px;
  margin: 0 auto;

  @media all and (max-width: ${size.media.SP_MAX}) {
    width: 300px;
    height: 48px;
  }

  & > .blue,
  & > .pink {
    position: absolute;
    top: 0;
    transition: left 0.2s ease-in-out;

    @media all and (max-width: ${size.media.SP_MAX}) {
      width: 300px;
      height: 48px;
    }
  }
  & > .blue {
    left: 2px;
  }
  & > .pink {
    left: -2px;
    mix-blend-mode: multiply;
  }

  &:hover {
    & > .blue {
      left: -20px;
    }
    & > .pink {
      left: 20px;
    }
  }
`
