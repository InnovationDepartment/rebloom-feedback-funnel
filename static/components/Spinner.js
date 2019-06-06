import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import Container from './Container'

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const animation = props => 
  css`
    ${loading} ${props.duration}s infinite linear;
  `

const Spin = styled.div`
  animation: ${animation};
  background: ${props => props.color};
  background: ${props =>
    `linear-gradient(to right, ${
      props.color
    } 10%, rgba(255, 255, 255, 0) 42%);`};
  border-radius: 50%;
  font-size: ${props => `${props.size}px`};
  height: 11em;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 11em;
  margin: 11em auto;
  &:before {
    background: ${props => props.color};
    border-radius: 100% 0 0 0;
    content: '';
    height: 50%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
  }
  &:after {
    background: ${props => props.background};
    border-radius: 50%;
    bottom: 0;
    content: '';
    height: 75%;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 75%;
  }
`

const Spinner = props => (
  <Container>
    <Spin {...props} />
  </Container>
)

Spinner.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number,
}

Spinner.defaultProps = {
  background: '#453b7a',
  color: '#fff',
  duration: 1.4,
  size: 10,
}

export default Spinner
