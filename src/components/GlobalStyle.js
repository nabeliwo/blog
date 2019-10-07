import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = () => <Style />

export default GlobalStyle

const Style = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }
  body {
    @font-face {
      font-family: 'gagagaga';
      src: url('/font/gagagaga.otf') format('opentype');
    }

    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI, Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial, メイリオ, Meiryo, sans-serif;
    word-wrap: break-word;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
    vertical-align: middle;
  }
  input, button, textarea {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    background-color: inherit;
    color: inherit;
  }
`
