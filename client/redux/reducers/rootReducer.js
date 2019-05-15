import { combineReducers } from 'redux'
import application from './applicationReducer'
import authorization from './authorizationReducer'
import task from './taskReducer'
import solution from './solutionReducer'

export default combineReducers({
    application,
    authorization,
    task,
    solution
})