import * as constants from "./alert.constants";
import * as types from "./alert.types";

export const showAlert: types.ShowAlert = (message) => ({
  type: constants.SHOW_ALERT,
  message,
});

export const resetAlert: types.ResetAlert = () => ({
  type: constants.RESET_ALERT,
});
