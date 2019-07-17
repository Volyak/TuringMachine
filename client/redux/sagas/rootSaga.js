import { all } from 'redux-saga/effects'
import authorizationSaga from './authorizationSaga'
import applicationSaga from './applicationSaga'
import taskSaga from './taskSaga'
import solutionSaga from './solutionSaga'
import userSaga from './userSaga'
import roleSaga from './roleSaga'

const creator = () => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            applicationSaga(),
            taskSaga(),
            solutionSaga(),
            userSaga(),
            roleSaga()
        ])
    }

    return rootSaga()
};

export default creator