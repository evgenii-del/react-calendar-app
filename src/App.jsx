import React, { useRef, useState } from 'react';
import axios from "axios"

import Main from './components/Main';
import ErrorPopup from './components/ErrorPopup';
import FormPopup from './components/FormPopup';
import ConfirmationPopup from './components/ConfirmationPopup';
import LoginPopup from './components/LoginPopup';

function App() {
  const overlay = useRef();
  const formPopup = useRef();
  const confirmPopup = useRef();
  const confirmPopupTitle = useRef();
  const confirmPopupBtn = useRef();
  const errorPopup = useRef();
  const [calendarData, setCalendarData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  const fetchCalendarData = () => {
    axios.get('http://158.101.166.74:8080/api/data/evgenii_khasanov/events').then((response) => {
      const parsedData = response.data && response.data.map((item) => ({ id: item.id, data: JSON.parse(item.data) }));
      setCalendarData(parsedData);
    });
  };

  const overlayClick = () => {
    formPopup.current.classList.remove('popup_active');
    overlay.current.classList.remove('overlay_active');
    errorPopup.current.classList.remove('popup_active');
    confirmPopup.current.classList.remove('popup_active');
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Main
          calendarData={calendarData}
          isAdmin={isAdmin}
          formPopup={formPopup}
          overlayRef={overlay}
          confirmPopup={confirmPopup}
          confirmPopupTitle={confirmPopupTitle}
          confirmPopupBtn={confirmPopupBtn}
          fetchCalendarData={fetchCalendarData}
        />
      </div>
      <ErrorPopup errorPopup={errorPopup} />
      <FormPopup
        formPopup={formPopup}
        overlayRef={overlay}
        fetchCalendarData={fetchCalendarData}
        errorPopup={errorPopup} />
      <ConfirmationPopup
        calendarData={calendarData}
        confirmPopup={confirmPopup}
        confirmPopupTitle={confirmPopupTitle}
        confirmPopupBtn={confirmPopupBtn}
        overlayRef={overlay}
        fetchCalendarData={fetchCalendarData} />
      <LoginPopup overlayRef={overlay} setIsAdmin={setIsAdmin} />
      <div className="overlay" ref={overlay} onClick={overlayClick} />
    </div>
  );
}

export default App;
