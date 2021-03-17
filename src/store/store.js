import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from './reducers';

const store = createStore(
  calendarReducer,
  applyMiddleware(thunk),
);

export default store;
