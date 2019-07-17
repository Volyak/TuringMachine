import {handleActions} from 'redux-actions'
import * as actions from '../actions/roleActions'

const initialState = {
    roles: []
};

const roleReducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            roles: initialState.roles
        }),

        [actions.getRolesSuccess]: (state, {payload}) => ({
            ...state,
            roles: payload.roles
        }),
    },
    initialState
);

export default roleReducer