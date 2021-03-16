export const SET_CALENDAR_DATA = 'SET_CALENDAR_DATA';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';

export const setCalendarData = (data) => ({
  type: SET_CALENDAR_DATA,
  payload: data,
});

export const setIsAdmin = (isAdmin) => ({
  type: SET_IS_ADMIN,
  payload: isAdmin,
});
