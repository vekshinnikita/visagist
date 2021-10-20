import { all } from "redux-saga/effects";
import authWatcher from "./auth/auth.saga";
import coursesWatcher from "./courses/courses.saga";

function* rootSaga() {
  yield all([coursesWatcher(), authWatcher()]);
}

export default rootSaga;
