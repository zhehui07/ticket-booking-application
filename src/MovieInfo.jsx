import {useContext} from 'react';
import TicketContext from './TicketContext';

function MovieInfo() {
  const {state} = useContext(TicketContext);
  return (
    <div>
      <label> {state.movie} </label>
      <label> {state.date} </label><br/>
      <label> {state.time} </label>
    </div>
  );
}

export default MovieInfo;
