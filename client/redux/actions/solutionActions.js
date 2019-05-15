import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getSolutions = createAction('GET_SOLUTIONS');

export const getSolutionsSuccess = createAction('GET_SOLUTIONS_SUCCESS');

export const getSolutionsFailure = createAction('GET_SOLUTIONS_FAILURE');