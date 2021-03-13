import React from 'react';

function ErrorPopup(props) {
  const { errorPopup } = props;

  return (
    <div className="popup popup_error" ref={errorPopup}>
      <p>The defaultValue time is already taken or you entered too short a title</p>
    </div>
  );
}

export default ErrorPopup;
