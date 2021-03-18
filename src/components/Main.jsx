import React, {
  useEffect, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DayList, TimeList } from './index';
import { selectEvent, getCalendarData } from '../store/actions';
import HeaderButtons from './HeaderButtons';

const Main = (props) => {
  const {
    calendar,
    user,
    users,
    timesArr,
    daysArr,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    setIsFormPopupOpen,
    setIsOverlayOpen,
    setIsConfirmPopupOpen,
  } = props;
  const [selectedMember, setSelectedMember] = useState('all');

  const handleOpenPopup = () => {
    setIsFormPopupOpen(true);
    setIsOverlayOpen(true);
  };

  const handleSelectEvent = ({ target }) => {
    if (target.classList.contains('reserved')) {
      const event = calendar.data.find((item) => item.data.date === target.dataset.id);

      dispatch(selectEvent(event));

      setIsConfirmPopupOpen(true);
      setIsOverlayOpen(true);
    }
  };

  const handleChangeMember = ({ target }) => {
    setSelectedMember(target.value);
  };

  const renderEvent = (color, date, fullDate, title) => (
    <div
      className={`calendar__item ${color} ${user.isAdmin ? 'reserved' : ''}`}
      data-id={date}
      key={fullDate}
      onClick={handleSelectEvent}
      aria-hidden="true"
    >
      <p className="calendar__item-text">{title}</p>
    </div>
  );

  const renderEvents = useMemo(() => timesArr.map((time) => daysArr.map((day) => {
    const fullDate = `${time}-${day}`;
    const event = calendar.data
      && calendar.data.find((item) => item.data.date === fullDate);

    if (event) {
      const {
        color, date, title, participants,
      } = event.data;
      const isAllOrSomeoneSelected = selectedMember === 'all' || participants.includes(selectedMember);

      if ((user.isAdmin && isAllOrSomeoneSelected) || participants.includes(`${user.id}`)) {
        return renderEvent(color, date, fullDate, title);
      }
    }
    return <div className="calendar__item" key={fullDate} />;
  })), [calendar.data, selectedMember, user.isAdmin]);

  useEffect(() => {
    dispatch(getCalendarData());
  }, []);

  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        {user.isAdmin && (
        <HeaderButtons
          users={users}
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
