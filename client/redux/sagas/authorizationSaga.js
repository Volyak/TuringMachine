import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/authorizationActions'
import { signIn, signUp, signOut } from '../../services/authorizationApi'

export default  function* authorizationSaga() {
    yield all([
        watchSignIn(),
        watchSignUp(),
        watchSignOut()
    ])
}

function* watchSignIn() {
    yield takeLatest(actions.signIn, signInSaga)
}

function* watchSignUp() {
    yield takeLatest(actions.signUp, signUpSaga)
}

function* watchSignOut() {
    yield takeLatest(actions.signOut, signOutSaga)
}

function* signInSaga(action) {
    try {
        let { username, password } = action.payload;
        const user = yield call(signIn, username, password);
        console.log(JSON.stringify(user));
        yield put(actions.signInSuccess(user));
    }
    catch (error) {
        yield put(actions.signInFailure(error))
    }
}

function* signUpSaga(action) {
    try {
        let { username, password} = action.payload;
        username = yield call(signUp, username, password);
        yield put(actions.signUpSuccess(username));
    }
    catch (error) {
        yield put(actions.signInFailure(error))
    }
}

function* signOutSaga() {
    try {
        yield call(signOut);
        yield put(actions.signOutSuccess())
    }
    catch (error) {
        yield put(actions.signOutFailure(error))
    }
}