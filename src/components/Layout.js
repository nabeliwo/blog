import React from 'react'
import styled from 'styled-components'

import { size } from '../themes'

import GlobalStyle from './GlobalStyle'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => (
  <>
    <GlobalStyle />

    <Header />

    <Content>
      <Sidebar />
      <Main>{children}</Main>
    </Content>

    <Footer />
  </>
)

export default Layout

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 1120px;
  margin: 0 auto ${size.space.XXL};
  padding: 0 ${size.space.S};
  box-sizing: border-box;
`
const Main = styled.main`
  flex: 1;
  padding-left: ${size.space.S};
`
