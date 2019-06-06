const initialState = {
  loading: null,
  entry: {},
  error: null,
}


export default function(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ENTRY_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'CREATE_ENTRY_FULFILLED':
      return {
        ...state,
        loading: false,
        entry: action.payload.data,
        error: null,
      }

    case 'CREATE_ENTRY_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.message || action.payload.response.data,
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
