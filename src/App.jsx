import React, { useRef, useState } from 'react';
import axios from "axios"

import Main from './components/Main';
import ErrorPopup from './components/ErrorPopup';
import FormPopup from './components/FormPopup';
import ConfirmationPopup from './components/ConfirmationPopup';
import LoginPopup from './components/LoginPopup';

function App() {
  const overlayRef = useRef();
  const formPopup = useRef();
  const confirmPopup = useRef();
  const confirmPopupTitle = useRef();
  const confirmPopupBtn = useRef();
  const [calendarData, setCalendarData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  // const [selectedDate, setSelectedDate] = useState('');

  const fetchCalendarData = () => {
    axios.get('http://158.101.166.74:8080/api/data/evgenii_khasanov/events').then((response) => {
      const parsedData = response.data && response.data.map((item) => ({ id: item.id, data: JSON.parse(item.data) }));
      setCalendarData(parsedData);
    });
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Main
          calendarData={calendarData}
          isAdmin={isAdmin}
          formPopup={formPopup}
          overlayRef={overlayRef}
          confirmPopup={confirmPopup}
          confirmPopupTitle={confirmPopupTitle}
          confirmPopupBtn={confirmPopupBtn}
          fetchCalendarData={fetchCalendarData}
        />
      </div>
      <ErrorPopup />
      <FormPopup formPopup={formPopup} overlayRef={overlayRef} fetchCalendarData={fetchCalendarData} />
      <ConfirmationPopup
        calendarData={calendarData}
        confirmPopup={confirmPopup}
        confirmPopupTitle={confirmPopupTitle}
        confirmPopupBtn={confirmPopupBtn}
        overlayRef={overlayRef}
        fetchCalendarData={fetchCalendarData} />
      <LoginPopup overlayRef={overlayRef} setIsAdmin={setIsAdmin} />
      <div className="overlay" ref={overlayRef} />
    </div>
  );
}

export default App;
