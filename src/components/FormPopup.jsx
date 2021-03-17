import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCalendarData } from '../store/actions';

const FormPopup = React.memo((props) => {
  const {
    calendar,
    VALID_LENGTH,
    timesArr,
    users,
    daysArr,
    colors,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    server,
    isFormPopupOpen,
    setIsFormPopupOpen,
    setIsOverlayOpen,
    setIsErrorPopupOpen,
  } = props;
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
    const isReservedDate = calendar.data.filter((event) => event.data.date === date);
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
        dispatch(getCalendarData());
        handleResetForm();
      });
    }
  };

  useEffect(() => {
    const date = `${time}-${day}`;
    dateValidation(date);
  }, [calendar.data]);

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
            {users.map((user) => <option className="select__inner-option" value={user.id} key={user.id}>{user.name}</option>)}
          </select>
          <span className="focus" />
        </div>
      </label>
      <label className="popup__label" htmlFor="times">
        <div className="select custom-select-wrapper-form">
          <select className="select__inner" name="times" value={time} onChange={handleChangeTime}>
            {timesArr.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
          <span className="focus" />
        </div>
      </label>
      <label className="popup__label" htmlFor="days">
        <div className="select custom-select-wrapper-form">
          <select className="select__inner" name="days" value={day} onChange={handleChangeDay}>
            {daysArr.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
          <span className="focus" />
        </div>
      </label>
      <ul className="popup__colors">
        {colors.map(({ name, id }) => (
          <li className="popup__colors-item" key={id}>
            <label className="check option">
              <input
                className="check__input visually-hidden"
                value={name}
                type="radio"
                name="color"
                checked={color === name}
                onChange={handleChangeColor}
              />
              <span className={`check__box ${name}`} />
            </label>
          </li>
        ))}
      </ul>
      <button className="popup__btn" type="submit">Create</button>
    </form>
  );
});

export default FormPopup;
