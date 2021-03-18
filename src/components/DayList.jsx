import React from 'react';
import { useSelector } from 'react-redux';

const DayList = () => {
  const { daysArr } = useSelector((state) => state);
  return (
    <ol className="app__days days">
      {daysArr.map((item) => {
        const day = item.slice(0, 3);
        return <li className="days__item" key={day}>{day}</li>;
      })}
    </ol>
  );
};

export default DayList;
