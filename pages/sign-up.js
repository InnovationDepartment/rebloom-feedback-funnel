import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Formik } from 'formik'
import { media } from '../static/utils/style-utils'

import Head from '../static/components/head'
import Container from '../static/components/container'
import TermsAndConditions from '../static/components/TandC'
import { PrimaryButton } from '../static/components/buttons'
import { TextInput } from '../static/components/inputs'
import { H2, P } from '../static/components/text'

import { createNewEntry } from '../static/actions/entries'

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin: 37px 0 53px 0;
  position: absolute;
  top: 10px;
`

const StyledH2 = styled(H2)`
  margin-bottom: 50px;
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

const StyledErrorP = styled(P)`
  font-size: 12px;
  margin: 6px 0 0 0;
  height: 16px;
  font-style: normal;
`

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <Head title="reBloom - Bonus Offer Sign Up" />
        <Container>
          <TextContainer>
            <LogoImage src="static/assets/images/logo-white.png" />
            <StyledH2>
              We want to hear from you! Tell us about your experience for a free 7-pack.
            </StyledH2>
            <Formik
              initialValues={{}}
              validate={values => {
                const { firstName, lastName, email } = values
                let errors = {}
                if (!firstName) errors.firstName = 'Required field'
                if (!lastName) errors.lastName = 'Required field'
                if (!email.includes('@') || !email.includes('.')) {
                  errors.email = 'Please enter a valid email address'
                }
                if (!email) errors.email = 'Required field'
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log('IM SUBMITTING!', values) // TODO: Update
                setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextInput
                      type="text"
                      name="firstName"
                      error={touched.firstName && errors.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      placeholder="First Name"
                    />
                    <StyledErrorP>
                      {(errors.firstName && touched.firstName && errors.firstName) || ' '}
                    </StyledErrorP>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      name="lastName"
                      error={touched.lastName && errors.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      placeholder="Last Name"
                    />
                    <StyledErrorP>
                      {(errors.lastName && touched.lastName && errors.lastName) || ' '}
                    </StyledErrorP>
                  </div>
                  <div>
                    <TextInput
                      type="email"
                      name="email"
                      error={touched.email && errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Email Address"
                    />
                    <StyledErrorP>
                      {(errors.email && touched.email && errors.email) || ' '}
                    </StyledErrorP>
                  </div>
                  <ButtonContainer>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      NEXT
                    </PrimaryButton>
                  </ButtonContainer>
                </form>
              )}
            </Formik>
            <TermsAndConditions />
          </TextContainer>
        </Container>
      </Fragment>
    )
  }
}

export default SignUp
