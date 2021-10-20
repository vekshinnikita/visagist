import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as api from "./auth.api";
import * as actions from "./auth.actions";
import * as constants from "./auth.constants";
import { SignInValue } from "./auth.types";

function* signInWorker(action: SignInValue) {
  try {
    yield call(api.signInApi, action.signInData);
    yield put(actions.signInSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.signInFailed());
  }
}

function* authWatcher() {
  yield takeLatest(constants.SIGN_IN, signInWorker);
}

export default authWatcher;
