import { CourseDetails, Widget } from "@/types/models";
import { ActionsReturnValues } from "./widget.types";
import * as constants from "./widget.constants";
import {
  getFixedDraggableSequence,
  getItemById,
  getItemsListWithoutSpecificOne,
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
      const widgetsD: Widget[] = getItemsListWithoutSpecificOne(
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
          ...getItemsListWithoutSpecificOne(
            currentCourse.widgets,
            action.widget.id
          ),
          action.widget,
        ]),
      };

    case constants.MOVE_WIDGET:
      try {
        const widgets: Widget[] = getItemsListWithoutSpecificOne(
          currentCourse.widgets,
          action.widgetId
        );
        const widget: Widget = getItemById(
          currentCourse.widgets,
          action.widgetId
        );

        if (widget.position === action.position) return currentCourse;

        const moved: any = getFixedDraggableSequence(
          widgets,
          widget.position,
          action.position
        );

        const others = widgets.filter(
          (w) => !moved.map((m: { id: number }) => m.id).includes(w.id)
        );

        widget.position = action.position;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([...moved, ...others, widget]),
        };
      } catch {
        return currentCourse;
      }

    case constants.HIDE_WIDGET:
      try {
        const widget: Widget = getItemById(
          currentCourse.widgets,
          action.widgetId
        );
        widget.is_visible = false;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([
            ...getItemsListWithoutSpecificOne(
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
        const widget: Widget = getItemById(
          currentCourse.widgets,
          action.widgetId
        );
        widget.is_visible = true;

        return {
          ...currentCourse,
          widgets: sortDraggableByPosition([
            ...getItemsListWithoutSpecificOne(
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
