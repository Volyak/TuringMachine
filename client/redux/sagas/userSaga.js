import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/userActions'
import { getAllUsers } from '../../services/userApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetUsers()
    ])
}

function* watchGetUsers() {
    yield takeLatest(actions.getUsers, getUsersSaga)
}

function* getUsersSaga() {
    try {
        const users = yield call(getAllUsers);
        yield put(actions.getUsersSuccess(users));
    }
    catch (error) {
        yield put(actions.getUsersFailure(error))
    }
}