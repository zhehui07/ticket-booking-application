import {useState, useContext} from 'react';
import {fetchBookingEvents} from './services';
import TicketContext from './TicketContext';

function BookBtn() {
  const {state, onBook} = useContext(TicketContext);
  function onClick() {
    const booking = {[state.movieId]: state.booking};
    fetchBookingEvents(booking)
    .then( response => {
      if (response.ok) {
        response.json().then( booked => {onBook(booked)});
      }
    });
  }

  return (
    <div>
      <button onClick={() => onClick()}>Book Ticket(s)</button>
    </div>
  );
}

export default BookBtn;
