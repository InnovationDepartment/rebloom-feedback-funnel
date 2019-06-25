import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { differenceInDays } from 'date-fns'

import { media } from '../utils/style-utils'
import Head from '../components/Head'
import Spinner from '../components/Spinner'
import Container from '../components/Container'
import TermsAndConditions from '../components/TandC'
import { PrimaryButton } from '../components/buttons'
import { TextArea } from '../components/inputs'
import { H2, H3, P, ErrorP } from '../components/text'

import { clearErrors, updateEntry, userRedirect } from '../redux/actions/entries'

const StyledH2 = styled(H2)`
  ${media.small`
    margin-bottom: 40px;
  `};
  ${media.medium`
    margin-bottom: 50px;
  `};
`

const StyledH3 = styled(H3)`
  ${media.small`
    font-size: 16px;
  `};
  ${media.medium`
    font-size: 30px;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  height: 100%;
`

const ChoicesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  ${media.small`
    margin-bottom: 30px;
  `};
  ${media.medium`
    margin-bottom: 60px;
  `};
`

const SpreadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloudContainer = styled.div`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-image: ${props =>
    props.selected
      ? `url('static/assets/images/cloud-gold.png')`
      : `url('static/assets/images/cloud.png')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
  ${media.small`
    width: 20%;
    padding: 10px 0;
  `};
  ${media.medium`
    width: 15%;
    padding: 40px 0;
  `};
`

const CloudLabel = styled(H3)`
  color: ${props => props.theme.colors.purple};
  font-weight: 400;
  font-family: 'Lato';
`

const StyledP = styled(P)`
  font-size: 24px;
  margin: 0;
`

const CharacterCounter = styled(ErrorP)`
  text-align: left;
  color: ${props => (props.error ? props.theme.colors.errorRed : 'white')};
`

const CharacterCounterError = styled(CharacterCounter)`
  color: ${props => props.theme.colors.errorRed};
`

const CharacterContainer = styled.div`
  ${media.small`
    width: 90%;
  `};
  ${media.medium`
    width: 100%;
  `};
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.small`
    margin-top: 15px;
  `};
  ${media.medium`
    margin-top: 32px;
  `};
`

class UsagePeriod extends Component {
  state = {
    selected: this.props.entry.rating || null,
    comment: '',
    ratingError: null,
  }

  componentDidMount() {
    const { entry, userRedirect } = this.props
    // if (!entry || !entry.id) userRedirect('/')
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  changeRating = rating => {
    this.setState({
      selected: rating,
      ratingError: null,
    })
  }

  handleChange = e => {
    this.setState({
      comment: e.target.value,
    })
  }

  handleSubmit = () => {
    const { selected, comment, commentError } = this.state
    const {
      updateEntry,
      entry: { id, email, purchase_date },
    } = this.props

    if (!selected) this.setState({ ratingError: true })
    if (comment.length < 50) {
      this.setState({ commentError: true })
    } else {
      const entryIdentifiers = { id, email }
      const updatedEntryData = { rating: selected, comment }

      let nextDestination
      if (selected === 5) {
        const daysSincePurchase = differenceInDays(new Date(), purchase_date)
        if (daysSincePurchase < 7) {
          nextDestination = 'address-confirmation'
        } else {
          nextDestination = 'leave-feedback'
        }
      } else if (selected >= 3) {
        nextDestination = 'address-confirmation'
      } else {
        nextDestination = {
          path: 'error',
          query: { type: 'negative-experience' },
        }
      }

      updateEntry(entryIdentifiers, updatedEntryData, nextDestination)
    }
  }

  render() {
    const { loading, entry, error } = this.props
    const { selected, comment, ratingError, commentError } = this.state

    const ratingChoices = [1, 2, 3, 4, 5]
    const requiredChars = 50
    const commentChars =
      entry.comment && !comment
        ? requiredChars - entry.comment.length
        : requiredChars - comment.length

    if (loading) return <Spinner />

    return (
      <Fragment>
        <Head title="reBloom - Bonus Offer" />
        <Container maxWidth="1000px">
          <TextContainer>
            <StyledH2>How would you rate your experience with reBloom?</StyledH2>
            <ChoicesContainer>
              <SpreadContainer>
                {ratingChoices.map(rating => (
                  <CloudContainer
                    key={rating}
                    selected={rating === selected}
                    onClick={() => this.changeRating(rating)}
                  >
                    <CloudLabel>{rating}</CloudLabel>
                  </CloudContainer>
                ))}
              </SpreadContainer>
              <SpreadContainer>
                <StyledP>1 = a nightmare</StyledP>
                {ratingError && <ErrorP>Please provide a rating!</ErrorP>}
                <StyledP>5 = a dream</StyledP>
              </SpreadContainer>
            </ChoicesContainer>
            <StyledH3>
              Can you tell us a bit more about why you bought reBloom and how it worked for you?
            </StyledH3>
            <TextArea
              placeholder="Share your thoughts (and dreams), don’t be shy."
              onChange={this.handleChange}
              error={commentError}
              value={entry.comment && !comment ? entry.comment : comment}
            />
            <CharacterContainer>
              <CharacterCounter>Required Characters: {Math.max(commentChars, 0)}</CharacterCounter>
              {commentError && (
                <CharacterCounterError>{requiredChars} characters minimum</CharacterCounterError>
              )}
            </CharacterContainer>
            <ButtonContainer>
              <ErrorP>{(error && error) || ' '}</ErrorP>
              <PrimaryButton onClick={this.handleSubmit}>NEXT</PrimaryButton>
            </ButtonContainer>
            <TermsAndConditions marginTop="50px" marginBottom="30px" />
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
  updateEntry,
  userRedirect,
}

export default connect(
  mapState,
  mapDispatch
)(UsagePeriod)
