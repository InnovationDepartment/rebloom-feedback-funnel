import React from 'react'
import styled from 'styled-components'
import { media } from '../utils/style-utils'

const BackgroundContainer = styled.div`
  background-image: url('/src/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  position: relative;
  cursor: default;
  height: 100vh;
  width: 100%;
`

const ContentContainer = styled.div`
  height: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

export const Container = props => (
  <BackgroundContainer>
    <ContentContainer>{props.children}</ContentContainer>
  </BackgroundContainer>
)
