import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/solutionActions'
import { getAllSolutions } from '../../services/solutionApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetSolutions()
    ])
}

function* watchGetSolutions() {
    yield takeLatest(actions.getSolutions, getSolutionsSaga)
}

function* getSolutionsSaga() {
    try {
        const solutions = yield call(getAllSolutions);
        yield put(actions.getSolutionsSuccess(solutions));
    }
    catch (error) {
        yield put(actions.getSolutionsFailure(error))
    }
}