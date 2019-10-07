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

const Content = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 0 ${size.space.S};
  box-sizing: border-box;
`
