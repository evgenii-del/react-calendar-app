import React from 'react';
import axios from 'axios';

function ConfirmationPopup(props) {
  const {
    confirmPopup, confirmPopupTitle, confirmPopupBtn, overlayRef, fetchCalendarData
  } = props;

  const handleClosePopup = () => {
    confirmPopup.current.classList.remove('popup_active');
    overlayRef.current.classList.remove('overlay_active');
  };

  const handleDeleteEvent = ({ target }) => {
    const id = target.dataset.id;
    axios.delete(`http://158.101.166.74:8080/api/data/evgenii_khasanov/events/${id}`).then(() => {
      handleClosePopup();
      fetchCalendarData();
    });
  };

  return (
    <div className="popup popup_confirmation" ref={confirmPopup}>
      <button className="popup__close" type="button" aria-label="Close popup" onClick={handleClosePopup} />
      <p className="popup__text" ref={confirmPopupTitle} />
      <button className="popup__btn" type="button" ref={confirmPopupBtn} onClick={handleDeleteEvent}>Yes</button>
    </div>
  );
}

export default ConfirmationPopup;
