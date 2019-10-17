import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { size } from '../themes'
import { isPc, isSp } from '../libs/ua'

const Header = () => (
  <Wrapper>
    <Title to="/">
      <TitleText className="blue">ラリルレロ</TitleText>
      <TitleText className="pink">ラリルレロ</TitleText>
    </Title>
  </Wrapper>
)

export default Header

const Wrapper = styled.header`
  padding: 100px 0 80px;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: ${size.space.XXL} 0;
  }
`
const Title = styled(Link)`
  position: relative;
  display: block;
  width: 590px;
  margin: 0 auto;
  font-family: gagagaga, sans-serif;
  font-size: 134px;
  text-align: center;

  @media all and (max-width: ${size.media.SP_MAX}) {
    width: 300px;
    font-size: 64px;
  }

  & > .blue {
    color: #20bffc;
    transform: translateX(2px);
  }
  & > .pink {
    position: absolute;
    top: 0;
    left: 50%;
    color: #fc1ebd;
    mix-blend-mode: multiply;
    transform: translateX(calc(-50% - 2px));
  }

  ${isPc &&
    css`
      &:hover {
        & > .blue {
          transform: translateX(-20px);
        }
        & > .pink {
          transform: translateX(calc(-50% + 20px));
        }
      }
    `}

  ${isSp &&
    css`
      &:active {
        & > .blue {
          transform: translateX(-20px);
        }
        & > .pink {
          transform: translateX(calc(-50% + 20px));
        }
      }
    `}
`
const TitleText = styled.p`
  width: 100%;
  transition: all 0.2s ease-in-out;
`
