import React from 'react';

function TimeList() {
  return (
    <ol className="app__times times">
      <li className="times__item">
        N
        <span className="times__title">ame</span>
      </li>
      <li className="times__item">
        10
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        11
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        12
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        13
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        14
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        15
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        16
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        17
        <span className="times__minute">:00</span>
      </li>
      <li className="times__item">
        18
        <span className="times__minute">:00</span>
      </li>
    </ol>
  );
}

export default TimeList;
