import { all } from "redux-saga/effects";
import authWatcher from "./auth/auth.saga";
import coursesWatcher from "./courses/courses.saga";
import reviewsWatcher from "./reviews/reviews.saga";
import studentsWorkWatcher from "./studentsWork/studentsWork.saga";

function* rootSaga() {
  yield all([
    coursesWatcher(),
    authWatcher(),
    reviewsWatcher(),
    studentsWorkWatcher(),
  ]);
}

export default rootSaga;
