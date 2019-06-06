import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { media } from '../static/utils/style-utils'
import Head from '../static/components/head'
import Container from '../static/components/container'
import TermsAndConditions from '../static/components/TandC'
import { PrimaryButton } from '../static/components/buttons'
import { H1, H3, P } from '../static/components/text'

const BottleImage = styled.img`
  height: 525px;
  margin: 0 5% 0 10%;
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

const TermsLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  font-size: 22px;
  margin-top: 20px;
`

const TermsLinks = styled(P)`
  text-decoration: none !important;
  color: #fff;
  margin: 0;
  cursor: pointer;
`

const LandingPage = () => (
  <Fragment>
    <Head title="reBloom" />
    <Container>
      <BottleImage src="static/assets/images/bottle.png" />
      <TextContainer>
        <H1>Free 7-Pack of reBloom</H1>
        <H3>Seriously, no strings attached.</H3>
        <Link href="/sign-up">
          <PrimaryButton>I WANT FREE REBLOOM</PrimaryButton>
        </Link>
        <div>
          <P>
            This offer is valid for past Amazon customers only. To qualify for a
            free seven-pack of reBloom, you must provide your Order ID as proof
            of purchase. Order must have been purchased with no discount code
            greater than 30%. Valid in the US only. Limit one per household.
          </P>
          <TermsLinksContainer>
            <Link href="/terms-and-conditions">
              <TermsLinks>Terms and Conditions </TermsLinks>
            </Link>
            {'  '}|{'  '}
            <Link href="/privacy-policy">
              <TermsLinks>Privacy Policy </TermsLinks>
            </Link>
          </TermsLinksContainer>
        </div>
      </TextContainer>
    </Container>
  </Fragment>
)

export default LandingPage
