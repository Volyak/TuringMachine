import { all, takeLatest, call, put } from 'redux-saga/effects'
import * as actions from '../actions/taskActions'
import { getAllTasks, editTask, addTask, deleteTask } from '../../services/taskApi'

export default  function* authorizationSaga() {
    yield all([
        watchGetTasks(),
        watchUpdateTask(),
        watchAddTask(),
        watchDeleteTask()
    ])
}

function* watchGetTasks() {
    yield takeLatest(actions.getTasks, getTasksSaga)
}

function* watchUpdateTask() {
    yield takeLatest(actions.updateTask, updateTaskSaga)
}

function* watchAddTask() {
    yield takeLatest(actions.addTask, addTaskSaga)
}

function* watchDeleteTask() {
    yield takeLatest(actions.deleteTask, deleteTaskSaga)
}

function* getTasksSaga() {
    try {
        const tasks = yield call(getAllTasks);
        yield put(actions.getTasksSuccess(tasks));
    }
    catch (error) {
        yield put(actions.getTasksFailure(error))
    }
}

function* updateTaskSaga(action) {
    try {
        const {id, newTask} = action.payload;
        yield call(editTask, id, newTask);

        yield put(actions.getTasks());
        yield put(actions.updateTaskSuccess())

    }
    catch (error) {
        yield put(actions.updateTaskFailure(error))
    }
}

function* addTaskSaga(action) {
    try {
        const {newTask} = action.payload;
        yield call(addTask, newTask);

        yield put(actions.getTasks());
        yield put(actions.addTaskSuccess())

    }
    catch (error) {
        yield put(actions.addTaskFailure(error))
    }
}

function* deleteTaskSaga(action) {
    try {
        const {id} = action.payload;
        yield call(deleteTask, id);

        yield put(actions.getTasks());
        yield put(actions.deleteTaskSuccess());
    }
    catch (error) {
        yield put(actions.deleteTaskFailure(error))
    }
}