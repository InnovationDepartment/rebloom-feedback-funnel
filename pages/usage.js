import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { media } from '../utils/style-utils'
import Head from '../static/components/Head'
import Spinner from '../static/components/Spinner'
import Container from '../static/components/Container'
import TermsAndConditions from '../static/components/TandC'
import { PrimaryButton } from '../static/components/buttons'
import { H2, H3, P, ErrorP } from '../static/components/text'

import {
  clearErrors,
  updateEntry,
  userRedirect,
} from '../redux/actions/entries'

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

const ChoicesContainer = styled.div`
  padding: 25px 0 30px 0;
`

const StyledRadio = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${media.small`
    margin-bottom: 10px;
    margin-left: 6px;
  `};
  ${media.large`
    margin-bottom: 18px;
    margin-left: 12px;
  `};
  :last-of-type {
    margin-bottom: 0;
  }
`

const RadioLabel = styled(H3)`
  font-weight: 400;
  padding: 0;
  margin: 2px 0 0 20px;
`

const RadioSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.lightGray};
  background-color: white;
  width: 25px;
  height: 25px;
`

const InnerSelector = styled.div`
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props =>
    props.selected ? props.theme.colors.purple : 'none'};
  width: 15px;
  height: 15px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const choices = [
  'Less than a week ago',
  'More than a week ago',
  'More than two weeks ago',
]

class UsagePeriod extends Component {
  state = {
    selected: 0,
  }

  componentDidMount() {
    const { entry, userRedirect } = this.props
    // if (!entry || !entry.id) userRedirect('/')
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  onChange = selection => {
    this.setState({ selected: selection })
  }

  handleSubmit = () => {
    const { selected } = this.state
    const {
      updateEntry,
      entry: { id, email },
    } = this.props

    const entryIdentifiers = { id, email }
    const updatedEntryData = { usage: choices[selected] }
    updateEntry(entryIdentifiers, updatedEntryData, 'customer-feedback')
  }

  render() {
    const { loading, entry, error } = this.props
    const { selected } = this.state

    if (loading) return <Spinner />

    return (
      <Fragment>
        <Head title="reBloom - Bonus Offer" />
        <Container>
          <TextContainer>
            <StyledH2>How long ago did you buy reBloom?</StyledH2>
            <ChoicesContainer>
              <StyledRadio onClick={() => this.onChange(0)}>
                <RadioSelector>
                  <InnerSelector selected={selected === 0} />
                </RadioSelector>
                <RadioLabel>Less than a week ago</RadioLabel>
              </StyledRadio>
              <StyledRadio onClick={() => this.onChange(1)}>
                <RadioSelector>
                  <InnerSelector selected={selected === 1} />
                </RadioSelector>
                <RadioLabel>More than a week ago</RadioLabel>
              </StyledRadio>
              <StyledRadio onClick={() => this.onChange(2)}>
                <RadioSelector>
                  <InnerSelector selected={selected === 2} />
                </RadioSelector>
                <RadioLabel>More than two weeks ago</RadioLabel>
              </StyledRadio>
            </ChoicesContainer>
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
