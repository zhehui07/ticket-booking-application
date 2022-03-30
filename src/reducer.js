const initialState = {
  isLogin: false,
  targetDate: (new Date()).getDate(),
  uname: '',
  movie: '',
  date: '',
  time: '',
  movieId: null,
  seats: [],
  booking: {},
  booked: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'logout':
      return { ... state, isLogin: false, uname: '', movie: '', date: '', time: ''};
    case 'login':
          console.log('before checking reducer login booked');
          console.log(action.booked);
          console.log('after checking reducer login booked');
      return { ... state, isLogin: true, uname: action.username, booked: action.booked};
    case 'updateMovie':
      if (!action.movie) {
        return state;
      }
      const seats = action.movie.seats;
      const booking = state.booking;
      if (booking !== undefined && booking !== null) {
        Object.keys(state.booking).map(row => {
          Object.keys(state.booking[row]).map(col => {
            seats[row][col] = 3;
          })
        });
      }
      return {
        ... state,
        movie: action.movie.name,
        date: action.movie.date,
        time: action.movie.time,
        seats: action.movie.seats,
        movieId: action.movie.id,
        // booking: {}
      };
    case 'toggleMovie':
      if (!action.movie) {
        return {
          ... state,
          movie: '',
          date: '',
          time: '',
          seats: [],
          movieId: null,
          booking: {},
        }
      }
      return {
        ... state,
        movie: action.movie.name,
        date: action.movie.date,
        time: action.movie.time,
        seats: action.movie.seats,
        movieId: action.movie.id,
        booking: {}
      };
    case 'updateSeats':
      return {
        ... state,
        seats: action.seats,
      };
    case 'toggleSeat':
      const newSeats = [ ... state.seats ];
      const newBooking = { ... state.booking };
      if (newSeats[action.row][action.col] > 1) {
        newSeats[action.row] = [ ... newSeats[action.row]];
        newSeats[action.row][action.col] = 3 - (newSeats[action.row][action.col] - 2);
        if (newSeats[action.row][action.col] == 3) {
          if (newBooking[action.row] === null || newBooking[action.row] === undefined) {
            newBooking[action.row] = {};
          }
          newBooking[action.row][action.col] = 1;
        } else {
          delete newBooking[action.row][action.col];
          if (newBooking[action.row] == {}) {
            delete newBooking[action.row]
          }
        }
      }
      return {
        ... state,
        seats: [... newSeats],
        booking: newBooking,
      };
    case 'finishBooking':
      const seatsUpdate = [... state.seats];
      Object.keys(state.booking).map( row => {
        seatsUpdate[row] = [ ...seatsUpdate[row]];
        Object.keys(state.booking[row]).map( col => {
          seatsUpdate[row][col] = 1;
        })
      });
      return {
        ... state,
        booked: action.booked,
        seats: seatsUpdate,
        booking: {},
      };
    /*
    case 'bookSeat':
      const newSeats = { ... state.seats };
      delete newTodos[action.row];
      return {
        ... state,
        todos: {
          ... newTodos,
        }
      };
    case 'addTask':
      const addedTodos = { ... state.todos };
      addedTodos[action.todo.id] = action.todo;
      return {
        ... state,
        todos: {
          ... addedTodos,
        }
      };
      */
    default:
      return state;
  }
};

module.exports = {
  initialState,
  reducer,
};
