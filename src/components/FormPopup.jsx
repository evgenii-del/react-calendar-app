import React, { useState, useEffect, useContext } from 'react';
import Context from '../context';

const VALID_LENGTH = 3;

const FormPopup = React.memo(() => {
  const {
    server,
    calendarData,
    isFormPopupOpen,
    setIsFormPopupOpen,
    setIsOverlayOpen,
    fetchCalendarData,
    setIsErrorPopupOpen,
  } = useContext(Context);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(true);
  const [time, setTime] = useState('10');
  const [day, setDay] = useState('Monday');
  const [dateError, setDateError] = useState(true);
  const [color, setColor] = useState('yellow');

  const handleCloseFormPopup = () => {
    setIsFormPopupOpen(false);
    setIsOverlayOpen(false);
    setIsErrorPopupOpen(false);
  };

  const handleShowErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleChangeTitle = ({ target }) => {
    const validLength = target.value.length <= VALID_LENGTH;
    setTitleError(validLength);
    setTitle(target.value);
  };

  const handleChangeParticipants = ({ target }) => {
    const values = Array.from(target.selectedOptions, (option) => option.value);
    setParticipantsError(!values.length);
    setParticipants(values);
  };

  const dateValidation = (date) => {
    const isReservedDate = calendarData.filter((event) => event.data.date === date);
    setDateError(!!isReservedDate.length);
  };

  const handleChangeTime = ({ target }) => {
    const date = `${target.value}-${day}`;
    dateValidation(date);
    setTime(target.value);
  };

  const handleChangeDay = ({ target }) => {
    const date = `${time}-${target.value}`;
    dateValidation(date);
    setDay(target.value);
  };

  const handleChangeColor = ({ target }) => {
    setColor(target.value);
  };

  const handleResetForm = () => {
    setTitle('');
    setParticipants([]);
    setTime('10');
    setDay('Monday');
    setColor('yellow');

    setTitleError(true);
    setParticipantsError(true);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (titleError || participantsError || dateError) {
      handleShowErrorPopup();
    } else {
      const newEvent = {
        date: `${time}-${day}`,
        title,
        participants,
        color,
      };

      const data = JSON.stringify({ data: JSON.stringify(newEvent) });
      server.createEvent(data).then(() => {
        handleCloseFormPopup();
        fetchCalendarData();
        handleResetForm();
      });
    }
  };

  useEffect(() => {
    const date = `${time}-${day}`;
    dateValidation(date);
  }, [calendarData]);

  return (
    <form className={`popup ${isFormPopupOpen ? 'popup_active' : undefined}`} onSubmit={handleSubmitForm}>
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
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="yellow"
              type="radio"
              name="color"
              checked={color === 'yellow'}
              onChange={handleChangeColor}
            />
            <span className="check__box yellow" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="green"
              type="radio"
              name="color"
              checked={color === 'green'}
              onChange={handleChangeColor}
            />
            <span className="check__box green" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="red"
              type="radio"
              name="color"
              checked={color === 'red'}
              onChange={handleChangeColor}
            />
            <span className="check__box red" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="khaki"
              type="radio"
              name="color"
              checked={color === 'khaki'}
              onChange={handleChangeColor}
            />
            <span className="check__box khaki" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="violet"
              type="radio"
              name="color"
              checked={color === 'violet'}
              onChange={handleChangeColor}
            />
            <span className="check__box violet" />
          </label>
        </li>
        <li className="popup__colors-item">
          <label className="check option">
            <input
              className="check__input visually-hidden"
              value="blue"
              type="radio"
              name="color"
              checked={color === 'blue'}
              onChange={handleChangeColor}
            />
            <span className="check__box blue" />
          </label>
        </li>
      </ul>
      <button className="popup__btn" type="submit">Create</button>
    </form>
  );
});

export default FormPopup;
