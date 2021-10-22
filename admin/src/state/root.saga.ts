import { all } from "redux-saga/effects";
import authWatcher from "./auth/auth.saga";
import coursesWatcher from "./courses/courses.saga";
import reviewsWatcher from "./reviews/reviews.saga";

function* rootSaga() {
  yield all([coursesWatcher(), authWatcher(), reviewsWatcher()]);
}

export default rootSaga;
