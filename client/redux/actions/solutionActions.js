import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getSolutions = createAction('GET_SOLUTIONS');

export const getSolutionsSuccess = createAction('GET_SOLUTIONS_SUCCESS');

export const getSolutionsFailure = createAction('GET_SOLUTIONS_FAILURE');

export const deleteSolution = createAction('DELETE_SOLUTION');

export const deleteSolutionSuccess = createAction('DELETE_SOLUTION_SUCCESS');

export const deleteSolutionFailure = createAction('DELETE_SOLUTION_FAILURE');