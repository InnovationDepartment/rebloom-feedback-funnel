const initialState = {
  loading: false,
  entry: {},
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ENTRY_PENDING':
    case 'UPDATE_ENTRY_PENDING':
    case 'GENERATE_BONUS_ORDER_PENDING':
    case 'LOOKUP_AMAZON_ORDER_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'CREATE_ENTRY_FULFILLED':
    case 'UPDATE_ENTRY_FULFILLED':
    case 'GENERATE_BONUS_ORDER_FULFILLED':
    case 'LOOKUP_AMAZON_ORDER_FULFILLED':
      return {
        ...state,
        entry: action.payload.data,
      }

    case 'CREATE_ENTRY_REJECTED':
    case 'UPDATE_ENTRY_REJECTED':
    case 'GENERATE_BONUS_ORDER_REJECTED':
    case 'LOOKUP_AMAZON_ORDER_REJECTED':
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
