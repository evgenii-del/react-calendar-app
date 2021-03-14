import React, { useState, useCallback } from 'react';
import axios from 'axios';

import {
  ConfirmationPopup,
  ErrorPopup,
  FormPopup,
  LoginPopup,
  Main,
} from './components';
import Context from './context';

function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

  const [calendarData, setCalendarData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchCalendarData = useCallback(() => {
    axios.get('http://158.101.166.74:8080/api/data/evgenii_khasanov/events').then((response) => {
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
    <Context.Provider value={{ isAdmin, setIsAdmin }}>
      <div className="App">
        <div className="wrapper">
          <Main
            calendarData={calendarData}
            setIsFormPopupOpen={setIsFormPopupOpen}
            setIsOverlayOpen={setIsOverlayOpen}
            setIsConfirmPopupOpen={setIsConfirmPopupOpen}
            setConfirmTitle={setConfirmTitle}
            setSelectedEventId={setSelectedEventId}
            fetchCalendarData={fetchCalendarData}
          />
        </div>
        <ErrorPopup isErrorPopupOpen={isErrorPopupOpen} />
        <FormPopup
          calendarData={calendarData}
          isFormPopupOpen={isFormPopupOpen}
          setIsFormPopupOpen={setIsFormPopupOpen}
          setIsOverlayOpen={setIsOverlayOpen}
          fetchCalendarData={fetchCalendarData}
          setIsErrorPopupOpen={setIsErrorPopupOpen}
        />
        <ConfirmationPopup
          calendarData={calendarData}
          isConfirmPopupOpen={isConfirmPopupOpen}
          setIsConfirmPopupOpen={setIsConfirmPopupOpen}
          confirmTitle={confirmTitle}
          selectedEventId={selectedEventId}
          setIsOverlayOpen={setIsOverlayOpen}
          fetchCalendarData={fetchCalendarData}
        />
        <LoginPopup setIsOverlayOpen={setIsOverlayOpen} />
        <div className={`overlay ${isOverlayOpen ? 'overlay_active' : undefined}`} onClick={isAdmin ? overlayClick : undefined} aria-hidden="true" />
      </div>
    </Context.Provider>
  );
}

export default App;
