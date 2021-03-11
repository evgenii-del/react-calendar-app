import React from 'react';

function ConfirmationPopup() {
  return (
    <div className="popup popup_confirmation js-popup_confirmation">
      <button className="popup__close js-close-popup" type="button" aria-label="Close popup" />
      <p className="popup__text" />
      <button className="popup__btn js-popup__btn" type="button">Yes</button>
    </div>
  );
}

export default ConfirmationPopup;
