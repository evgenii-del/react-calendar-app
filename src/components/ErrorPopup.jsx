import React from 'react';

function ErrorPopup() {
  return (
    <div className="popup popup_error js-popup_error">
      <p>The defaultValue time is already taken or you entered too short a title</p>
    </div>
  );
}

export default ErrorPopup;
