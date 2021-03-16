import React, { useState, useCallback } from 'react';

import {
  ConfirmationPopup,
  ErrorPopup,
  FormPopup,
  LoginPopup,
  Main,
} from './components';
import Context from './context';
import Server from './utils/server';

const App = () => {
  const server = new Server('http://158.101.166.74:8080/api/data/', 'evgenii_khasanov', 'events');
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

  const [calendarData, setCalendarData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchCalendarData = useCallback(() => {
    server.fetchEvents().then((response) => {
      const { data } = response;
      const parsedData = data && data.map((item) => ({ id: item.id, data: JSON.parse(item.data) }));
      setCalendarData(parsedData);
    });
  }, []);

  const overlayClick = () => {
    setIsFormPopupOpen(false);
    setIsOverlayOpen(false);
    setIsErrorPopupOpen(false);
    setIsConfirmPopupOpen(false);
  };

  return (
    <Context.Provider value={{
      server,
      isAdmin,
      setIsAdmin,
      calendarData,
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
      fetchCalendarData,
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
  );
};

export default App;
