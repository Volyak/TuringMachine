import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/applicationActions'
import { getInitialStateFromServer } from '../../services/authorizationApi'

export default  function* authorizationSaga() {
    yield all([
        watchInit()
    ])
}

function* watchInit() {
    yield takeLatest(actions.init, initSaga)
}

function* initSaga() {
    try {
        const {username} = yield call(getInitialStateFromServer);

        if(username) {
            yield put(actions.initSuccessAuthorized(username));
        } else{
            yield put(actions.initSuccessNotAuthorized())
        }
    }
    catch (error) {
        yield put(actions.initFailure(error))
    }
}