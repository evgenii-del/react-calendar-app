import React, { useState } from 'react';
import axios from 'axios';

function FormPopup(props) {
  const { formPopup, overlayRef } = props;
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState([]);
  const [time, setTime] = useState('10');
  const [day, setDay] = useState('Monday');
  const [color, setColor] = useState('red');

  const handleCloseFormPopup = () => {
    formPopup.current.classList.remove('popup_active');
    overlayRef.current.classList.remove('overlay_active');
  };

  const handleChangeTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleChangeParticipants = ({ target }) => {
    const values = Array.from(target.selectedOptions, (option) => option.value);
    setParticipants(values);
  };

  const handleChangeTime = ({ target }) => {
    setTime(target.value);
  };

  const handleChangeDay = ({ target }) => {
    setDay(target.value);
  };

  const handleChangeColor = ({ target }) => {
    setColor(target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const newEvent = {
      date: `${time}-${day}`,
      title,
      participants,
      color,
    };

    const data = JSON.stringify({ data: JSON.stringify(newEvent) });
    axios.post('http://158.101.166.74:8080/api/data/evgenii_khasanov/events', data);
  };

  return (
    <form className="popup" ref={formPopup} onSubmit={handleSubmitForm}>
      <button className="popup__close" type="button" aria-label="Close popup" onClick={handleCloseFormPopup} />
      <label className="popup__label" htmlFor="title">
        <input
          className="popup__field"
          name="title"
          type="text"
          placeholder="Name of the event"
          value={title}
          onChange={handleChangeTitle}
        />
      </label>
      <label className="popup__label" htmlFor="participants">
        <div className="select select--multiple custom-select-wrapper-form">
          <select
            className="select__inner select-multiple"
            name="participants"
            size="3"
            multiple
            value={participants}
            onChange={handleChangeParticipants}
          >
            <option className="select__inner-option" value="1">John</option>
            <option className="select__inner-option" value="2">Sam</option>
            <option className="select__inner-option" value="3">Ann</option>
            <option className="select__inner-option" value="4">Thomas</option>
            <option className="select__inner-option" value="5">Eve</option>
          </select>
          <span className="focus" />
        </div>
      </label>
      <label className="popup__label" htmlFor="times">
        <div className="select custom-select-wrapper-form">
          <select className="select__inner" name="times" value={time} onChange={handleChangeTime}>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
          </select>
          <span className="focus" />
        </div>
      </label>
      <label className="popup__label" htmlFor="days">
        <div className="select custom-select-wrapper-form">
          <select className="select__inner" name="days" value={day} onChange={handleChangeDay}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <span className="focus" />
        </div>
      </label>
      <ul className="popup__colors">
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="yellow"
              checked={color === 'yellow'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box yellow" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="green"
              checked={color === 'green'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box green" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="red"
              checked={color === 'red'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box red" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="khaki"
              checked={color === 'khaki'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box khaki" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="violet"
              checked={color === 'violet'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box violet" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option" htmlFor="color">
            <input
              className="check__input visually-hidden"
              value="blue"
              checked={color === 'blue'}
              onChange={handleChangeColor}
              type="radio"
              name="color"
            />
            <span className="check__box blue" />
          </label>
        </li>
      </ul>
      <button className="popup__btn" type="submit">Create</button>
    </form>
  );
}

export default FormPopup;
