import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../store/actions';
import Context from '../context';

const LoginPopup = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { setIsOverlayOpen } = useContext(Context);
  const [selectedUser, setSelectedUser] = useState('1');
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true);

  const handleChangeUser = ({ target }) => {
    setSelectedUser(target.value);
  };

  const handleOnClick = () => {
    const user = users.find(({ id }) => id === +selectedUser);
    dispatch(setUser(user));
    setIsOverlayOpen(false);
    setIsLoginPopupOpen(false);
  };

  return (
    <form className={`popup ${isLoginPopupOpen ? 'popup_active' : undefined}`}>
      <label htmlFor="loginMembers">
        <div className="select app__header-select">
          <select className="select__inner js-auth-select" name="loginMembers" value={selectedUser} onChange={handleChangeUser}>
            {users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)}
          </select>
        </div>
        <button className="popup__btn" type="button" onClick={handleOnClick}>Confirm</button>
      </label>
    </form>
  );
};

export default LoginPopup;
