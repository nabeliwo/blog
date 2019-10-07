import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

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
`
const Logo = styled(Link)`
  position: relative;
  display: block;
  width: 591px;
  height: 95px;
  margin: 0 auto;

  & > .blue,
  & > .pink {
    position: absolute;
    top: 0;
    transition: left 0.2s ease-in-out;
  }
  & > .blue {
    left: 3px;
  }
  & > .pink {
    left: -3px;
    mix-blend-mode: multiply;
  }

  &:hover {
    & > .blue {
      left: -30px;
    }
    & > .pink {
      left: 30px;
    }
  }
`
