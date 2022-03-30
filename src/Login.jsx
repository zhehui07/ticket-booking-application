import {useState, useContext} from 'react';
import {fetchLogin} from './services';
import TicketContext from './TicketContext';

function Login() {
  const [uname, setUName] = useState('');
  const {onLogin, onLogout} = useContext(TicketContext);

  function onClick() {
    fetchLogin(uname)
    .then(response => {
        if (response.ok) {
          response.json().then( booked => {
          console.log('before checking login response');
          console.log(booked);
          console.log('after checking login response');
              onLogin(uname, booked)});
        } else {
          onLogout();
        }
    });
  }

  function onUNameInput(username) {
    setUName(username);
  } 

  return (
    <div>
      <input type="text" onInput={e => onUNameInput(e.target.value)}></input>
      <button onClick={() => onClick()}>Login To Book</button>
    </div>
  );
}

export default Login;
