import styled from 'styled-components'
import { media } from '../utils/style-utils'

export const PrimaryButton = styled.button`
  background-color: #5fd0ff;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #fff;
  border: 1px solid #979797;
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
    margin: 40px 0;
  `}
`
