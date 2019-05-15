import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const signIn = createAction('SIGN_IN');

export const signInSuccess = createAction('SIGN_IN_SUCCESS');

export const signInFailure = createAction('SIGN_IN_FAILURE');

export const signUp = createAction('SIGN_UP');

export const signUpSuccess = createAction('SIGN_UP_SUCCESS');

export const signUpFailure = createAction('SIGN_UP_FAILURE');

export const signOut = createAction('SIGN_OUT');

export const signOutSuccess = createAction('SIGN_OUT_SUCCESS');

export const signOutFailure = createAction('SIGN_OUT_FAILURE');

export const openForm = createAction('OPEN_FORM');

export const closeForm = createAction('CLOSE_FORM');

export const enterPassword = createAction('ENTER_PASSWORD');

export const enterUsername = createAction('ENTER_USERNAME');