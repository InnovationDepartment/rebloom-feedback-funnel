import axios from 'axios'
import Router from 'next/router'
import errorMap from '../../utils/errorMap'

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })

// Grabs query string names of all errors for which we have a dedicated
// error page to display to user
const errViews = Object.keys(errorMap)

export const userRedirect = (pathname, query = {}) => {
  Router.push({ pathname, query })
}

export const createNewEntry = userInfo => dispatch => {
  return dispatch({
    type: 'CREATE_ENTRY',
    payload: axios.post('/api/entry/new-entry', userInfo),
  })
    .then(() => userRedirect('/order-information'))
    .catch(err => {
      const errType = err.response.data.message
      if (errViews.includes(errType)) {
        userRedirect('/error', { type: errType })
      }
    })
}

export const updateEntry = (entryIdentifiers, entryInfo, dest) => dispatch => {
  return dispatch({
    type: 'UPDATE_ENTRY',
    payload: axios.post('/api/entry/update-entry', {
      entryIdentifiers,
      entryInfo,
    }),
  })
    .then(() => userRedirect(`/${dest}`))
    .catch(err => {
      const errType = err.response.data.message
      if (errViews.includes(errType)) {
        userRedirect('/error', { type: errType })
      }
    })
}
