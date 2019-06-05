import React from 'react'
import styled from 'styled-components'
import Head from '../src/components/head'

const ContentContainer = styled.div`
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 80px auto;
`

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin: 37px 0 53px 0;
`

const MainTitle = styled.h1`
  font-family: Lato;
  font-weight: bold;
  color: #453b7a;
  font-size: 64px;
  margin: 0 0 48px 0;
  text-align: center;
`

const Paragraph = styled.p`
  font-family: 'Lato', sans-serif;
  color: #453b7a;
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 14px;
`

const BoldCopy = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  margin-right: 6px;
`


const PrivacyPolicy = () => (
  <div>
    <Head title="reBloom - Privacy Policy" />
    <ContentContainer>
      <LogoImage src="/src/assets/images/logo-purple.png" alt="logo" />
      <MainTitle>Privacy Policy</MainTitle>
      <Paragraph>
        <BoldCopy>Placeholder.</BoldCopy> Placeholder
      </Paragraph>
    </ContentContainer>
  </div>
)

export default PrivacyPolicy
