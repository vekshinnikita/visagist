import { call, put, takeLatest } from "@redux-saga/core/effects";
import { Course, CourseDetails } from "@/types/models";
import * as actions from "./courses.actions";
import * as api from "./courses.api";
import * as constants from "./courses.constants";
import * as types from "./courses.types";

function* getCoursesWorker() {
  try {
    const courses: Course[] = yield call(api.getCoursesApi);
    yield put(actions.getCoursesSuccess(courses));
  } catch (error) {
    console.log(error);
    yield put(actions.getCoursesFailed());
  }
}

function* getCurrentCourseWorker(action: types.GetCurrentCourseValue) {
  try {
    const currentCourse: CourseDetails = yield call(
      api.getCurrentCourseApi,
      action.pk
    );
    yield put(actions.getCurrentCourseSuccess(currentCourse));
  } catch (error) {
    console.log(error);
    yield put(actions.getCurrentCourseFailed());
  }
}

function* createCourseWorker(action: types.CreateCourseValue) {
  try {
    const course: CourseDetails = yield call(
      api.createCourseApi,
      action.course
    );
    yield put(actions.createCourseSuccess(course));
  } catch (error) {
    console.log(error);
    yield put(actions.createCourseFailed());
  }
}

function* updateCourseWorker(action: types.UpdateCourseValue) {
  try {
    yield call(api.updateCourseApi, action.course.id, action.course);
    yield put(actions.updateCourseSuccess());
  } catch (error: any) {
    console.log(error.response.data);
    yield put(actions.updateCourseFailed());
  }
}

function* deleteCourseWorker(action: types.DeleteCourseValue) {
  try {
    yield call(api.deleteCourseApi, action.pk);
    yield put(actions.deleteCourseSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.deleteCourseFailed());
  }
}

function* hideCoursesWorker(action: types.HideCoursesValue) {
  try {
    yield call(api.hideCoursesApi, action.ids);
    yield put(actions.hideCoursesSuccess(action.ids));
  } catch (error) {
    console.log(error);
    yield put(actions.hideCoursesFailed());
  }
}

function* revealCoursesWorker(action: types.RevealCoursesValue) {
  try {
    yield call(api.revealCoursesApi, action.ids);
    yield put(actions.revealCoursesSuccess(action.ids));
  } catch (error) {
    console.log(error);
    yield put(actions.revealCoursesFailed());
  }
}

function* deleteCoursesWorker(action: types.DeleteCoursesValue) {
  try {
    yield call(api.deleteCoursesApi, action.ids);
    yield put(actions.deleteCoursesSuccess(action.ids));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteCoursesFailed());
  }
}

function* coursesWatcher() {
  yield takeLatest(constants.GET_COURSES, getCoursesWorker);
  yield takeLatest(constants.GET_CURRENT_COURSE, getCurrentCourseWorker);
  yield takeLatest(constants.CREATE_COURSE, createCourseWorker);
  yield takeLatest(constants.UPDATE_COURSE, updateCourseWorker);
  yield takeLatest(constants.DELETE_COURSE, deleteCourseWorker);

  yield takeLatest(constants.HIDE_COURSES, hideCoursesWorker);
  yield takeLatest(constants.REVEAL_COURSES, revealCoursesWorker);
  yield takeLatest(constants.DELETE_COURSES, deleteCoursesWorker);
}

export default coursesWatcher;
