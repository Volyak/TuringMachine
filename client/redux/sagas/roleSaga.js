import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/roleActions'
import { getAllRoles } from '../../services/roleApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetRoles()
    ])
}

function* watchGetRoles() {
    yield takeLatest(actions.getRoles, getRolesSaga)
}

function* getRolesSaga() {
    try {
        const roles = yield call(getAllRoles);
        yield put(actions.getRolesSuccess(roles));
    }
    catch (error) {
        yield put(actions.getRolesFailure(error))
    }
}