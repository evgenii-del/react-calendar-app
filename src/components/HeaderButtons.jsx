import React from 'react';

const HeaderButtons = (props) => {
  const {
    selectedMember, handleChangeMember, handleOpenPopup, users,
  } = props;
  return (
    <div className="app__header-buttons">
      <label htmlFor="filterByMembers">
        <div className="select app__header-select">
          <select
            className="select__inner"
            name="filterByMembers"
            value={selectedMember}
            onChange={handleChangeMember}
          >
            <option value="all">All members</option>
            {users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)}
          </select>
        </div>
      </label>
      <button className="app__header-button" type="button" onClick={handleOpenPopup}>New event</button>
    </div>
  );
};

export default HeaderButtons;
