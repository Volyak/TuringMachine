import {handleActions} from 'redux-actions'
import * as actions from '../actions/authorizationActions'

const initialState = {
    isOpen: false,
    username: '',
    password: '',
};

const authorizationReducer = handleActions(
    {
        [actions.init]: state => ({
            ...state,
            isOpen: initialState.isOpen,
            password: initialState.password,
            username: initialState.username
        }),

        [actions.signInSuccess]: state => ({
            ...state,
            isOpen: false,
            username: '',
            password: ''
        }),

        [actions.signInFailure]: state => ({
            ...state,
            isOpen: true,
            username: '',
            password: ''
        }),

        [actions.signUpSuccess]: state => ({
            ...state,
            isOpen: false,
            username: '',
            password: ''
        }),

        [actions.signUpFailure]: state => ({
            ...state,
            isOpen: true,
            username: '',
            password: ''
        }),

        [actions.signOutSuccess]: state => ({
            ...state,
            isOpen: false,
            username: '',
            password: ''
        }),

        [actions.signOutFailure]: state => ({
            ...state,
            isOpen: false,
            username: '',
            password: ''
        }),

        [actions.openForm]: state => ({
            ...state,
            isOpen: true,
            username: '',
            password: ''
        }),

        [actions.closeForm]: state => ({
            ...state,
            isOpen: false,
            username: '',
            password: ''
        }),

        [actions.enterPassword]: (state, {payload}) => ({
            ...state,
            password: payload.password
        }),

        [actions.enterUsername]: (state, {payload}) => ({
            ...state,
            username: payload.username
        })
    },
    initialState
);

export default authorizationReducer