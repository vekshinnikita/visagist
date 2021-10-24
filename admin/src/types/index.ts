import { CoursesSections, Pages } from "./enumerates";
import { CourseDetails, Course, Review, StudentWork } from "./models";

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

export interface AlertState {
  message: string;
}

export interface ReviewsState {
  reviews: Review[];
  isGetReviewsLoading: boolean;
  isCreateReviewLoading: boolean;
  isUpdateReviewLoading: boolean;
  isDeleteReviewLoading: boolean;
  isMoveReviewLoading: boolean;
}

export interface StudentWorkState {
  studentsWork: StudentWork[];
  isGetStudentsWorkLoading: boolean;
  isCreateStudentWorkLoading: boolean;
  isUpdateStudentWorkLoading: boolean;
  isDeleteStudentWorkLoading: boolean;
  isMoveStudentWorkLoading: boolean;
}

export interface RootState {
  auth: AuthState;
  courses: CoursesState;
  components: ComponentsState;
  alert: AlertState;
  reviews: ReviewsState;
  studentsWork: StudentWorkState;
}
