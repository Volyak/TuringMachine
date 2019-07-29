import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/roleActions'
import { getAllRoles, deleteRole } from '../../services/roleApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetRoles(),
        watchDeleteRole()
    ])
}

function* watchGetRoles() {
    yield takeLatest(actions.getRoles, getRolesSaga)
}

function* watchDeleteRole() {
    yield takeLatest(actions.deleteRole, deleteRoleSaga)
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

function* deleteRoleSaga(action) {
    try {
        console.log("DS")
        const {id} = action.payload;
        yield call(deleteRole, id);

        yield put(actions.getRoles());
        yield put(actions.deleteRoleSuccess());
    }
    catch (error) {
        yield put(actions.deleteRoleFailure(error))
    }
}