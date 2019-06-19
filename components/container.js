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
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;

  ${media.small`
    padding: 40px 0 0 0;
  `};
  ${media.medium`
    padding: 150px 0 0 0;
  `};
`

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin: 37px 0 53px 0;
  position: absolute;
  top: 10px;
`

const Container = props => (
  <BackgroundContainer>
    <ContentContainer>
      {!props.hideLogo && <LogoImage src="static/assets/images/logo-white.png" />}
      {props.children}
    </ContentContainer>
  </BackgroundContainer>
)

export default Container
