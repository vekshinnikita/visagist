import { CoursesSections, Pages, WidgetTypes } from "./enumerates";
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
  isDraggingWidget: boolean;
}

export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
}

export interface RootState {
  auth: AuthState;
  courses: CoursesState;
  components: ComponentsState;
}
