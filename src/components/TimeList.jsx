import React from 'react';
import { nanoid } from 'nanoid';

const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const TimeList = () => (
  <ol className="app__times times">
    <li className="times__item">
      N
      <span className="times__title">ame</span>
    </li>
    {
      timesArr.map((item) => (
        <li className="times__item" key={nanoid()}>
          {item}
          <span className="times__minute">:00</span>
        </li>
      ))
    }
  </ol>
);

export default TimeList;
