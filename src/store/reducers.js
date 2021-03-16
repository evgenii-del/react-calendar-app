import {
  GET_CALENDAR_DATA_STARTED,
  GET_CALENDAR_DATA_SUCCESS,
  GET_CALENDAR_DATA_FAILURE,
  SET_USER,
} from './actions';

const initialState = {
  calendar: {
    data: [],
    isLoading: false,
    error: null,
  },
  user: {
    id: 0,
    name: '',
    isAdmin: false,
  },
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
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
