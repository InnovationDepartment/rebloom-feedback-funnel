const initialState = {
  loading: false,
  entry: {},
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ENTRY_PENDING':
    case 'UPDATE_ENTRY_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'CREATE_ENTRY_FULFILLED':
    case 'UPDATE_ENTRY_FULFILLED':
      return {
        ...state,
        loading: false,
        entry: action.payload.data,
        error: null,
      }

    case 'CREATE_ENTRY_REJECTED':
    case 'UPDATE_ENTRY_REJECTED':
      return {
        ...state,
        loading: false,
        error:
          action.payload.response.data.message || action.payload.response.data,
      }

    case 'CLEAR_LOADING':
      return {
        ...state,
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
