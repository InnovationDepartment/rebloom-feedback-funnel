import axios from 'axios' // TODO: SWAP THIS
import history from 'utils/history'

export const clearErrors = () => ({ type: 'CLEAR_ERRORS' })

export const createNewEntry = customerInfo => dispatch => {
  return dispatch({
    type: 'CREATE_ENTRY',
    payload: axios.post('/api/bonus-offer/new-entry', entryData),
  })
    .then(() => history.push('/')) //TODO: UPDATE
    .catch(err => {
      // TODO: IS THERE A BETTER WAY TO DO THIS?????
      const errorMessage = err.response.data.message
      if (errorRedirect[errorMessage]) {
        return history.push(`/offer/${errorRedirect[errorMessage]}`)
      }
    })
}
