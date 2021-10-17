import { SignInData } from "@/types/models";
import * as constants from "./auth.constants";

export type SignInValue = {
  type: typeof constants.SIGN_IN;
  signInData: SignInData;
};

export type SignInSuccessValue = {
  type: typeof constants.SIGN_IN_SUCCESS;
};

export type SignInFailedValue = {
  type: typeof constants.SIGN_IN_FAILED;
};

export type SignIn = (signInData: SignInData) => SignInValue;

export type SignInSuccess = () => SignInSuccessValue;
export type SignInFailed = () => SignInFailedValue;

export type ActionsReturnValues =
  | SignInValue
  | SignInSuccessValue
  | SignInFailedValue;
