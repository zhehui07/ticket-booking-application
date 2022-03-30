import {useContext, useState} from 'react';
import TicketContext from './TicketContext';
import {fetchEventsByDate} from './services';

      // <input type="date" value={String((new Date()).toLocaleDateString())}></input>
function MovieNav() {
  const {state, onToggleMovie} = useContext(TicketContext); 
  const [events, setEvents] = useState({});
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
    /*
          */

  function onChange(e) {
    console.log(e.target.value);
    fetchEventsByDate(e.target.value)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject({error: 'the response is not valid'});
      }
    })
    .then(events => {
      if (events) {
        setEvents(events);
        onToggleMovie(events[Object.keys(events)[0]]);
      }
    });
  }

  function onSelectMovie(e) {
    console.log('lizhenhu ---> e value is ' + e.target.value);
    onToggleMovie(events[e.target.value]);
  }

  return (
    <div>
      <label> Please choose a day </label>
      <input type="date"  onChange={(e) => onChange(e)}></input>
      <br/>
      <label> Please choose a movie </label>
      <select onChange={(e) => onSelectMovie(e)}> {
        events && 
        Object.keys(events).map( (eventId) => {
            return (<option value={eventId}> {events[eventId].name} </option>);
        })
      } </select>
    </div>
  );
}

            // return (<option id={eventId}>  </option>);
export default MovieNav;
