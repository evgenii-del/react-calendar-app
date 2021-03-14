import React, {
  useEffect, useState, useContext, useMemo,
} from 'react';

import { DayList, TimeList } from './index';
import Context from '../context';

const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Main() {
  const {
    isAdmin,
    calendarData,
    setIsFormPopupOpen,
    setIsOverlayOpen,
    setIsConfirmPopupOpen,
    setConfirmTitle,
    setSelectedEventId,
    fetchCalendarData,
  } = useContext(Context);
  const [selectedMember, setSelectedMember] = useState('all');

  const handleOpenPopup = () => {
    setIsFormPopupOpen(true);
    setIsOverlayOpen(true);
  };

  const selectEvent = ({ target }) => {
    if (target.classList.contains('reserved')) {
      const event = calendarData.find((item) => item.data.date === target.dataset.id);

      setConfirmTitle(event.data.title);
      setSelectedEventId(event.id);

      setIsConfirmPopupOpen(true);
      setIsOverlayOpen(true);
    }
  };

  const handleChangeMember = ({ target }) => {
    setSelectedMember(target.value);
  };

  const renderEvents = useMemo(() => timesArr.map((time) => daysArr.map((day) => {
    const fullDate = `${time}-${day}`;
    const event = calendarData
      && calendarData.find((item) => item.data.date === fullDate);

    if (event) {
      const {
        color, date, title, participants,
      } = event.data;

      if (selectedMember === 'all' || participants.includes(selectedMember)) {
        return (
          <div
            className={`calendar__item ${color} ${isAdmin ? 'reserved' : ''}`}
            data-id={date}
            key={fullDate}
            onClick={selectEvent}
            aria-hidden="true"
          >
            <p className="calendar__item-text">{title}</p>
          </div>
        );
      }
    }

    return <div className="calendar__item" key={fullDate} />;
  })), [calendarData, selectedMember, isAdmin]);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        <div className="app__header-buttons">
          <label htmlFor="filterByMembers">
            <div className="select app__header-select">
              <select className="select__inner" name="filterByMembers" value={selectedMember} onChange={handleChangeMember}>
                <option value="all">All members</option>
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
          <div className="calendar">{ renderEvents }</div>
        </div>
      </div>
    </main>
  );
}

export default Main;
