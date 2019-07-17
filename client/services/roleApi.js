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
                    .then(res => res.role);
            } else {
                throw response.status;
            }
        })
};