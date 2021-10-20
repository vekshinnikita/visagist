import { all } from "redux-saga/effects"; 
import coursesWatcher from './courses/courses.saga'

function* rootSaga() {
  yield all([coursesWatcher()]);
}

export default rootSaga;
