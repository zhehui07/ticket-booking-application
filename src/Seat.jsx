import {useContext} from 'react';
import TicketContext from './TicketContext';

function Seat() {
  const {state, onToggleSeat} = useContext(TicketContext);
  const seats = state.seats;
  const availability = ['X', '+', 'O'];
  let count = 0;
  console.log('we are before checking booked');
  console.log(state.booked);
  console.log('we are after checking booked');
  if (state.booked && state.movieId && state.booked[state.movieId]) {
    const booked = state.booked[state.movieId];
    for(var row in booked){
      for (var col in booked[row]) {
        count++;
      }
    }
  }

  return (
    <div>
      <p> hahaha </p>
      <table>
      {
        Object.values(seats).map((row, idx1) => {
          console.log(row);
          return (
            <tr>
            {
              Object.values(row).map((seat, idx2) => {
                return (
                  <td>
                    {seat !== 0 && <button onClick={() => { if(seat !== 1) {onToggleSeat(idx1, idx2)}}}>{availability[seat - 1]}</button>}
                  </td>
                );
              })
            }
            </tr>
          );
        })
      }
      </table>
      <p> movieId is {state.movieId}</p>
      {count > 0 && <p> You have booked {count} tickets </p>} 
    </div>
  );
}

export default Seat;
