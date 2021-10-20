import * as constants from "./auth.constants";
import * as types from "./auth.types";

export const signIn: types.SignIn = (signInData) => ({
  type: constants.SIGN_IN,
  signInData,
});

export const signInSuccess: types.SignInSuccess = () => ({
  type: constants.SIGN_IN_SUCCESS,
});

export const signInFailed: types.SignInFailed = () => ({
  type: constants.SIGN_IN_FAILED,
});
