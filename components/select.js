import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { media } from '../utils/style-utils'

const SelectContainer = styled.div`
  width 100%;
  position: relative;
`
const StyledIcon = styled.i`
  color: ${props => props.theme.colors.purple};
  top: 18px;
  right: 8px;
  position: absolute;
  pointer-events: none;
  user-select: none;
  display: inline-block;
`
const SelectDropdown = styled.select`
  width: 100%;
  
  border-radius: 10px;
  border: ${props => `1px solid ${!props.error ? 'orange' : 'red'}`};
  color: #453b7a;
  background-color: white;
  font-family: 'Lato', sans-serif;
  
  padding-left: 12px;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  &:focus {
    border-color: ${props => 'grey'}
    box-shadow: none;
    outline: none;
  }
  ${media.small`
    font-size: 18px;
    line-height: 18px;
    padding: 14px;
    height: 50px;
  `};
  ${media.medium`
    height: 53px;
    font-size: 24px;
    line-height: 24px;
    padding: 12px;
  `};
`

class Select extends PureComponent {
  render() {
    return (
      <SelectContainer>
        <SelectDropdown {...this.props}>{this.props.children}</SelectDropdown>
        <StyledIcon className="fas fa-chevron-down" />
      </SelectContainer>
    )
  }
}

export { Select }
