import {handleActions} from 'redux-actions'
import * as actions from '../actions/solutionActions'

const initialState = {
    solutions: []
};

const solutionReducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            solutions: initialState.solutions
        }),

        [actions.getSolutionsSuccess]: (state, {payload}) => ({
            ...state,
            solutions: payload.solutions
        }),
    },
    initialState
);

export default solutionReducer