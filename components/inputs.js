import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const TextInput = styled.input`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${props => props.theme.colors.purple};
  border: 1px solid ${props => props.theme.colors.lightGray};
  ::placeholder {
    color: #a29dbc;
  }
  :focus {
    outline: none;
  }
  ${media.small`
    border-radius: 10px;
    font-size: 18px;
    min-width: 250px;
    padding: 14px;
    width: 100%;
    box-sizing:border-box;
  `}
  ${media.medium`
    font-size: 24px;
    min-width: 452px;
    padding: 12px;
  `}
  :last-of-type {
    margin-bottom: 0;
  }
`

export const TextInputError = styled.p`
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.colors.errorRed};
  margin: 0;
  margin-top: 3px;
  ${media.small`
  font-size: 10px;
  height: 14px;
 `};
  ${media.medium`
  font-size: 12px;
  height: 20px;
 `};
`

export const TextArea = styled.textarea`
  background-color: white;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${props => props.theme.colors.purple};
  border: 2px solid
    ${props => (props.error ? props.theme.colors.errorRed : props.theme.colors.lightGray)};
  border-radius: 10px;
  height: 100px;
  ${media.small`
    width: 90%;
    padding: 10px 10px;
    font-size: 14px;
    margin: 10px 0 6px 0;
  `};
  ${media.medium`
    width: 100%;
    font-size: 24px;
    margin: 10px 0 6px 0;
  `};
`
