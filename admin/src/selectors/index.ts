import { RootState } from "@/types";

// Components
export const selectCurrentPage = (state: RootState) => state.components.page;
export const selectCurrentCoursesSection = (state: RootState) =>
  state.components.coursesSection;
export const selectIsDraggingWidget = (state: RootState) =>
  state.components.isDraggingWidget;

// Courses
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectGetCoursesIsLoading = (state: RootState) =>
  state.courses.getCoursesIsLoading;
export const selectCurrentCourse = (state: RootState) =>
  state.courses.currentCourse;
export const selectCurrentCourseWidgets = (state: RootState) =>
  state.courses.currentCourse.widgets;
