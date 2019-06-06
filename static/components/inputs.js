import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const TextInput = styled.input`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: #453b7a;
  border: 1px solid #979797;

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
