import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import { Formik } from 'formik'

import { media } from '../static/utils/style-utils'
import Head from '../static/components/Head'
import Spinner from '../static/components/Spinner'
import { PrimaryButton } from '../static/components/buttons'
import { TextInput } from '../static/components/inputs'
import { H2, H3, H4, P, ErrorP } from '../static/components/text'

import {
  clearErrors,
  updateEntry,
  userRedirect,
} from '../static/actions/entries'

const TopImageBackground = styled.div`
  background-image: url('static/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  position: relative;
  cursor: default;
  height: 750px;
  width: 100%;
`

const GreyBackground = styled.div`
  background-color: #faf9ff;
  width: 100%;
`

const ContentContainer = styled.div`
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 80px;
`

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin-top: 37px;
  position: absolute;
  top: 10px;
`

const StyledH2 = styled(H2)`
  margin-bottom: 50px;
`

const TitleH2 = styled(H2)`
  color: #453b7a;
  padding: 100px 0;
`

const StyledH3 = styled(H3)`
  color: #453b7a;
  text-align: left;
  font-weight: 400;
  margin-bottom: 50px;
`

const StyledH4 = styled(H4)`
  font-style: normal;
  margin-top: 20px;
`

const StyledH4Italic = styled(H4)`
  font-style: italic;
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

const StepImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 80px;
`

const StyledLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

class OrderID extends Component {
  componentDidMount() {
    const { entry, userRedirect } = this.props
    if (!entry || !entry.id) userRedirect('/')
  }

  render() {
    const { loading, entry, error, userRedirect } = this.props

    if (loading) return <Spinner />

    return (
      <Fragment>
        <Head title="reBloom Bonus Offer" />
        <TopImageBackground>
          <ContentContainer>
            <TextContainer>
              <LogoImage src="static/assets/images/logo-white.png" />
              <StyledH2>
                Please find your Amazon Order ID from your reBloom purchase.
              </StyledH2>
              <StyledH4Italic>
                Enter your Order ID with all of the dashes. Need help? See
                below.
              </StyledH4Italic>
              <Formik
                initialValues={{
                  order_id: entry.order_id || '',
                }}
                validate={values => {
                  let errors = {}
                  if (!values.order_id) errors.order_id = 'Required field'
                  return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const {
                    updateEntry,
                    entry: { id, email },
                  } = this.props

                  updateEntry({ id, email }, values, 'usage')
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
                        name="order_id"
                        error={touched.order_id && errors.order_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.order_id}
                        placeholder="###-#######-#######"
                      />
                      <StyledErrorP>
                        {(errors.order_id &&
                          touched.order_id &&
                          errors.order_id) ||
                          ' '}
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
              <StyledH4>
                Not an Amazon customer?{'  '}
                <StyledLink
                  onClick={() => userRedirect('/error', { type: 'invalid' })}
                >
                  Continue here.
                </StyledLink>
              </StyledH4>
            </TextContainer>
          </ContentContainer>
        </TopImageBackground>
        <GreyBackground>
          <ContentContainer>
            <TitleH2>How to find your Order ID:</TitleH2>
            <StyledH3>
              1. Click orders - start with step 2 and remove step 1.
            </StyledH3>
            <StepImage src="static/assets/images/order-id-step-1.png" />
            <StyledH3>
              2. Navigate to the appropriate order, click order details.
            </StyledH3>
            <StepImage src="static/assets/images/order-id-step-2.png" />
            <StyledH3>3. Find the order ID. </StyledH3>
            <StepImage src="static/assets/images/order-id-step-3.png" />
          </ContentContainer>
        </GreyBackground>
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
  updateEntry,
  userRedirect,
}

export default connect(
  mapState,
  mapDispatch
)(OrderID)
