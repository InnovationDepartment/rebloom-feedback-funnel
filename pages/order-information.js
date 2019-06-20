import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import styled from 'styled-components'
import { Formik } from 'formik'

import { media } from '../utils/style-utils'
import Head from '../components/Head'
import Spinner from '../components/Spinner'
import { PrimaryButton } from '../components/buttons'
import { TextInput, TextInputError } from '../components/inputs'
import { H2, H3, H4, P, ErrorP } from '../components/text'

import { clearErrors, lookupAmazonOrder, userRedirect } from '../redux/actions/entries'

const TopImageBackground = styled.div`
  background-image: url('static/assets/images/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  position: relative;
  cursor: default;
  width: 100%;
  ${media.small`
    height: 100vh;
  `};
  ${media.medium`
    height: 740px;
  `};
`

const LogoImage = styled.img`
  width: auto;
  position: absolute;
  ${media.small`
    height: 32px;
    top: 35px;
  `};
  ${media.medium`
    height: 40px;
    top: 37px;
  `};
`

const GreyBackground = styled.div`
  background-color: #faf9ff;
  width: 100%;
`

const ContentContainer = styled.div`
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
`

const StyledH2 = styled(H2)`
  ${media.small`
    margin-bottom: 30px;
  `};
  ${media.medium`
    margin-bottom: 50px;
  `};
`

const TitleH2 = styled(H2)`
  color: #453b7a;
  padding: 95px 0 110px 0;
`

const StyledH3 = styled(H3)`
  color: #453b7a;
  text-align: left;
  font-weight: 400;
  margin-bottom: 35px;
  font-family: 'Lato';
  font-weight: 700;
`

const StyledH4 = styled(H4)`
  font-style: normal;
`

const StyledH4Italic = styled(H4)`
  font-style: italic;
  ${media.small`
    margin-bottom: 30px;
  `};
  ${media.medium`
    margin-bottom: 50px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.small`
    margin: 25px 0 53px 0;
  `}
  ${media.medium`
    margin: 25px 0 53px 0;
  `}
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
    // if (!entry || !entry.id) userRedirect('/')
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  scrollToInstructions = () => {
    document.querySelector('#how-to-find').scrollIntoView({
      behavior: 'smooth',
    })
  }

  render() {
    const { loading, entry, error, userRedirect, lookupAmazonOrder } = this.props

    if (loading) return <Spinner />

    return (
      <Fragment>
        <Head title="reBloom Bonus Offer" />
        <TopImageBackground>
          <ContentContainer>
            <TextContainer>
              <LogoImage src="static/assets/images/logo-white.png" />
              <StyledH2>Please find your Amazon Order ID from your reBloom purchase.</StyledH2>
              <StyledH4Italic>
                Enter your Order ID with all of the dashes. Need help?{' '}
                <StyledLink onClick={this.scrollToInstructions}>See below</StyledLink>.
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
                    entry: { id, email },
                  } = this.props
                  const entryData = {
                    id,
                    email,
                    order_id: values.order_id,
                  }
                  lookupAmazonOrder(entryData, 'usage')
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
                      <TextInputError>
                        {(errors.order_id && touched.order_id && errors.order_id) || ' '}
                      </TextInputError>
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
                <StyledLink onClick={() => userRedirect('/error', { type: 'invalid' })}>
                  Continue here.
                </StyledLink>
              </StyledH4>
            </TextContainer>
          </ContentContainer>
        </TopImageBackground>
        <GreyBackground>
          <ContentContainer>
            <TitleH2 id="how-to-find">How to find your Order ID:</TitleH2>
            <StyledH3>1. Click orders - start with step 2 and remove step 1.</StyledH3>
            <StepImage src="static/assets/images/order-id-step-1.png" />
            <StyledH3>2. Navigate to the appropriate order, click order details.</StyledH3>
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
  userRedirect,
  lookupAmazonOrder,
}

export default connect(
  mapState,
  mapDispatch
)(OrderID)
