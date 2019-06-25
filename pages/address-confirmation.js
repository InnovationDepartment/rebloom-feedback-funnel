import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import { media } from '../utils/style-utils'
import Head from '../components/Head'
import Container from '../components/Container'
import TermsAndConditions from '../components/TandC'
import { PrimaryButton } from '../components/buttons'
import { TextInput, TextInputError } from '../components/inputs'
import { Select } from '../components/select'
import { H1, H3, P, ErrorP } from '../components/text'
import { stateAbbreviations } from '../utils/address-utils'
import { generateBonusOrder, clearErrors } from '../redux/actions/entries'
import Spinner from '../components/Spinner'

const isNumber = val => /^\d+$/.test(val)

const BottleImage = styled.img.attrs(props => ({
  src: 'static/assets/images/bottle.png',
}))`
  ${media.small`
    display: none;
  `};
  ${media.medium`
    height: 650px;
    margin: 0 10% 0 10%;
    margin-top: 24px;
    display: block;
  `};
`

const Heading = styled(H1)`
  font-family: 'Silka-Regular';
  text-align: left;
`

const SubHeading = styled(H3)`
  ${media.small`
    margin-bottom: 25px;
  `};
`

const TermsText = styled(P)`
  ${media.small`
    margin-bottom: 36px
  `};
  ${media.medium`
    margin-bottom: 22px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  width: 478px;
  flex-direction: column;
  color: #fff;
  height: 100%;
  max-width: 700px;
`

const TermsLinksContainer = styled(P)`
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

const CTAButton = styled(PrimaryButton)`
  ${media.small`
    margin-bottom: 36px
  `};
  ${media.medium`
    margin: 50px 0;
  `};
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`

const SmallTextInput = styled(TextInput)`
  ${media.small`
    width: 100%;
    min-width: 0;
  `}
  ${media.medium`
    width: 100%;
    min-width: 0;
  `}
`

const StateZipDiv = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.small`
    width: 100%;
  `}
  ${media.medium`
    width: 478px;
  `}
`

const StateZipLeft = styled.div`
  width: 50%;
  padding-right: 10px;
`
const StateZipRight = styled.div`
  width: 50%;
  padding-left: 10px;
`

const StyledOption = styled.option`
  font-family: 'HarrietDisplay-Light';
  padding-left: 12px !important;
  color: grey !important;
`

class AddressConfirmation extends PureComponent {
  componentWillUnmount() {
    this.props.clearErrors()
  }
  render() {
    const { entry = {}, error, generateBonusOrder, loading } = this.props
    if (loading) return <Spinner />

    return (
      <>
        <Head title="reBloom Bonus Offer" />
        <Container customPadding="0 20px" alignItems="flex-start">
          <BottleImage />
          <TextContainer>
            <Heading>Address Confirmation</Heading>
            <Formik
              initialValues={{
                first_name: entry.first_name || '',
                last_name: entry.last_name || '',
                address1: entry.address1 || '',
                address2: entry.address2 || '',
                city: entry.city || '',
                state: entry.state || '',
                zip: entry.zip || '',
              }}
              validate={values => {
                const {
                  first_name,
                  last_name,
                  email,
                  address1,
                  address2,
                  city,
                  state,
                  zip,
                } = values
                let errors = {}
                if (!first_name) errors.first_name = 'Required field'
                if (!last_name) errors.last_name = 'Required field'
                if (!address1) errors.address1 = 'Required field'
                if (!city) errors.city = 'Required field'
                if (!state || state === 'Select State') errors.state = 'Required field'
                if (!zip) errors.zip = 'Required field'
                if (zip.length !== 5 || !isNumber(zip)) errors.zip = 'Must be 5 digit zip code'

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                const {
                  entry: { id, email },
                } = this.props

                generateBonusOrder({ id, email }, values)
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
                    <TextInputError>
                      {(errors.first_name && touched.first_name && errors.first_name) || ' '}
                    </TextInputError>
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
                    <TextInputError>
                      {(errors.last_name && touched.last_name && errors.last_name) || ' '}
                    </TextInputError>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      name="address1"
                      error={touched.address1 && errors.address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address1}
                      placeholder="Street Address 1"
                    />
                    <TextInputError>
                      {(errors.address1 && touched.address1 && errors.address1) || ' '}
                    </TextInputError>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      name="address2"
                      error={touched.address2 && errors.address2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address2}
                      placeholder="Street Address 2"
                    />
                    <TextInputError>
                      {(errors.address2 && touched.address2 && errors.address2) || ' '}
                    </TextInputError>
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      name="city"
                      error={touched.city && errors.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      placeholder="City"
                    />
                    <TextInputError>
                      {(errors.city && touched.city && errors.city) || ' '}
                    </TextInputError>
                  </div>
                  <StateZipDiv>
                    <StateZipLeft>
                      <Select
                        name="state"
                        error={touched.address && touched.address.state && errors.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      >
                        {stateAbbreviations.map(data => (
                          <StyledOption key={data.abbreviation} value={data.abbreviation}>
                            {data.abbreviation}
                          </StyledOption>
                        ))}
                      </Select>
                      <TextInputError>
                        {(errors.state && touched.state && errors.state) || ' '}
                      </TextInputError>
                    </StateZipLeft>
                    <StateZipRight>
                      <SmallTextInput
                        type="text"
                        name="zip"
                        error={touched.zip && errors.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip}
                        maxLength="5"
                        placeholder="Zip code"
                      />
                      <TextInputError>
                        {(errors.zip && touched.zip && errors.zip) || ' '}
                      </TextInputError>
                    </StateZipRight>
                  </StateZipDiv>

                  <ButtonContainer>
                    <ErrorP>{(error && error) || ' '}</ErrorP>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      SHIP MY FREE REBLOOM
                    </PrimaryButton>
                  </ButtonContainer>
                </form>
              )}
            </Formik>
            <TermsAndConditions marginTop="50px" marginBottom="30px" />
          </TextContainer>
        </Container>
      </>
    )
  }
}

const mapState = ({ entries }) => ({
  loading: entries.loading,
  entry: entries.entry,
  error: entries.error,
})

const mapDispatch = {
  generateBonusOrder,
  clearErrors,
}

export default connect(
  mapState,
  mapDispatch
)(AddressConfirmation)
