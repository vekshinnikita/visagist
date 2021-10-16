import { CourseDetails, Widget } from "@/types/models";
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
      const prevWidgetsC = currentCourse.widgets.filter(
        (w) => w.position < action.widget.position
      );
      const nextWidgetsC = currentCourse.widgets.filter(
        (w) => w.position >= action.widget.position
      );

      nextWidgetsC.map((w) => w.position++);

      return {
        ...currentCourse,
        widgets: [...prevWidgetsC, action.widget, ...nextWidgetsC],
      };
    case constants.DELETE_WIDGET:
      const widgetsD = getWidgetsListWithoutSpecificOne(
        currentCourse.widgets,
        action.widget.id
      );

      const prevWidgetsD = widgetsD.filter(
        (w) => w.position < action.widget.position
      );
      const nextWidgetsD = widgetsD.filter(
        (w) => w.position >= action.widget.position
      );

      nextWidgetsD.map((w) => w.position--);

      return {
        ...currentCourse,
        widgets: [...prevWidgetsD, ...nextWidgetsD],
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
        const widgetsM = getWidgetsListWithoutSpecificOne(
          currentCourse.widgets,
          action.widgetId
        );
        const widgetM = getWidget(currentCourse.widgets, action.widgetId);
        let moved: Widget[] = [];

        if (action.position < widgetM.position) {
          moved = widgetsM.filter(
            (w) =>
              w.position >= action.position && w.position < widgetM.position
          );
          moved.map((w) => w.position++);
        } else if (action.position > widgetM.position) {
          moved = widgetsM.filter(
            (w) =>
              w.position <= action.position && w.position > widgetM.position
          );
          moved.map((w) => w.position--);
        } else {
          return currentCourse;
        }

        const others = widgetsM.filter(
          (w) => !moved.map((m) => m.id).includes(w.id)
        );

        widgetM.position = action.position;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([...moved, ...others, widgetM]),
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
