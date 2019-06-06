import axios from 'axios'
import Router from 'next/router'

const errorViews = ['existing-entry']

const dispatchErrorView = errorType => {
  Router.push({
    pathname: `/error`,
    query: { type: errorType }, // Error-type becomes query string
  })
}

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS',
})

export const createNewEntry = customerInfo => dispatch => {
  return dispatch({
    type: 'CREATE_ENTRY',
    payload: axios.post('/api/entry/new-entry', customerInfo),
  })
    .then(() => Router.push({ pathname: '/order-information' }))
    .catch(err => {
      const errorType = err.response.data.message || 'default'
      if (errorViews.includes(errorType)) {
        dispatchErrorView(errorType)
      }
    })
}

export const updateEntry = (
  entryIdentifiers,
  entryInfo,
  destination
) => dispatch => {
  return dispatch({
    type: 'UPDATE_ENTRY',
    payload: axios.post('/api/entry/update-entry', {
      entryIdentifiers,
      entryInfo,
    }),
  })
    .then(() => Router.push({ pathname: `/${destination}` }))
    .catch(err => {
      const errorType = err.response.data.message || 'default'
      if (errorViews.includes(errorType)) {
        dispatchErrorView(errorType)
      }
    })
}
