import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getRoles = createAction('GET_ROLES');

export const getRolesSuccess = createAction('GET_ROLES_SUCCESS');

export const getRolesFailure = createAction('GET_ROLES_FAILURE');