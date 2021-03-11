import React from 'react';

function LoginPopup() {
  return (
    <form className="popup js-popup_login popup_active">
      <label htmlFor="loginMembers">
        <div className="select app__header-select">
          <select className="select__inner js-auth-select" name="loginMembers">
            <option value="1" defaultValue>John</option>
            <option value="2">Sam</option>
            <option value="3">Ann</option>
            <option value="4">Thomas</option>
            <option value="5">Eve</option>
          </select>
        </div>
        <button className="popup__btn" type="button">Confirm</button>
      </label>
    </form>
  );
}

export default LoginPopup;
