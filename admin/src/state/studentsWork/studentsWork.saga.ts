import { call, put, takeLatest } from "@redux-saga/core/effects";
import { Review, StudentWork } from "@/types/models";
import { showAlert } from "../alert";
import * as actions from "./studentsWork.actions";
import * as constants from "./studentsWork.constants";
import * as api from "./studentsWork.api";
import * as types from "./studentsWork.types";

function* getStudentsWorkWorker() {
  try {
    const studentsWork: StudentWork[] = yield call(api.getStudentsWorkApi);
    yield put(actions.getStudentsWorkSuccess(studentsWork));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.getStudentsWorkFailed());
  }
}

function* createStudentWorkWorker(action: types.CreateStudentWorkValue) {
  try {
    const studentWork: StudentWork = yield call(
      api.createStudentWorkApi,
      action.studentWork
    );
    yield put(actions.createStudentWorkSuccess(studentWork));
    yield put(showAlert("Работа студента создана"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.createStudentWorkFailed());
  }
}

function* updateStudentWorkWorker(action: types.UpdateStudentWorkValue) {
  try {
    const studentWork: StudentWork = yield call(
      api.updateStudentWorkApi,
      action.studentWork
    );
    yield put(actions.updateStudentWorkSuccess(studentWork));
    yield put(showAlert("Работа студента обновлен"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.updateStudentWorkFailed());
  }
}

function* moveStudentWorkWorker(action: types.UpdateStudentWorkValue) {
  try {
    const studentWork: StudentWork = yield call(
      api.updateStudentWorkApi,
      action.studentWork
    );
    yield put(actions.moveStudentWorkSuccess(studentWork));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.moveStudentWorkFailed());
  }
}

function* deleteStudentWorkWorker(action: types.DeleteStudentWorkValue) {
  try {
    yield call(api.deleteStudentWorkApi, action.studentWorkId);
    yield put(actions.deleteStudentWorkSuccess(action.studentWorkId));
    yield put(showAlert("Работа студента удален"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.deleteStudentWorkFailed());
  }
}

function* studentsWorkWatcher() {
  yield takeLatest(constants.GET_STUDENTS_WORK, getStudentsWorkWorker);
  yield takeLatest(constants.UPDATE_STUDENT_WORK, updateStudentWorkWorker);
  yield takeLatest(constants.MOVE_STUDENT_WORK, moveStudentWorkWorker);
  yield takeLatest(constants.CREATE_STUDENT_WORK, createStudentWorkWorker);
  yield takeLatest(constants.DELETE_STUDENT_WORK, deleteStudentWorkWorker);
}

export default studentsWorkWatcher;
