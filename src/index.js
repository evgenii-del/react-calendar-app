import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './scss/index.scss';
import App from './App';
import calendarReducer from './store/reducers';

const store = createStore(
  calendarReducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
