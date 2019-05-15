export const getAllTasks = () => {
    return fetch('/api/tasks', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
};

export const addTask = (task) => {
    return fetch('/api/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                throw response.status;
            }
        })
};

export const getTask = (id) => {
    return fetch('/api/tasks/' + id, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if(response.status === 200){
                return response.json()
                    .then(res => res.task);
            } else {
                throw response.status;
            }
        })
};

export const editTask = (id, task) => {
    return fetch('/api/tasks/' + id, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                throw response.status
            }
        })
};

export const deleteTask = (id) => {
    return fetch('/api/tasks/' + id, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status
            }
        })
};