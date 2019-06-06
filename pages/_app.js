import App, { Container } from 'next/app'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import withReduxStore from '../static/store'

const theme = {
  colors: {
    purple: '#453b7a',
    babyBlue: '#5fd0ff',
    lightGray: '#979797'
  },
}

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
