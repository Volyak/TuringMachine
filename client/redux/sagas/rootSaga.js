import { all } from 'redux-saga/effects'
import authorizationSaga from './authorizationSaga'
import applicationSaga from './applicationSaga'
import taskSaga from './taskSaga'
import solutionSaga from './solutionSaga'

const creator = () => {
    function* rootSaga() {
        yield all([
            authorizationSaga(),
            applicationSaga(),
            taskSaga(),
            solutionSaga()
        ])
    }

    return rootSaga()
};

export default creator