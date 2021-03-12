import React, { useRef, useState } from 'react';

import Main from './components/Main';
import ErrorPopup from './components/ErrorPopup';
import FormPopup from './components/FormPopup';
import ConfirmationPopup from './components/ConfirmationPopup';
import LoginPopup from './components/LoginPopup';

function App() {
  const overlayRef = useRef();
  const formPopup = useRef();
  const [calendarData, setCalendarData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="App">
      <div className="wrapper">
        <Main
          calendarData={calendarData}
          setCalendarData={setCalendarData}
          isAdmin={isAdmin}
          formPopup={formPopup}
          overlayRef={overlayRef}
        />
      </div>
      <ErrorPopup />
      <FormPopup formPopup={formPopup} overlayRef={overlayRef} />
      <ConfirmationPopup />
      <LoginPopup overlayRef={overlayRef} setIsAdmin={setIsAdmin} />
      <div className="overlay" ref={overlayRef} />
    </div>
  );
}

export default App;
