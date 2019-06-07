import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const H1 = styled.h1`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #fff;
  font-size: 64px;
  margin-bottom: 22px;
  text-align: center;
`

export const H2 = styled.h2`
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  color: #fff;
  font-size: 48px;
  margin: 0;
  text-align: center;
`


export const H3 = styled.h3`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: 36px;
  margin: 0;
  text-align: center;
`

export const H4 = styled.h4`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: 24px;
  margin: 0;
  text-align: center;
  font-style: italic;
`

export const P = styled.p`
  font-family: 'Lato', sans-serif;
  font-style: italic;
  font-weight: 400;
  color: #fff;
  font-size: 18px;
  margin-bottom: 22px;
  padding: 0 15px;
`


export const ErrorP = styled.h5`
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.colors.errorRed};
  margin: 0;
  text-align: center;
  ${media.small`
   font-size: 12px;
   line-height: 20px;
  `};
  ${media.medium`
   font-size: 16px;
  `};
`