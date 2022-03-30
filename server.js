const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const sessions = require('./sessions');
const users = require('./users');
const {eventList, getEventsByDate} = require('./events');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());


// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, {});
  }
  res.cookie('sid', sid);
  console.log(users.getUserData(username));
  res.json(users.getUserData(username));
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }
  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// Todos
app.get('/api/movies', (req, res) => {
  const today = new Date();
  const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
  console.log(date);
  res.json(getEventsByDate(date));
});

app.get('/api/movies/:date', (req, res) => {
  const {date} = req.params;
  console.log('we are in get /api/movies/:date');
  console.log(date);
  console.log('we are out get /api/movies/:date');
  res.json(getEventsByDate(date));
});

app.get('/api/booked', (req, res) => {
  console.log("we are in /api/booked");
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username));
});

app.post('/api/booked', (req, res) => {
  console.log('we are in post booked');
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  console.log(req.body);
  // const id = todoList.addTodo(task);
  /*
  Object.keys(req.body).map( eventId => {
    if (eventList[eventId] === undefined || eventList[eventId] === null) {
      res.status(405).json({ error: 'no-such-event' });
      return;
    }
    Object.keys(req.body[eventId]).map(row => {
      Object.values(req.body[eventId][row]).map(col => {
        if (eventList[eventId].seats[row][col] !== 2) {
          res.status(406).json({ error: 'seat-unavailable'});
          return;
        }
      });
    });
  }); 
  */
  const booked = users.getUserData(username);
  Object.keys(req.body).map( eventId => {
    if (!booked[eventId]) {
      booked[eventId] = {};
    }
    Object.keys(req.body[eventId]).map(row => {
      if (!booked[eventId][row]){
        booked[eventId][row] = {};
      }
      Object.keys(req.body[eventId][row]).map(col => {
        booked[eventId][row][col] = 1;
        eventList[eventId].seats[row][col] = 1;
      });
      console.log(eventList[eventId].seats[row]);
    });
  }); 
  console.log(booked);
  res.json(booked);
});

app.get('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  res.json(todoList.getTodo(id));
});

app.put('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { task, done=false } = req.body;
  // Full Replacement required for a PUT
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

app.patch('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { task, done } = req.body;
  const todoList = users.getUserData(username);
  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  todoList.updateTodo(id, { task, done });
  res.json(todoList.getTodo(id));
});

app.delete('/api/todos/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);
  if(exists) {
    todoList.deleteTodo(id);
  }
  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

