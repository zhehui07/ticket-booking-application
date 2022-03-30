import { useContext } from 'react';
import { fetchLogout } from './services';
import TicketContext from './TicketContext';

function Logout() {
  const {onLogin, onLogout, state} = useContext(TicketContext);

  function onClick() {
    fetchLogout()
    .then(response => {
      if (response.ok) {
        // dispatch({type: 'logout'});
        onLogout();
      } else {
        // dispatch({type: 'login', username: state.uname});
        onLogin(state.uname);
      }
    })
  }
  
  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default Logout;
