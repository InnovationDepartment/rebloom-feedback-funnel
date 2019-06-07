import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { media } from '../static/utils/style-utils'
import Head from '../static/components/Head'
import Spinner from '../static/components/Spinner'
import Container from '../static/components/Container'
import TermsAndConditions from '../static/components/TandC'
import { PrimaryButton } from '../static/components/buttons'
import { TextArea } from '../static/components/inputs'
import { H2, H3, P, ErrorP } from '../static/components/text'

import {
  clearErrors,
  updateEntry,
  userRedirect,
} from '../static/actions/entries'

const StyledH2 = styled(H2)`
  margin-bottom: 50px;
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
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin-bottom: 60px;
`

const SpreadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloudContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 18%;
  padding: 20px 0;
  margin-bottom: 12px;
  border: 5px solid
    ${props => (props.selected ? props.theme.colors.yellow : 'transparent')};
`

const CloudLabel = styled(H3)`
  color: ${props => props.theme.colors.purple};
  font-weight: 400;
`

const StyledP = styled(P)`
  font-size: 24px;
  margin: 0;
`

const CharacterCounter = styled(ErrorP)`
  text-align: left;
  color: ${props => (props.error ? props.theme.colors.errorRed : 'white')};
`

const CharacterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      entry: { id, email },
    } = this.props

    if (!selected) this.setState({ ratingError: true })
    if (comment.length < 50) this.setState({ commentError: true })

    const entryIdentifiers = { id, email }
    const updatedEntryData = { rating: selected, comment }
    updateEntry(entryIdentifiers, updatedEntryData, '/rating')
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
        <Container>
          <TextContainer>
            <StyledH2>
              How would you rate your experience with reBloom?
            </StyledH2>
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
                <StyledP>1 = nightmare</StyledP>
                {ratingError && <ErrorP>Please provide a rating!</ErrorP>}
                <StyledP>5 = a dream</StyledP>
              </SpreadContainer>
            </ChoicesContainer>
            <H3>
              Can you tell us a bit more about why you bought reBloom and how it
              worked for you?
            </H3>
            <TextArea
              placeholder="Share your thoughts (and dreams), don’t be shy."
              onChange={this.handleChange}
              error={commentError}
              value={entry.comment && !comment ? entry.comment : comment}
            />
            <CharacterContainer>
              {!commentError && (
                <CharacterCounter>
                  Required Characters: {Math.max(commentChars, 0)}
                </CharacterCounter>
              )}
              {commentError && (
                <ErrorP>{requiredChars} characters minimum</ErrorP>
              )}
            </CharacterContainer>
            <ButtonContainer>
              <ErrorP>{(error && error) || ' '}</ErrorP>
              <PrimaryButton onClick={this.handleSubmit}>NEXT</PrimaryButton>
            </ButtonContainer>
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
  updateEntry,
  userRedirect,
}

export default connect(
  mapState,
  mapDispatch
)(UsagePeriod)
