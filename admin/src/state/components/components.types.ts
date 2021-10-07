import { CoursesSections, Pages } from "@/types/enumerates";
import * as constants from "./components.constants";

type HighlightPageValue = {
  type: typeof constants.HIGHLIGHT_PAGE;
  page: Pages;
};

type HighlightCoursesSectionValue = {
  type: typeof constants.HIGHLIGHT_COURSES_SECTION;
  section: CoursesSections;
};

export type HighlightPage = (page: Pages) => HighlightPageValue;
export type HighlightCoursesSection = (
  section: CoursesSections
) => HighlightCoursesSectionValue;

export type ActionsReturnValues =
  | HighlightPageValue
  | HighlightCoursesSectionValue;
