function fetchSession() {
    return fetch('/api/session',{
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include",
      }
    )
    .catch( () => Promise.reject({ error: 'networkError'}))
};

function fetchLogin(username) {
    return fetch('/api/session',{
      method: "post",
      headers: new Headers ({
        "content-type": "application/json"
      }),
      body: JSON.stringify({username: `${username}`}),
      }
    )
    .catch( () => Promise.reject({ error: 'networkError'}))
};

function fetchLogout() {
    return fetch('/api/session',{
        method: "delete",
    })
    .catch( () => Promise.reject({ error: 'networkError'}))
}

function fetchEvents() {
    return fetch('/api/movies', {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include",
      }
    )
    .catch( () => Promise.reject({ error: 'networkError'}))
};

function fetchEventsByDate(date) {
    console.log('we are in fetchEventByDate');
    console.log(date);
    console.log('we are out fetchEventsByDate');
    return fetch('/api/movies/' + date, {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include",
      }
    )
    .catch( () => Promise.reject({ error: 'networkError'}))
};

function fetchBookingEvents(booking) {
    return fetch('/api/booked',{
      method: "post",
      headers: new Headers ({
        "content-type": "application/json"
      }),
      body: JSON.stringify(booking),
      }
    )
    .catch( () => Promise.reject({ error: 'networkError'}))
};

function fetchToggleTodo(task) {
    return fetch(`/api/todos/${task.id}`,{
        method: "put",
        headers: {"content-type": "application/json"},
        body:JSON.stringify({task:task.task, done: !task.done}),
    })
    .catch( () => Promise.reject({error: 'networdError'}))
}


function fetchAddTask(task) {
    return fetch(`/api/todos/`,{
        method: "post",
        headers: {"content-type": "application/json"},
        body:JSON.stringify({task}),
    })
    .catch( () => Promise.reject({error: 'networdError'}))  
}

function fetchDeleteTask(id) {
    return fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError'}))
}

function fetchTodos() {
    return fetch('/api/todos',{
        method: "get",
        headers: {"content-type": "application/json"},
        credentials: "include",
    })
    .catch(() => Promise.reject({error: 'networdError'}))
}

module.exports = {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchEvents,
    fetchEventsByDate,
    fetchBookingEvents,
    fetchToggleTodo,
    fetchAddTask,
    fetchDeleteTask,
    fetchTodos,
};
