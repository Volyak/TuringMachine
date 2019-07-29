export const getAllRoles = () => {
    return fetch('/api/roles', {
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

export const getRole = (id) => {
    return fetch('/api/roles/' + id, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(res => {
                        console.log(JSON.stringify(res))
                        return res.role});
            } else {
                throw response.status;
            }
        })
};

export const addRole = (newRole) => {
    return fetch('/api/roles/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newRole })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(res => res.role);
            } else {
                throw response.status;
            }
        })
};

export const updateRole = (id, newRole) => {
    return fetch('/api/roles/' + id, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newRole })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(res => res.role);
            } else {
                throw response.status;
            }
        })
};

export const deleteRole = (id) => {
    return fetch('/api/roles/' + id, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                throw response.status;
            }
        })
};