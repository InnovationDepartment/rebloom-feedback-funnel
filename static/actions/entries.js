import axios from 'axios'
import Router from 'next/router'

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })

export const createNewEntry = customerInfo => dispatch => {
  return dispatch({
    type: 'CREATE_ENTRY',
    payload: axios.post('/api/entry/new-entry', customerInfo),
  })
  .then(() => Router.push({pathname: '/'}))
  .catch(err => {
    // TODO: IS THERE A BETTER WAY TO DO THIS?????
    const errorMessage = err.response.data.message
  })
}
