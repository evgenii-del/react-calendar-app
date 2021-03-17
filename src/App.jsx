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
import Server from './utils/server';
import User from './utils/user';
import Admin from './utils/admin';

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

const App = () => {
  const user = useSelector((state) => state.user);
  const server = new Server('http://158.101.166.74:8080/api/data/', 'evgenii_khasanov', 'events');

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

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
      confirmTitle,
      setConfirmTitle,
      selectedEventId,
      setSelectedEventId,
      setIsErrorPopupOpen,
      timesArr,
      daysArr,
      users,
      VALID_LENGTH,
      colors,
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
        <div className={`overlay ${isOverlayOpen ? 'overlay_active' : undefined}`} onClick={user.isAdmin ? overlayClick : undefined} aria-hidden="true" />
      </div>
    </Context.Provider>
  );
};

export default App;
