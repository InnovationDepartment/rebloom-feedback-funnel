import { combineReducers } from 'redux'
import entryReducer from './entries'

const mainReducer = combineReducers({
  entries: entryReducer,
})

export default mainReducer
