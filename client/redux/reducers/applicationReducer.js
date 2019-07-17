import {handleActions} from 'redux-actions'
import * as application from '../actions/applicationActions'
import * as authorization from '../actions/authorizationActions'

const initialState = {
    authorized: false,
    isFetching: true,
    username: '',
    role: '',
    groups: []
};

const reducer = handleActions(
    {
        [application.init]: (state) => ({
            ...state,
            authorized: initialState.authorized,
            isFetching: initialState.isFetching,
            username: initialState.username,
            role: initialState.role,
            groups: initialState.groups
        }),

        [application.initSuccessAuthorized]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            username: payload.username,
            role: payload.role,
            groups: payload.groups
        }),

        [application.initSuccessNotAuthorized]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
            username: '',
            role: '',
            groups: []
        }),

        [application.initFailure]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
            username: '',
            role: '',
            groups: []
        }),

        [authorization.signIn]: (state) => ({
            ...state,
            isFetching: true
        }),

        [authorization.signInSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            username: payload.username,
            role: payload.role,
            groups: payload.groups
        }),

        [authorization.signUp]: (state) => ({
            ...state,
            isFetching: true
        }),

        [authorization.signUpSuccess]: (state, {payload}) => ({
            ...state,
            authorized: true,
            isFetching: false,
            username: payload.username,
            role: payload.role,
            groups: payload.groups
        }),

        [authorization.signOutSuccess]: (state) => ({
            ...state,
            authorized: false,
            isFetching: false,
            username: '',
            role: '',
            groups: []
        })
    },
    initialState
);

export default reducer