import { CoursesSections, Pages } from "./enumerates";
import { CourseDetails, Course } from "./models";

export interface CoursesState {
  currentCourse: CourseDetails;
  courses: Course[];
  getCoursesIsLoading: boolean;
  getCurrentCourseIsLoading: boolean;
  createCourseIsLoading: boolean;
  updateCourseIsLoading: boolean;
  deleteCourseIsLoading: boolean;
  bulkActionsIsLoading: boolean;
}

export interface ComponentsState {
  page: Pages;
  coursesSection: CoursesSections;
}

export interface RootState {
  courses: CoursesState;
  components: ComponentsState;
}
