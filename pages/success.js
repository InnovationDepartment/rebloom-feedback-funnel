import React, { Fragment } from 'react'
import styled from 'styled-components'

import { media } from '../utils/style-utils'
import Head from '../components/Head'
import Container from '../components/Container'
import { H1, H3 } from '../components/text'

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-top: 37px;
  position: absolute;
  top: 10px;
  z-index: 100;
`

const BottleImage = styled.img.attrs(props => ({
  src: 'static/assets/images/bottle.png',
}))`
  ${media.small`
    display: none;
  `};
  ${media.medium`
    height: 525px;
    margin: 0 10% 0 10%;
    display: block;
  `};
`

const MobileBottleImage = styled(BottleImage)`
  ${media.small`
    display: block;
    width: 80px;
    margin: auto;
  `};
  ${media.medium`
    display: none;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  height: 100%;
  margin: 0 auto;
  max-width: 700px;
`

const StyledH1 = styled(H1)`
  font-family: 'Silka-Bold';
  font-weight: 400;
  ${media.small`
    text-align: center;
  `};
  ${media.medium`
    text-align: left;
  `};
`

const StyledH3 = styled(H3)`
  font-weight: 400;
  ${media.small`
    text-align: center;
    margin-bottom: 20px;
  `};
  ${media.medium`
    text-align: left;
    margin-bottom: 30px;
  `};
`

const SmallerCopy = styled(StyledH3)`
  font-size: 32px;
  font-family: 'Lato';
  ${media.small`
    margin-top: 20px;
  `};
  ${media.medium`
    margin-top: 0;
  `};
`

const LandingPage = () => (
  <Fragment>
    <Head title="reBloom" />
    <Container>
      <BottleImage src="static/assets/images/bottle.png" />
      <TextContainer>
        <StyledH1>Success!</StyledH1>
        <StyledH3>We told you it would be easy.</StyledH3>

        <MobileBottleImage />
        <SmallerCopy>
          Your free reBloom is on the way. Look out for a confirmation email with tracking
          information.
        </SmallerCopy>
        <SmallerCopy>Sweet dreams!</SmallerCopy>
      </TextContainer>
    </Container>
  </Fragment>
)

export default LandingPage
