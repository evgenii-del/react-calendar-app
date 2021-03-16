import React, { useContext } from 'react';

import Context from '../context';

const DayList = () => {
  const { daysArr } = useContext(Context);
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
