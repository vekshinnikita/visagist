import * as constants from "./alert.constants";

export type ShowAlertValue = {
  type: typeof constants.SHOW_ALERT;
  message: string;
};

export type ShowAlert = (message: string) => ShowAlertValue;

export type ResetAlertValue = {
  type: typeof constants.RESET_ALERT;
};

export type ResetAlert = () => ResetAlertValue;

export type ActionsReturnValues = ShowAlertValue | ResetAlertValue;
