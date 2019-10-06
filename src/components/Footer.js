import React from 'react'
import styled from 'styled-components'

import { size, palette } from '../themes'

const Footer = () => (
  <Wrapper>
    <Copy>© 2019 ラリルレロ</Copy>
  </Wrapper>
)

export default Footer

const Wrapper = styled.footer`
  background: linear-gradient(to right, ${palette.MAIN_PINK}, ${palette.MAIN_LIGHT_BLUE} 100%);
`
const Copy = styled.p`
  font-size: ${size.font.S};
  text-align: center;
  color: #fff;
  line-height: 40px;
`
