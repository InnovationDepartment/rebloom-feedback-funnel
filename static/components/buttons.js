import styled from 'styled-components'
import { media } from '../../utils/style-utils'

export const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.babyBlue};
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: white;
  border: 1px solid ${props => props.theme.colors.lightGray};
  ${media.small`
    border-radius: 25px;
    font-size: 26px;
    width: 225px;
    padding: 12px 13px;
    margin: 20px 0;
  `}
  ${media.large`
    border-radius: 25px;
    font-size: 30px;
    width: 450px;
    margin: 20px 0;
  `}
`
