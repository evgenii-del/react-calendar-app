import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCalendarData } from '../store/actions';

const ConfirmationPopup = React.memo((props) => {
  const { id, data } = useSelector((state) => state.selectedEvent);
  const dispatch = useDispatch();
  const {
    server,
    isConfirmPopupOpen,
    setIsConfirmPopupOpen,
    setIsOverlayOpen,
  } = props;

  const handleClosePopup = () => {
    setIsConfirmPopupOpen(false);
    setIsOverlayOpen(false);
  };

  const handleDeleteEvent = () => {
    server.removeEvent(id).then(() => {
      handleClosePopup();
      dispatch(getCalendarData());
    });
  };

  return (
    <div className={`popup popup_confirmation ${isConfirmPopupOpen ? 'popup_active' : undefined}`}>
      <button className="popup__close" type="button" aria-label="Close popup" onClick={handleClosePopup} />
      <p className="popup__text">
        Are you sure you want to delete
        &quot;
        {data && data.title}
        &quot;
        event?
      </p>
      <button className="popup__btn" type="button" onClick={handleDeleteEvent}>Yes</button>
    </div>
  );
});

export default ConfirmationPopup;
