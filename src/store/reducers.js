import {
  GET_CALENDAR_DATA_STARTED,
  GET_CALENDAR_DATA_SUCCESS,
  GET_CALENDAR_DATA_FAILURE,
  SET_IS_ADMIN,
} from './actions';

const initialState = {
  calendar: {
    data: [],
    isLoading: false,
    error: null,
  },
  isAdmin: false,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CALENDAR_DATA_STARTED:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          isLoading: true,
          error: null,
        },
      };
    case GET_CALENDAR_DATA_SUCCESS:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          isLoading: false,
          data: action.payload,
        },
      };
    case GET_CALENDAR_DATA_FAILURE:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          isLoading: false,
          error: null,
        },
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload.error,
      };
    default:
      return state;
  }
};

export default calendarReducer;
