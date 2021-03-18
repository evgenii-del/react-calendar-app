import {
  GET_CALENDAR_DATA_STARTED,
  GET_CALENDAR_DATA_SUCCESS,
  GET_CALENDAR_DATA_FAILURE,
  SET_USER, SELECT_EVENT,
} from './actions';

const calendarReducer = (state, action) => {
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
          error: action.payload.error,
        },
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
