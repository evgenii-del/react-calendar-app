import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  ConfirmationPopup,
  ErrorPopup,
  FormPopup,
  LoginPopup,
  Main,
} from './components';
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
    <div className="App">
      <div className="wrapper">
        <Main
          setIsFormPopupOpen={setIsFormPopupOpen}
          setIsOverlayOpen={setIsOverlayOpen}
          setIsConfirmPopupOpen={setIsConfirmPopupOpen}
        />
      </div>
      <ErrorPopup isErrorPopupOpen={isErrorPopupOpen} />
      <FormPopup
        server={server}
        isFormPopupOpen={isFormPopupOpen}
        setIsFormPopupOpen={setIsFormPopupOpen}
        setIsOverlayOpen={setIsOverlayOpen}
        setIsErrorPopupOpen={setIsErrorPopupOpen}
      />
      <ConfirmationPopup
        server={server}
        isConfirmPopupOpen={isConfirmPopupOpen}
        setIsConfirmPopupOpen={setIsConfirmPopupOpen}
        setIsOverlayOpen={setIsOverlayOpen}
      />
      <LoginPopup setIsOverlayOpen={setIsOverlayOpen} />
      <div
        className={`overlay ${isOverlayOpen ? 'overlay_active' : undefined}`}
        onClick={user.isAdmin ? overlayClick : undefined}
        aria-hidden="true"
      />
    </div>
  );
};

export default App;
