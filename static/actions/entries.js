import axios from 'axios'
import Router from 'next/router'

const setLoading = () => ({ type: 'SET_LOADING' })
const clearLoading = () => ({ type: 'CLEAR_LOADING' })

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })
const errViews = ['existing-entry', 'invalid']

// Redirect helper function for use on backend
const redirect = (pathname, query = {}) => {
  setLoading() // Because of 'Router.push' delay, manually toggling loading
  Router.push({ pathname, query }).then(() => clearLoading())
}

// Exported redirect function to be dispatched from frontend
export const userRedirect = (pathname, query = {}) => dispatch => {
  redirect(pathname, query)
}

export const createNewEntry = userInfo => dispatch => {
  return dispatch({
    type: 'CREATE_ENTRY',
    payload: axios.post('/api/entry/new-entry', userInfo),
  })
    .then(() => redirect('/order-information'))
    .catch(err => {
      const errType = err.response.data.message || 'default'
      if (errViews.includes(errType)) {
        redirect('/error', { type: errType })
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
    .then(() => redirect(`/${dest}`))
    .catch(err => {
      const errType = err.response.data.message || 'default'
      if (errViews.includes(errType)) {
        redirect('/error', { type: errType })
      }
    })
}
