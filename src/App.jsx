import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  ConfirmationPopup,
  ErrorPopup,
  FormPopup,
  LoginPopup,
  Main,
} from './components';
import Context from './context';
import { Server } from './utils';

const App = () => {
  const user = useSelector((state) => state.user);
  const server = new Server('http://158.101.166.74:8080/api/data/', 'evgenii_khasanov', 'events');

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const overlayClick = () => {
    setIsFormPopupOpen(false);
    setIsOverlayOpen(false);
    setIsErrorPopupOpen(false);
    setIsConfirmPopupOpen(false);
  };

  return (
    <Context.Provider value={{
      server,
      isFormPopupOpen,
      setIsFormPopupOpen,
      setIsOverlayOpen,
      isConfirmPopupOpen,
      setIsConfirmPopupOpen,
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
        <LoginPopup />
        <div
          className={`overlay ${isOverlayOpen ? 'overlay_active' : undefined}`}
          onClick={user.isAdmin ? overlayClick : undefined}
          aria-hidden="true"
        />
      </div>
    </Context.Provider>
  );
};

export default App;
