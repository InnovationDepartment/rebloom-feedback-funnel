import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Link from 'next/link'
import styled from 'styled-components'

import { media } from '../utils/style-utils'
import Head from '../static/components/Head'
import Spinner from '../static/components/Spinner'
import Container from '../static/components/Container'
import TermsAndConditions from '../static/components/TandC'
import { PrimaryButton } from '../static/components/buttons'
import { TextInput } from '../static/components/inputs'
import { H2, P, ErrorP } from '../static/components/text'

import { clearErrors, createNewEntry } from '../redux/actions/entries'

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
  flex-direction: column;
  align-items: center;
`

const StyledErrorP = styled(P)`
  font-size: 12px;
  margin: 6px 0 0 0;
  height: 16px;
  font-style: normal;
`

class SignUp extends Component {
  componentWillUnmount() {
    this.props.clearErrors()
  }

  render() {
    const { loading, entry, error } = this.props
    if (loading) return <Spinner />

    return (
      <Fragment>
        <Head title="reBloom - Bonus Offer" />
        <Container>
          <TextContainer>
            <StyledH2>
              We want to hear from you! Tell us about your experience for a free
              7-pack.
            </StyledH2>
            <Formik
              initialValues={{
                first_name: entry.first_name || '',
                last_name: entry.last_name || '',
                email: entry.email || '',
              }}
              validate={values => {
                const { first_name, last_name, email } = values
                let errors = {}
                if (!first_name) errors.first_name = 'Required field'
                if (!last_name) errors.last_name = 'Required field'
                if (!email.includes('@') || !email.includes('.')) {
                  errors.email = 'Please enter a valid email address'
                }
                if (!email) errors.email = 'Required field'
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.props.createNewEntry(values)
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
                      name="first_name"
                      error={touched.first_name && errors.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      placeholder="First Name"
                    />
                    <StyledErrorP>
                      {(errors.first_name &&
                        touched.first_name &&
                        errors.first_name) ||
                        ' '}
                    </StyledErrorP>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      name="last_name"
                      error={touched.last_name && errors.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      placeholder="Last Name"
                    />
                    <StyledErrorP>
                      {(errors.last_name &&
                        touched.last_name &&
                        errors.last_name) ||
                        ' '}
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
                    <ErrorP>{(error && error) || ' '}</ErrorP>
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

const mapState = ({ entries }) => ({
  loading: entries.loading,
  entry: entries.entry,
  error: entries.error,
})

const mapDispatch = {
  clearErrors,
  createNewEntry,
}

export default connect(
  mapState,
  mapDispatch
)(SignUp)
