import React, { Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { media } from '../src/utils/style-utils'

import Head from '../src/components/head'
import { Container } from '../src/components/container'
import { PrimaryButton } from '../src/components/buttons'
import { H1, H3, P } from '../src/components/text'
import { TermsAndConditions } from '../src/components/TandC'

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

const LandingPage = () => (
  <Fragment>
    <Head title="reBloom" />
    <Container>
      <BottleImage src="/src/assets/images/bottle.png" />
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
          <TermsAndConditions />
        </div>
      </TextContainer>
    </Container>
  </Fragment>
)

export default LandingPage
