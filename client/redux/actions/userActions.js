import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getUsers = createAction('GET_USERS');

export const getUsersSuccess = createAction('GET_USERS_SUCCESS');

export const getUsersFailure = createAction('GET_USERS_FAILURE');