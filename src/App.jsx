import React, { useRef, useState, useCallback } from 'react';
import axios from 'axios';

import Main from './components/Main';
import ErrorPopup from './components/ErrorPopup';
import FormPopup from './components/FormPopup';
import ConfirmationPopup from './components/ConfirmationPopup';
import LoginPopup from './components/LoginPopup';
import Context from './context';

function App() {
  const overlay = useRef();
  const formPopup = useRef();
  const confirmPopup = useRef();
  const confirmPopupTitle = useRef();
  const confirmPopupBtn = useRef();
  const errorPopup = useRef();

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
    formPopup.current.classList.remove('popup_active');
    overlay.current.classList.remove('overlay_active');
    errorPopup.current.classList.remove('popup_active');
    confirmPopup.current.classList.remove('popup_active');
  };

  return (
    <Context.Provider value={{ isAdmin, setIsAdmin }}>
      <div className="App">
        <div className="wrapper">
          <Main
            calendarData={calendarData}
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
          calendarData={calendarData}
          formPopup={formPopup}
          overlayRef={overlay}
          fetchCalendarData={fetchCalendarData}
          errorPopup={errorPopup}
        />
        <ConfirmationPopup
          calendarData={calendarData}
          confirmPopup={confirmPopup}
          confirmPopupTitle={confirmPopupTitle}
          confirmPopupBtn={confirmPopupBtn}
          overlayRef={overlay}
          fetchCalendarData={fetchCalendarData}
        />
        <LoginPopup overlayRef={overlay} />
        <div className="overlay overlay_active" ref={overlay} onClick={isAdmin ? overlayClick : undefined} aria-hidden="true" />
      </div>
    </Context.Provider>
  );
}

export default App;
