import { ComponentsState } from "@/types";
import { CoursesSections, Pages } from "@/types/enumerates";
import * as constants from "./components.constants";
import { ActionsReturnValues } from "./components.types";

const initialState: ComponentsState = {
  page: Pages.INIT,
  coursesSection: CoursesSections.INIT,
  isDraggingWidget: false,
};

const componentsReducer = (
  state = initialState,
  action: ActionsReturnValues
): ComponentsState => {
  switch (action.type) {
    case constants.HIGHLIGHT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case constants.HIGHLIGHT_COURSES_SECTION:
      return {
        ...state,
        coursesSection: action.section,
      };
    case constants.SET_IS_DRAGGING_WIDGET:
      return {
        ...state,
        isDraggingWidget: action.isDragging,
      };
    default:
      return state;
  }
};

export default componentsReducer;
