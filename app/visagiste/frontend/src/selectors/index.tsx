import { RootState } from "@/typing/state";

export const selectCurrentPage = (state: RootState) =>
  state.components.currentPage;

export const selectCourses = (state: RootState) =>
  state.courses.courses;

export const selectCourseDetail = (state: RootState) => 
  state.courses.courseDetail;
