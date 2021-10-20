import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as actions from "./courses.actions";
import * as types from "./courses.types";
import * as api from "./courses.api";
import { Course, CourseDetails } from '@/typing/models'
import {getCourses, getCourseDetail} from './courses.actions'
import * as constants from './courses.constants'


function* getCoursesWorker() {
  try {
  const courses: Course[] = yield call(
    api.getCoursesApi);
  yield put(getCourses(courses))
  }catch(error) {
    console.log(error)
  }
}

function* getCourseDitailWorker(action: types.GetCourseDetailValueSaga) {
  try {
  const course: CourseDetails = yield call(
    api.getCourseDetailApi,
    action.pk
    );
  yield put(getCourseDetail(course))
  }catch(error) {
    console.log(error)
  }

}


function* coursesWatcher() {
  yield takeLatest(constants.FEATCH_COURSES, getCoursesWorker);
  yield takeLatest(constants.FEATCH_COURSE_DETAIL, getCourseDitailWorker);
}

export default coursesWatcher;