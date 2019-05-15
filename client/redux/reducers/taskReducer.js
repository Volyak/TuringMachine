import {handleActions} from 'redux-actions'
import * as actions from '../actions/taskActions'

const initialState = {
    tasks: []
};

const taskReducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            tasks: initialState.tasks
        }),

        [actions.getTasksSuccess]: (state, {payload}) => ({
            ...state,
            tasks: payload.tasks
        }),

    },
    initialState
);

export default taskReducer