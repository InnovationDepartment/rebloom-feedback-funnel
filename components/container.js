import React from 'react'
import styled from 'styled-components'
import { media } from '../utils/style-utils'

const BackgroundContainer = styled.div`
  background-image: url('static/assets/images/background.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  cursor: default;
  min-height: 100vh;
  width: 100%;
`

const ContentContainer = styled.div`
  height: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '1200px ')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;

  ${media.small`
    padding: 0 10px;
    padding-top: ${props => (props.hideLogo ? '40px' : '100px')}
  `};
  ${media.medium`
    padding: 128px 0 0 0;
  `};
`

const LogoImage = styled.img`
  width: auto;
  position: absolute;
  ${media.small`
    height: 32px;
    top: 35px;
  `};
  ${media.medium`
    height: 40px;
    top: 37px;
  `};
`

const Container = props => (
  <BackgroundContainer>
    <ContentContainer {...props}>
      {!props.hideLogo && <LogoImage src="static/assets/images/logo-white.png" />}
      {props.children}
    </ContentContainer>
  </BackgroundContainer>
)

export default Container
