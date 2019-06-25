import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { P } from '../components/text'
import { media } from '../utils/style-utils'

const TermsLinksContainer = styled(P)`
  margin-top: ${props => (props.marginTop ? props.marginTop : '0')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '0')};
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

const TermsAndConditions = props => (
  <TermsLinksContainer {...props}>
    <Link href="/terms-and-conditions" target="_blank">
      <a target="_blank">
        <TermsLinks>Terms and Conditions </TermsLinks>
      </a>
    </Link>
    <TermsLinks>&nbsp;&nbsp;|&nbsp;&nbsp;</TermsLinks>
    <Link href="/privacy-policy" target="_blank">
      <a target="_blank">
        <TermsLinks>Privacy Policy </TermsLinks>
      </a>
    </Link>
  </TermsLinksContainer>
)

export default TermsAndConditions
