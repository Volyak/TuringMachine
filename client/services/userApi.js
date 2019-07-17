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