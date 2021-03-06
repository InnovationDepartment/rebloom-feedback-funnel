import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { media } from '../utils/style-utils'
import Spinner from '../components/Spinner'
import Head from '../components/Head'
import Container from '../components/Container'
import TermsAndConditions from '../components/TandC'
import { TextArea } from '../components/inputs'
import { PrimaryButton, HiddenButton } from '../components/buttons'
import { updateEntry, clearErrors } from '../redux/actions/entries'
import { H2, H4 } from '../components/text'

const HeaderH2 = styled(H2)`
  font-weight: 400;
  font-family: 'Silka-Bold';
  margin: 0;
  ${media.small`
    margin-bottom: 0;
  `};
`

const StyledH2 = styled(H2)`
  font-weight: 400;
  font-family: 'Lato';
  ${media.small`
    margin-bottom: 30px;
  `};
  ${media.medium`
    margin-bottom: 40px;
  `};
`

const StyledH4 = styled(H4)`
  font-style: normal;
  ${media.small`
    margin-bottom: 30px;
  `}
  ${media.medium`
    font-size: 32px;
    margin-bottom: 30px;
  `};
`
const CopyH4 = styled(StyledH4)`
  ${media.small`
    margin-bottom: 0;
  `}
  ${media.medium`
    margin-bottom: 0;
  `};
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100% !important;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${media.small`
    margin: 8px;
  `}
  ${media.medium`
    margin-top: 50px;
  `};
`

const StyledLink = styled.a`
  color: #fff;
  margin: 0;
  cursor: pointer;
  margin: 0 6px;
  text-decoration: none;
`

const A = styled.a`
  text-decoration: none;
  cursor: pointer;
`

const UnderlinedLink = styled(StyledLink)`
  text-decoration: underline;
`

const StyledHiddenButton = styled(HiddenButton)`
  ${media.small`
    margin-top: 10px;
  `}
  ${media.medium`
    margin-top: 57px;
  `};
`

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
`

const CommentDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
  color: ${props => props.theme.colors.purple};
  font-family: 'Lato';
  ${media.small`
    width: 100%;
    font-size: 14px;
    margin: 10px 0 6px 0;
  `};
  ${media.medium`
    width: 100%;
    font-size: 24px;
    margin: 10px 0 6px 0;
  `};
`

class LeaveFeedback extends PureComponent {
  state = {
    clicked_amazon_link: false,
  }
  componentWillUnmount() {
    this.props.clearErrors()
  }
  submit = () => {
    const { clicked_amazon_link } = this.state
    const {
      updateEntry,
      entry: { id, email },
    } = this.props
    const entryIdentifiers = { id, email }
    const updatedEntryData = { clicked_amazon_link }

    updateEntry(entryIdentifiers, updatedEntryData, 'address-confirmation')
  }
  render() {
    const { loading, comment } = this.props

    if (loading) return <Spinner />
    return (
      <div>
        <Head title="reBloom" />
        <Container>
          <TextContainer>
            <HeaderH2>Happy customers, happy reBloom team!</HeaderH2>
            <StyledH2>It's customers like you that help us grow our business</StyledH2>
            <FeedbackContainer>
              <StyledH4>
                We’d love if you could post your feedback on Amazon to share with potential new
                customers!
              </StyledH4>
              <CopyH4>To share your review, copy and paste your feedback below.</CopyH4>
              <CommentDiv>
                <p>{comment}</p>
              </CommentDiv>
              <ButtonContainer>
                <A
                  href="https://www.amazon.com/review/review-your-purchases"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PrimaryButton onClick={() => this.setState({ clicked_amazon_link: true })}>
                    SHARE YOUR FEEDBACK
                  </PrimaryButton>
                </A>
              </ButtonContainer>
              <StyledHiddenButton onClick={this.submit} show={this.state.clicked_amazon_link}>
                NEXT
              </StyledHiddenButton>
            </FeedbackContainer>
            <TermsAndConditions marginTop="50px" marginBottom="40px" />
          </TextContainer>
        </Container>
      </div>
    )
  }
}

const mapState = ({ entries }) => ({
  loading: entries.loading,
  entry: entries.entry,
  comment: entries.entry.comment,
})

const mapDispatch = { updateEntry, clearErrors }

export default connect(
  mapState,
  mapDispatch
)(LeaveFeedback)
