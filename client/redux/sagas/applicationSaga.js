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
        const user = yield call(getInitialStateFromServer);
        if(user) {
            yield put(actions.initSuccessAuthorized(user));
        } else{
            yield put(actions.initSuccessNotAuthorized())
        }
    }
    catch (error) {
        yield put(actions.initFailure(error))
    }
}