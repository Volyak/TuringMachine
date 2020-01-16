export const getAllUsers = () => {
    return fetch('/api/users', {
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

export const getUser = (id) => {
    return fetch('/api/users/'+id, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if(response.status === 200){
                return response.json()
                    .then(res => res.user);
            } else {
                throw response.status;
            }
        })
};

export const getUserSolutions = (id) => {
    return fetch('/api/users/'+id+"/solutions", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if(response.status === 200){
                return response.json()
                    .then(res => res.solutions);
            } else {
                throw response.status;
            }
        })
};
export const editUser = (id, user) => {
    return fetch('/api/users/' + id, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
    })
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                throw response.status
            }
        })
};

export const deleteUser = (id) => {
    return fetch('/api/users/' + id, {
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