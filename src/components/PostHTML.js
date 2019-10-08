import React from 'react'
import styled from 'styled-components'

const PostHTML = ({ html }) => <Wrapper dangerouslySetInnerHTML={{ __html: html }} />

export default PostHTML

const Wrapper = styled.main`
  text-align: center;
`
