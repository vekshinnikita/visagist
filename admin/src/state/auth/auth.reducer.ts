import { AuthState } from "@/types";
import { getAccessToken } from "@/utils";
import * as constants from "./auth.constants";
import { ActionsReturnValues } from "./auth.types";

const initialState: AuthState = {
  isAuth: getAccessToken() ? true : false,
  isLoading: false,
};

const authReducer = (state = initialState, action: ActionsReturnValues) => {
  switch (action.type) {
    case constants.SIGN_IN:
      return {
        ...state,
        isLoading: true,
      };
    case constants.SIGN_IN_SUCCESS:
      return {
        isAuth: true,
        isLoading: false,
      };
    case constants.SIGN_IN_FAILED:
      return {
        isAuth: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
