import { Pages } from "@/typing/entities";
import { ComponentsState } from "@/typing/state";
import { SET_CURRENT_PAGE } from "./componentsConstants";
import { ActionsReturnValues } from "./componentsTypes";

const initialState: ComponentsState = {
  currentPage: Pages.HOME,
};

const componentsReducer = (
  state = initialState,
  action: ActionsReturnValues
): ComponentsState => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
};

export default componentsReducer;
