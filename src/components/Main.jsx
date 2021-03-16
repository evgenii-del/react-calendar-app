import React, {
  useEffect, useState, useContext, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DayList, TimeList } from './index';
import Context from '../context';
import { getCalendarData } from '../store/actions';
import HeaderButtons from './HeaderButtons';

const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Main = () => {
  const calendarData = useSelector((state) => state.calendar.data);
  const dispatch = useDispatch();
  const {
    isAdmin,
    setIsFormPopupOpen,
    setIsOverlayOpen,
    setIsConfirmPopupOpen,
    setConfirmTitle,
    setSelectedEventId,
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
    dispatch(getCalendarData());
  }, []);

  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        {isAdmin && (
        <HeaderButtons
          selectedMember={selectedMember}
          handleChangeMember={handleChangeMember}
          handleOpenPopup={handleOpenPopup}
        />
        )}
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
};

export default Main;
