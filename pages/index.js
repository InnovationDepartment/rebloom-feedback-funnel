import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { media } from '../utils/style-utils'
import Head from '../components/Head'
import Container from '../components/Container'
import TermsAndConditions from '../components/TandC'
import { PrimaryButton } from '../components/buttons'
import { H1, H3, P } from '../components/text'

const BottleImage = styled.img.attrs(props => ({
  src: 'static/assets/images/bottle.png',
}))`
  ${media.small`
    height: 200px;
  `};
  ${media.medium`
    height: 525px;
    margin: 0 5% 0 10%;
  `};
`
const DesktopBottleImage = styled(BottleImage)`
  ${media.small`
    display: none;
  `};
  ${media.medium`
    display: block;
  `};
`

const MobileBottleImage = styled(BottleImage)`
  ${media.small`
    display: block;
    margin: 25px 0 42px 0;
  `};
  ${media.medium`
    display: none;
  `};
`

const SubHeading = styled(H3)`
  ${media.small`
    margin-bottom: 25px;
  `};
`

const TermsText = styled(P)`
  ${media.small`
    margin-bottom: 36px
  `};
  ${media.medium`
    margin-bottom: 22px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100%;
  margin: 0 auto;
  max-width: 700px;
`

const TermsLinksContainer = styled(P)`
  ${media.small`
    font-size: 10px;
    line-height: 10px;
  `};
  ${media.medium`
    font-size: 18px;
    line-height: 18px;
  `};
`

const TermsLinks = styled.span`
  text-decoration: none !important;
  color: #fff;
  margin: 0;
  cursor: pointer;
`

const CTAButton = styled(PrimaryButton)`
  ${media.small`
    margin-bottom: 36px
  `};
  ${media.medium`
    margin: 50px 0;
  `};
`

const LandingPage = () => (
  <Fragment>
    <Head title="reBloom Bonus Offer" />
    <Container hideLogo>
      <DesktopBottleImage />
      <TextContainer>
        <H1>Free 7-Pack of reBloom</H1>
        <H3>Seriously, no strings attached.</H3>
        <MobileBottleImage />
        <Link href="/sign-up">
          <CTAButton>I WANT FREE REBLOOM</CTAButton>
        </Link>
        <>
          <TermsText>
            This offer is valid for past Amazon customers only. To qualify for a free seven-pack of
            reBloom, you must provide your Order ID as proof of purchase. Order must have been
            purchased with no discount code greater than 30%. Valid in the US only. Limit one per
            household.
          </TermsText>
          <TermsLinksContainer>
            <Link href="/terms-and-conditions">
              <TermsLinks>Terms and Conditions </TermsLinks>
            </Link>
            <TermsLinks>&nbsp;&nbsp;|&nbsp;&nbsp;</TermsLinks>
            <Link href="/privacy-policy">
              <TermsLinks>Privacy Policy </TermsLinks>
            </Link>
          </TermsLinksContainer>
        </>
      </TextContainer>
    </Container>
  </Fragment>
)

export default LandingPage
