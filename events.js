const uuid = require('uuid').v4;
const id1 = uuid();
const id2 = uuid();
const id3 = uuid();
const eventList = {
  [id1]: {
    id: id1,
    name: 'Snow White',
    date: '2021-12-30',
    time: '12:00pm',
    seats: [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
      [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
  },
  [id2]: {
    id: id2,
    name: 'Snow Black',
    date: '2021-12-30',
    time: '2:00pm',
    seats: [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
      [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
  },
  [id3]: {
    id: id3,
    name: 'Eternal',
    date: '2021-12-26',
    time: '2:00pm',
    seats: [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
      [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    ],
  },
};

function getEventsByDate(date) {
  console.log('in getEventsByDate and the date is');
  console.log(date);
  console.log('finish getEventByDate');
  const res = {};
  for (key in eventList) {
    if (eventList[key].date === date) {
      res[key] = eventList[key];
    }
  }
  return res;
}

module.exports = {
  eventList,
  getEventsByDate,
};


