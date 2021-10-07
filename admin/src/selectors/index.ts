import { RootState } from "@/types";

// Components
export const selectCurrentPage = (state: RootState) => state.components.page;
export const selectCurrentCoursesSection = (state: RootState) =>
  state.components.coursesSection;

// Courses
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectGetCoursesIsLoading = (state: RootState) =>
  state.courses.getCoursesIsLoading;
export const selectCurrentCourse = (state: RootState) =>
  state.courses.currentCourse;
