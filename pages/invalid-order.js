import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { media } from '../static/utils/style-utils'
import { PrimaryButton } from '../components/buttons'
import { H1, H2, H4, P } from '../components/text'
import { Container } from '../components/container'
import Head from '../components/head'

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-top: 37px;
  position: absolute;
  top: 10px;
`

const StyledH2 = styled(H2)`
  font-weight: 400; 
  margin-bottom: 30px;
`


const StyledH4 = styled(H4)`
  font-style: normal;
  margin-top: 20px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100%;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const TermsLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  font-size: 22px;
  margin-top: 62px;
`

const TermsLinks = styled(P)`
  text-decoration: none !important;
  color: #fff;
  margin: 0;
  cursor: pointer;
`

class Error extends Component {
  render() {
    return (
      <Fragment>
        <Head title="reBloom" />
        <Container>
          <TextContainer>
            <LogoImage src="/static/images/logo-white.png" />
            <H1>Oops!</H1>
            <StyledH2>
              Unfortunately, you don’t qualify for this offer. In the meantime,
              get 25% off your next reBloom order.{' '}
            </StyledH2>
            <ButtonContainer>
              <PrimaryButton>GET 25% OFF</PrimaryButton>
            </ButtonContainer>
            <StyledH4>
              If you think this was an error, please write to our support team
              at help@rebloom.com and we’ll be sure to take care of you.{' '}
            </StyledH4>
            <TermsLinksContainer>
              <Link href="/terms-and-conditions">
                <TermsLinks>Terms and Conditions </TermsLinks>
              </Link>
              {'  '}|{'  '}
              <Link href="/privacy-policy">
                <TermsLinks>Privacy Policy </TermsLinks>
              </Link>
            </TermsLinksContainer>
          </TextContainer>
        </Container>
      </Fragment>
    )
  }
}

export default Error
