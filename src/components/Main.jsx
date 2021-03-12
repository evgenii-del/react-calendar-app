import React, { useEffect } from 'react';
import axios from 'axios';

import TimeList from './TimeList';
import DayList from './DayList';

const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Main(props) {
  const {
    calendarData, setCalendarData, isAdmin, formPopup, overlayRef, confirmPopup, confirmPopupTitle, confirmPopupBtn,
  } = props;

  const handleOpenPopup = () => {
    formPopup.current.classList.add('popup_active');
    overlayRef.current.classList.add('overlay_active');
  };

  const selectEvent = ({ target }) => {
    if (target.classList.contains('reserved')) {
      const event = calendarData.find((item) => item.data.date === target.dataset.id);
      confirmPopupTitle.current.innerText = event.data.title;
      confirmPopupBtn.current.dataset.id = target.dataset.id;
      confirmPopup.current.classList.add('popup_active');
      overlayRef.current.classList.add('overlay_active');
    }
  };

  useEffect(() => {
    axios.get('http://158.101.166.74:8080/api/data/evgenii_khasanov/events').then((response) => {
      const parsedData = response.data && response.data.map((item) => ({ id: item.id, data: JSON.parse(item.data) }));
      setCalendarData(parsedData);
    });
  }, []);

  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        <div className="app__header-buttons">
          <label htmlFor="filterByMembers">
            <div className="select app__header-select">
              <select className="select__inner" name="filterByMembers">
                <option value="all" defaultValue>All members</option>
                <option value="1">John</option>
                <option value="2">Sam</option>
                <option value="3">Ann</option>
                <option value="4">Thomas</option>
                <option value="5">Eve</option>
              </select>
            </div>
          </label>
          {isAdmin && <button className="app__header-button" type="button" onClick={handleOpenPopup}>New event</button>}
        </div>
      </div>
      <div className="app__body">
        <TimeList />
        <div className="app__content">
          <DayList />
          <div className="calendar">
            {
              timesArr.map((time) => daysArr.map((day) => {
                const fullDate = `${time}-${day}`;
                const event = calendarData && calendarData.find((item) => item.data.date === fullDate);

                if (event) {
                  const { color, date, title } = event.data;
                  return (
                    <div className={`calendar__item ${color} ${isAdmin ? 'reserved' : ''}`} data-id={date} key={fullDate} onClick={selectEvent}>
                      <p className="calendar__item-text">{title}</p>
                    </div>
                  );
                }

                return <div className="calendar__item" key={fullDate} />;
              }))
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
