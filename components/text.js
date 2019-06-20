import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const H1 = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  margin: 0;
  font-weight: 700;
  text-align: center;
  ${media.small`
    font-size: 28px;
    margin-bottom: 11px;

  `};
  ${media.medium`
    font-size: 64px;
    margin-bottom: 22px;
  `};
`

export const H2 = styled.h2`
  font-family: 'Silka-Medium', sans-serif;
  font-weight: normal;
  color: #fff;
  margin: 0;
  text-align: center;
  ${media.small`
    font-size: 20px;
    margin-bottom: 11px;
  `};
  ${media.medium`
    font-size: 48px;
    margin-bottom: 22px;
  `};
`

export const H3 = styled.h3`
  font-family: 'Silka-Regular', sans-serif;
  font-weight: normal;
  color: #fff;
  font-size: 36px;
  margin: 0;
  text-align: center;
  ${media.small`
    font-size: 16px;
  `};
  ${media.medium`
    font-size: 36px;
  `};
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
  padding: 0 15px;
  margin: 0;
  ${media.small`
    font-size: 12px;
  `};
  ${media.medium`
    font-size: 18px;
  `};
`

export const ErrorP = styled.h5`
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.colors.errorRed};
  margin: 0;
  text-align: center;
  ${media.small`
   font-size: 10px;
  `};
  ${media.medium`
   font-size: 12px;
  `};
`
