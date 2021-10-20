import * as constants from "./components.constants";
import * as types from "./components.types";

export const highlightPage: types.HighlightPage = (page) => ({
  type: constants.HIGHLIGHT_PAGE,
  page,
});

export const highlightCourseSection: types.HighlightCoursesSection = (
  section
) => ({
  type: constants.HIGHLIGHT_COURSES_SECTION,
  section,
});

export const setIsDraggingWidget: types.SetIsDraggingWidget = (isDragging) => ({
  type: constants.SET_IS_DRAGGING_WIDGET,
  isDragging,
});
