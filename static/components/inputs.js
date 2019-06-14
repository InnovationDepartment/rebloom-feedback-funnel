import styled from 'styled-components'
import { media } from '../../utils/style-utils'

export const TextInput = styled.input`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${props => props.theme.colors.purple};
  border: 1px solid ${props => props.theme.colors.lightGray};
  ${media.small`
    border-radius: 10px;
    font-size: 20px;
    min-width: 250px;
    margin: 12px 0;
  `}
  ${media.large`
    font-size: 24px;
    min-width: 452px;
    height: 53px;
    padding: 0 24px;
  `}
  :last-of-type {
    margin-bottom: 0;
  }
`

export const TextArea = styled.textarea`
  background-color: white;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: ${props => props.theme.colors.purple};
  border: 2px solid
    ${props =>
      props.error ? props.theme.colors.errorRed : props.theme.colors.lightGray};
  border-radius: 10px;
  width: 95%;
  height: 100px;
  margin: 38px 0 6px 0;
  padding: 15px 27px;
`
