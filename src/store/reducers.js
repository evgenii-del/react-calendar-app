import { SET_CALENDAR_DATA, SET_IS_ADMIN } from './actions';

const initialState = {
  calendarData: [],
  isAdmin: false,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CALENDAR_DATA:
      return {
        ...state,
        calendarData: action.payload,
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
