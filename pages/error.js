import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { media } from '../src/utils/style-utils'
import { PrimaryButton } from '../src/components/buttons'
import { H1, H2, H4 } from '../src/components/text'
import { Container } from '../src/components/container'
import { TermsAndConditions } from '../src/components/TandC'
import Head from '../src/components/head'

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

const EmailLink = styled.a`
  color: #fff;
  margin: 0;
  cursor: pointer;
  margin: 0 6px;
`

class Error extends Component {
  render() {
    const {
      header = 'Oops!',
      subheader = 'It looks like there was a problem.',
      buttonCopy,
      buttonDest,
      body1 = 'Please try again.',
      body2,
      contactInfo,
    } = this.props

    return (
      <Fragment>
        <Head title="reBloom" />
        <Container>
          <TextContainer>
            <LogoImage src="/src/assets/images/logo-white.png" />
            <H1>{header}</H1>
            <StyledH2>{subheader}</StyledH2>
            {body1 && <StyledH4>{body1}</StyledH4>}
            {body2 && <StyledH4>{body2}</StyledH4>}
            {buttonCopy && (
              <ButtonContainer>
                <PrimaryButton>{buttonCopy}</PrimaryButton>
              </ButtonContainer>
            )}
            {contactInfo && (
              <StyledH4>
                If you think this was an error, please write to our support team
                at
                <EmailLink href="mailto:help@rebloom.com">
                  help@rebloom.com
                </EmailLink>
                and we’ll be sure to take care of you.
              </StyledH4>
            )}
            <TermsAndConditions />
          </TextContainer>
        </Container>
      </Fragment>
    )
  }
}

export default Error
