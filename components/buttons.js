import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.babyBlue};
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Silka-Bold', sans-serif;
  font-weight: 700;
  color: white;
  border: 1px solid ${props => props.theme.colors.lightGray};
  ${media.small`
    border-radius: 25px;
    font-size: 18px;
    width: 250px;
    padding: 13px 18px;
  `}
  ${media.medium`
    border-radius: 25px;
    font-size: 30px;
    width: 450px;
  `}
`

export const HiddenButton = styled(PrimaryButton)`
  background-color: ${props => (props.show ? props.theme.colors.babyBlue : '#524b8a')};
  border: ${props => (props.show ? `1px solid ${props.theme.colors.lightGray}` : 'none')};
  font-family: ${props => (props.show ? 'Silka-Bold' : 'Silka-Regular')};
`
