import React from 'react'
import styled from 'styled-components'

import { size } from '../themes'

import GlobalStyle from './GlobalStyle'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => (
  <>
    <GlobalStyle />

    <Header />
    <Content>{children}</Content>
    <Footer />
  </>
)

export default Layout

const Content = styled.main`
  max-width: calc(820px + ${size.space.S} * 2);
  margin: 0 auto;
  padding: 0 ${size.space.S};
  box-sizing: border-box;

  @media all and (max-width: ${size.media.SP_MAX}) {
    padding: 0 ${size.space.XS};
  }
`
