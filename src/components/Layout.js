import React from 'react'
import styled from 'styled-components'

const Layout = ({ children }) => (
  <>
    <Header>ラリルレロ</Header>
    <main>{children}</main>
    <Footer>created by nabeliwo</Footer>
  </>
)

export default Layout

const Header = styled.header`
  padding: 100px;
`
const Footer = styled.footer`
  padding: 100px;
`
