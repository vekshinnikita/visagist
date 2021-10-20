import { AlertState } from "@/types";
import * as constants from "./alert.constants";
import { ActionsReturnValues } from "./alert.types";

const initialState: AlertState = {
  message: "",
};

const alertReducer = (
  state = initialState,
  action: ActionsReturnValues
): AlertState => {
  switch (action.type) {
    case constants.SHOW_ALERT:
      return {
        ...state,
        message: action.message,
      };
    case constants.RESET_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
