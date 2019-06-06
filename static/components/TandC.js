import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { P } from '../components/text'
import { media } from '../utils/style-utils'

const TermsLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  font-size: 22px;
  margin-top: 50px;
`

const TermsLinks = styled(P)`
  text-decoration: none !important;
  color: #fff;
  margin: 0;
  cursor: pointer;
`

const TermsAndConditions = () => (
  <TermsLinksContainer>
    <Link href="/terms-and-conditions">
      <TermsLinks>Terms and Conditions </TermsLinks>
    </Link>
    {'  '}|{'  '}
    <Link href="/privacy-policy">
      <TermsLinks>Privacy Policy </TermsLinks>
    </Link>
  </TermsLinksContainer>
)

export default TermsAndConditions