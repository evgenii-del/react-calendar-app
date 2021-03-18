import React from 'react';
import { useSelector } from 'react-redux';

const TimeList = () => {
  const { timesArr } = useSelector((state) => state);
  return (
    <ol className="app__times times">
      <li className="times__item">
        N
        <span className="times__title">ame</span>
      </li>
      {timesArr.map((item) => (
        <li className="times__item" key={item}>
          {item}
          <span className="times__minute">:00</span>
        </li>
      ))}
    </ol>
  );
};

export default TimeList;
