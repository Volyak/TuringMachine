export const getAllSolutions = () => {
    return fetch('/api/solutions', {
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

export const getSolutionById = (id) => {
    return fetch('/api/solutions/' + id, {
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

export const postSolution = (taskId, solution) => {
    return fetch('/api/tasks/' + taskId + '/solutions', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({solution})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status
            }
        })
};

export const deleteSolution = (id) => {
    return fetch('/api/solutions/' + id, {
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