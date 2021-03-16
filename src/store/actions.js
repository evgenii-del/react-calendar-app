import Server from '../utils/server';

export const GET_CALENDAR_DATA_STARTED = 'GET_CALENDAR_DATA_STARTED';
export const GET_CALENDAR_DATA_SUCCESS = 'GET_CALENDAR_DATA_SUCCESS';
export const GET_CALENDAR_DATA_FAILURE = 'GET_CALENDAR_DATA_FAILURE';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';

const server = new Server('http://158.101.166.74:8080/api/data/', 'evgenii_khasanov', 'events');

export const getCalendarDataStarted = () => ({
  type: GET_CALENDAR_DATA_STARTED,
});

export const getCalendarDataSuccess = (data) => ({
  type: GET_CALENDAR_DATA_SUCCESS,
  payload: data,
});

export const getCalendarDataFailure = (error) => ({
  type: GET_CALENDAR_DATA_FAILURE,
  payload: { error },
});

export const getCalendarData = () => (dispatch) => {
  dispatch(getCalendarDataStarted());

  server.fetchEvents()
    .then(({ data }) => {
      const parsedData = data.map((item) => ({ id: item.id, data: JSON.parse(item.data) }));
      dispatch(getCalendarDataSuccess(parsedData));
    })
    .catch((error) => dispatch(getCalendarDataFailure(error)));
};

export const setIsAdmin = (isAdmin) => ({
  type: SET_IS_ADMIN,
  payload: isAdmin,
});
