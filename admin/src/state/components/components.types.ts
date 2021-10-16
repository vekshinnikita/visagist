import { CoursesSections, Pages, WidgetTypes } from "@/types/enumerates";
import * as constants from "./components.constants";

type HighlightPageValue = {
  type: typeof constants.HIGHLIGHT_PAGE;
  page: Pages;
};

type HighlightCoursesSectionValue = {
  type: typeof constants.HIGHLIGHT_COURSES_SECTION;
  section: CoursesSections;
};

type SetIsDraggingWidgetValue = {
  type: typeof constants.SET_IS_DRAGGING_WIDGET;
  isDragging: boolean;
};

export type HighlightPage = (page: Pages) => HighlightPageValue;
export type HighlightCoursesSection = (
  section: CoursesSections
) => HighlightCoursesSectionValue;
export type SetIsDraggingWidget = (
  isDragging: boolean
) => SetIsDraggingWidgetValue;

export type ActionsReturnValues =
  | HighlightPageValue
  | HighlightCoursesSectionValue
  | SetIsDraggingWidgetValue;
