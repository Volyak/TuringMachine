import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/solutionActions'
import { getAllSolutions, deleteSolution } from '../../services/solutionApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetSolutions(),
        watchDeleteSolution()
    ])
}

function* watchGetSolutions() {
    yield takeLatest(actions.getSolutions, getSolutionsSaga)
}
function* watchDeleteSolution() {
    yield takeLatest(actions.deleteSolution, deleteSolutionSaga)
}
function* getSolutionsSaga() {
    try {
        const solutions = yield call(getAllSolutions);
        console.log(JSON.stringify(solutions));
        yield put(actions.getSolutionsSuccess(solutions));
    }
    catch (error) {
        yield put(actions.getSolutionsFailure(error))
    }
}

function* deleteSolutionSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteSolution, id);

        yield put(actions.getSolutions());
        yield put(actions.deleteSolutionSuccess());
    }
    catch (error) {
        yield put(actions.deleteSolutionFailure(error))
    }
}