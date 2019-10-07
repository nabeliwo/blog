import React from 'react'
import styled from 'styled-components'

import { size } from '../themes'

const Footer = () => (
  <Wrapper>
    <Copy>© 2019</Copy>
    <Title>ラリルレロ</Title>
  </Wrapper>
)

export default Footer

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #fc1ebd, #20bffc 100%);
  color: #fff;
  line-height: 40px;
`
const Copy = styled.p`
  margin-right: 0.4rem;
  font-size: ${size.font.S};
`
const Title = styled.span`
  font-family: gagagaga, sans-serif;
  font-size: ${size.font.M};
`
