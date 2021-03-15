import React, { useContext } from 'react';

import Context from '../context';

const ConfirmationPopup = React.memo(() => {
  const {
    server,
    isConfirmPopupOpen,
    setIsConfirmPopupOpen,
    confirmTitle,
    selectedEventId,
    setIsOverlayOpen,
    fetchCalendarData,
  } = useContext(Context);

  const handleClosePopup = () => {
    setIsConfirmPopupOpen(false);
    setIsOverlayOpen(false);
  };

  const handleDeleteEvent = () => {
    server.removeEvent(selectedEventId).then(() => {
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
