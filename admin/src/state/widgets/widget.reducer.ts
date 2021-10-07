import { CourseDetails } from "@/types/models";
import { ActionsReturnValues } from "./widget.types";
import * as constants from "./widget.constants";
import {
  getWidget,
  getWidgetsListWithoutSpecificOne,
  sortDraggableByPosition,
} from "@/utils";

const widgetReducer = (
  currentCourse: CourseDetails,
  action: ActionsReturnValues
): CourseDetails => {
  switch (action.type) {
    case constants.CREATE_WIDGET:
      return {
        ...currentCourse,
        widgets: sortDraggableByPosition([
          ...currentCourse.widgets,
          action.widget,
        ]),
      };
    case constants.DELETE_WIDGET:
      return {
        ...currentCourse,
        widgets: sortDraggableByPosition(
          getWidgetsListWithoutSpecificOne(
            currentCourse.widgets,
            action.widgetId
          )
        ),
      };
    case constants.UPDATE_WIDGET:
      return {
        ...currentCourse,
        widgets: sortDraggableByPosition([
          ...getWidgetsListWithoutSpecificOne(
            currentCourse.widgets,
            action.widget.id
          ),
          action.widget,
        ]),
      };

    case constants.MOVE_WIDGET:
      try {
        const widget = getWidget(currentCourse.widgets, action.widgetId);
        widget.position = action.position;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([
            ...getWidgetsListWithoutSpecificOne(
              currentCourse.widgets,
              action.widgetId
            ),
            widget,
          ]),
        };
      } catch {
        return currentCourse;
      }
    case constants.HIDE_WIDGET:
      try {
        const widget = getWidget(currentCourse.widgets, action.widgetId);
        widget.is_visible = false;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([
            ...getWidgetsListWithoutSpecificOne(
              currentCourse.widgets,
              action.widgetId
            ),
            widget,
          ]),
        };
      } catch {
        return currentCourse;
      }
    case constants.REVEAL_WIDGET:
      try {
        const widget = getWidget(currentCourse.widgets, action.widgetId);
        widget.is_visible = true;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([
            ...getWidgetsListWithoutSpecificOne(
              currentCourse.widgets,
              action.widgetId
            ),
            widget,
          ]),
        };
      } catch {
        return currentCourse;
      }
    default:
      return currentCourse;
  }
};

export default widgetReducer;
