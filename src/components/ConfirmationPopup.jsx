import React from 'react';
import axios from 'axios';

const ConfirmationPopup = React.memo((props) => {
  const {
    isConfirmPopupOpen,
    setIsConfirmPopupOpen,
    confirmTitle,
    selectedEventId,
    setIsOverlayOpen,
    fetchCalendarData,
  } = props;

  const handleClosePopup = () => {
    setIsConfirmPopupOpen(false);
    setIsOverlayOpen(false);
  };

  const handleDeleteEvent = () => {
    axios.delete(`http://158.101.166.74:8080/api/data/evgenii_khasanov/events/${selectedEventId}`).then(() => {
      handleClosePopup();
      fetchCalendarData();
    });
  };

  return (
    <div className={`popup popup_confirmation ${isConfirmPopupOpen ? 'popup_active' : undefined}`}>
      <button className="popup__close" type="button" aria-label="Close popup" onClick={handleClosePopup} />
      <p className="popup__text">
        Are you sure you want to delete
        &quot;
        {confirmTitle}
        &quot;
        event?
      </p>
      <button className="popup__btn" type="button" onClick={handleDeleteEvent}>Yes</button>
    </div>
  );
});

export default ConfirmationPopup;
