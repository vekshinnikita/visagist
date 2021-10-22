import { call, put, takeLatest } from "@redux-saga/core/effects";
import { Review } from "@/types/models";
import { showAlert } from "../alert";
import * as actions from "./reviews.actions";
import * as constants from "./reviews.constants";
import * as api from "./reviews.api";
import * as types from "./reviews.types";

function* getReviewsWorker() {
  try {
    const reviews: Review[] = yield call(api.getReviewsApi);
    yield put(actions.getReviewsSuccess(reviews));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.getReviewsFailed());
  }
}

function* createReviewWorker(action: types.CreateReviewValue) {
  try {
    const review: Review = yield call(api.createReviewApi, action.review);
    yield put(actions.createReviewSuccess(review));
    yield put(showAlert("Отзыв создан"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.createReviewFailed());
  }
}

function* updateReviewWorker(action: types.UpdateReviewValue) {
  try {
    const review: Review = yield call(api.updateReviewApi, action.review);
    yield put(actions.updateReviewSuccess(review));
    yield put(showAlert("Отзыв обновлен"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.updateReviewFailed());
  }
}

function* deleteReviewWorker(action: types.DeleteReviewValue) {
  try {
    yield call(api.deleteReviewApi, action.reviewId);
    yield put(actions.deleteReviewSuccess(action.reviewId));
    yield put(showAlert("Отзыв удален"));
  } catch (error) {
    console.log(error);
    yield put(showAlert("Произошла ошибка" + error));
    yield put(actions.deleteReviewFailed());
  }
}

function* reviewsWatcher() {
  yield takeLatest(constants.GET_REVIEWS, getReviewsWorker);
  yield takeLatest(constants.UPDATE_REVIEW, updateReviewWorker);
  yield takeLatest(constants.CREATE_REVIEW, createReviewWorker);
  yield takeLatest(constants.DELETE_REVIEW, deleteReviewWorker);
}

export default reviewsWatcher;
