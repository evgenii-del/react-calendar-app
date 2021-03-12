import User from './assets/user';
import Admin from './assets/admin';

const userNames = ['John', 'Sam', 'Ann', 'Thomas'];
const timesArr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const timesSelectArr = timesArr.map((el) => ({ value: el, label: `${el}:00` }));
const createCalendarData = () => {
  const obj = {};
  timesArr.forEach((time) => {
    obj[time] = {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
    };
  });
  return obj;
};
const calendarData = createCalendarData();
