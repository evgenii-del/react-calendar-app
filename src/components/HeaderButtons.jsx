import React from 'react';

const HeaderButtons = (props) => {
  const { selectedMember, handleChangeMember, handleOpenPopup } = props;
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
            <option value="1">John</option>
            <option value="2">Sam</option>
            <option value="3">Ann</option>
            <option value="4">Thomas</option>
            <option value="5">Eve</option>
          </select>
        </div>
      </label>
      <button className="app__header-button" type="button" onClick={handleOpenPopup}>New event</button>
    </div>
  );
};

export default HeaderButtons;
