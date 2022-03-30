import { useEffect, useReducer } from 'react';
import './App.css';
import {reducer, initialState} from './reducer';
import Seat from './Seat';
import Login from './Login';
import Logout from './Logout';
import BookBtn from './BookBtn';
import MovieInfo from './MovieInfo';
import MovieNav from './MovieNav';
import {fetchSession, fetchEventsByDate} from './services';
import TicketContext from './TicketContext';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onLogin = (username, booked) => {
          console.log('before calling reducer login booked');
          console.log(booked);
          console.log('after calling reducer login booked');
dispatch({type: 'login', username, booked})};
  const onLogout = () => {dispatch({type: 'logout'})};
  const onUpdateMovieInfo = (movieInfo) => {dispatch({type: 'updateMovie', movie: movieInfo})};
  const onToggleMovie = (movie) => {dispatch({type: 'toggleMovie', movie})};
  const onToggleSeat = (row, col) => {dispatch({type: 'toggleSeat', row, col})};
  const onBook = (booked) => {dispatch({type: 'finishBooking', booked})};

  useEffect(() => {
    fetchSession()
    .then(response => {
      if (response.ok) {
        response.json().then((data) => {onLogin(data.username)});
      } else {
        onLogout();
      }
    })
    .then(() => {
      console.log('we are going to fetchEvents');
      fetchEventsByDate(state.date)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({error: 'something wrong in fetching event'});
        }
      })
      .then(eventList => {
        console.log('we are having eventList now');
        console.log(eventList);
        if (eventList && Object.keys(eventList) !== 0) {
          onUpdateMovieInfo(eventList[Object.keys(eventList)[0]]);
        }
      })
    })
    },
    [state.isLogin]
  );

  return (
    <div className="App">
      <TicketContext.Provider value={{state, dispatch, onLogin, onLogout, onToggleMovie, onToggleSeat, onBook}}>
        <p> hello, {state.uname}!</p>
        <MovieNav/>
        {state.movieId && <MovieInfo/>}
        <Seat/>
        {!state.isLogin && <Login/>}
        {state.isLogin && state.movieId && <BookBtn/>}
        {state.isLogin && <Logout/>}
      </TicketContext.Provider>
    </div>
  );
}

export default App;
