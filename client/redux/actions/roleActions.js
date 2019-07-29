import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getRoles = createAction('GET_ROLES');

export const getRolesSuccess = createAction('GET_ROLES_SUCCESS');

export const getRolesFailure = createAction('GET_ROLES_FAILURE');

export const deleteRole = createAction('DELETE_ROLE');

export const deleteRoleSuccess = createAction('DELETE_ROLE_SUCCESS');

export const deleteRoleFailure = createAction('DELETE_ROLE_FAILURE');