import { createAction } from 'redux-actions'

export const init = createAction('INIT');

export const getTasks = createAction('GET_TASKS');

export const getTasksSuccess = createAction('GET_TASKS_SUCCESS');

export const getTasksFailure = createAction('GET_TASKS_FAILURE');

export const updateTask = createAction('UPDATE_TASK');

export const updateTaskSuccess = createAction('UPDATE_TASK_SUCCESS');

export const updateTaskFailure = createAction('UPDATE_TASK_FAILURE');

export const addTask = createAction('ADD_TASK');

export const addTaskSuccess = createAction('ADD_TASK_SUCCESS');

export const addTaskFailure = createAction('ADD_TASK_FAILURE');

export const deleteTask = createAction('DELETE_TASK');

export const deleteTaskSuccess = createAction('DELETE_TASK_SUCCESS');

export const deleteTaskFailure = createAction('DELETE_TASK_FAILURE');