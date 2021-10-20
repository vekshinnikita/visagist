import { RootState } from "@/types";

// Alert
export const selectAlertMessage = (state: RootState) => state.alert.message;

// Auth
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;

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
export const selectIsCourseCreateLoading = (state: RootState) =>
  state.courses.createCourseIsLoading;
export const selectIsBulkActionsLoading = (state: RootState) =>
  state.courses.bulkActionsIsLoading;
export const selectIsUpdateCourseLoading = (state: RootState) =>
  state.courses.updateCourseIsLoading;
