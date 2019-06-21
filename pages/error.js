import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import styled from 'styled-components'

import { media } from '../utils/style-utils'
import errorMap from '../utils/errorMap'
import Head from '../components/Head'
import Container from '../components/Container'
import TermsAndConditions from '../components/TandC'
import { PrimaryButton } from '../components/buttons'
import { H1, H2, H4 } from '../components/text'

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-top: 37px;
  position: absolute;
  top: 10px;
`

const StyledH2 = styled(H2)`
  font-weight: 400;
  ${media.small`
    margin-bottom: 30px;
  `};
  ${media.medium`
    margin-bottom: 66px;
  `};
`

const StyledH4 = styled(H4)`
  font-style: normal;
  font-family: 'Silka-Regular', sans-serif;
  ${media.small`
    margin-bottom: 30px;
  `}
  ${media.medium`
    margin-bottom: 66px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100% !important;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledLink = styled.a`
  color: #fff;
  margin: 0;
  cursor: pointer;
  margin: 0 6px;
  text-decoration: none;
`

const UnderlinedLink = styled(StyledLink)`
  text-decoration: underline;
`

class Error extends Component {
  render() {
    const { router } = this.props

    const errorKey = (router && router.query && router.query.type) || 'default'
    const { header, subheader, buttonCopy, buttonDest, body1, body2, contactInfo } = errorMap[
      errorKey
    ]

    return (
      <div>
        <Head title="reBloom" />
        <Container>
          <TextContainer>
            <H1>{header}</H1>
            <StyledH2>{subheader}</StyledH2>
            {body1 && <StyledH4>{body1}</StyledH4>}
            {body2 && <StyledH4>{body2}</StyledH4>}
            {buttonCopy && (
              <ButtonContainer>
                <StyledLink href={buttonDest}>
                  <PrimaryButton>{buttonCopy}</PrimaryButton>
                </StyledLink>
              </ButtonContainer>
            )}
            {contactInfo && (
              <StyledH4>
                If you think this was an error, please write to our support team at
                <UnderlinedLink href="mailto:help@rebloom.com">help@rebloom.com</UnderlinedLink>
                and we’ll be sure to take care of you.
              </StyledH4>
            )}
            <TermsAndConditions marginTop="120px" />
          </TextContainer>
        </Container>
      </div>
    )
  }
}

export default withRouter(Error)
