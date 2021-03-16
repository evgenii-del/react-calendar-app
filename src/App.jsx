import React, { useState } from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import {
  ConfirmationPopup,
  ErrorPopup,
  FormPopup,
  LoginPopup,
  Main,
} from './components';
import Context from './context';
import Server from './utils/server';
import calendarReducer from './store/reducers';

const store = createStore(
  calendarReducer,
  applyMiddleware(thunk),
);

const App = () => {
  const server = new Server('http://158.101.166.74:8080/api/data/', 'evgenii_khasanov', 'events');
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  const overlayClick = () => {
    setIsFormPopupOpen(false);
    setIsOverlayOpen(false);
    setIsErrorPopupOpen(false);
    setIsConfirmPopupOpen(false);
  };

  return (
    <Provider store={store}>
      <Context.Provider value={{
        server,
        isAdmin,
        setIsAdmin,
        isFormPopupOpen,
        setIsFormPopupOpen,
        setIsOverlayOpen,
        isConfirmPopupOpen,
        setIsConfirmPopupOpen,
        confirmTitle,
        setConfirmTitle,
        selectedEventId,
        setSelectedEventId,
        setIsErrorPopupOpen,
      }}
      >
        <div className="App">
          <div className="wrapper">
            <Main />
          </div>
          <ErrorPopup isErrorPopupOpen={isErrorPopupOpen} />
          <FormPopup />
          <ConfirmationPopup />
          <LoginPopup setIsOverlayOpen={setIsOverlayOpen} />
          <div className={`overlay ${isOverlayOpen ? 'overlay_active' : undefined}`} onClick={isAdmin ? overlayClick : undefined} aria-hidden="true" />
        </div>
      </Context.Provider>
    </Provider>
  );
};

export default App;
