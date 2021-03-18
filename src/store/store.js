import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from './reducers';
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

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(
  calendarReducer,
  initialState,
  enhancer,
);

export default store;
