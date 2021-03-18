import React from 'react';

const ErrorPopup = (props) => {
  const { isErrorPopupOpen } = props;
  return (
    <div className={`popup popup_error ${isErrorPopupOpen ? 'popup_active' : undefined}`}>
      <p>The defaultValue time is already taken or you entered too short a title</p>
    </div>
  );
};

export default ErrorPopup;
