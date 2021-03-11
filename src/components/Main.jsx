import React from 'react';

import TimeList from './TimeList';
import DayList from './DayList';

function Main() {
  return (
    <main className="app">
      <div className="app__header">
        <h1 className="app__header-title">Calendar</h1>
        <div className="app__header-buttons">
          <label htmlFor="filterByMembers">
            <div className="select app__header-select">
              <select className="select__inner js-members" name="filterByMembers">
                <option value="all" defaultValue>All members</option>
                <option value="1">John</option>
                <option value="2">Sam</option>
                <option value="3">Ann</option>
                <option value="4">Thomas</option>
                <option value="5">Eve</option>
              </select>
            </div>
          </label>
          <button className="app__header-button js-open-popup" type="button">
            New event
          </button>
        </div>
      </div>
      <div className="app__body">
        <TimeList />
        <div className="app__content">
          <DayList />
          <div className="calendar js-calendar">
            {
              // eslint-disable-next-line react/no-array-index-key
              Array(45).fill(0).map((_, index) => <div className="calendar__item" key={index} />)
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
