import { combineReducers } from 'redux'
import application from './applicationReducer'
import authorization from './authorizationReducer'
import task from './taskReducer'
import solution from './solutionReducer'
import user from './userReducer'
import role from './roleReducer'

export default combineReducers({
    application,
    authorization,
    task,
    solution,
    user,
    role
})