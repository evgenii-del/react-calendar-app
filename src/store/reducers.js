import {
  GET_CALENDAR_DATA_STARTED,
  GET_CALENDAR_DATA_SUCCESS,
  GET_CALENDAR_DATA_FAILURE,
  SET_USER, SELECT_EVENT,
} from './actions';
import { Admin, User } from '../utils';

const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const userNames = ['John', 'Sam', 'Ann', 'Thomas'];
const users = [
  ...userNames.map((name, index) => new User(index + 1, name)),
  new Admin(5, 'Eve (Admin)'),
];
const VALID_LENGTH = 3;
const colors = [
  { name: 'yellow', id: 1 },
  { name: 'green', id: 2 },
  { name: 'red', id: 3 },
  { name: 'khaki', id: 4 },
  { name: 'violet', id: 5 },
  { name: 'blue', id: 6 },
];

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
  selectedEvent: {},
  timesArr,
  daysArr,
  colors,
  users,
  VALID_LENGTH,
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
