import { Course, CourseDetails } from "@/types/models";
import * as constants from "./courses.constants";

export type GetCoursesValue = {
  type: typeof constants.GET_COURSES;
};
type GetCoursesSuccessValue = {
  type: typeof constants.GET_COURSES_SUCCESS;
  courses: Course[];
};
type GetCoursesFailedValue = {
  type: typeof constants.GET_COURSES_FAILED;
};

export type GetCourses = () => GetCoursesValue;
export type GetCourseSuccess = (courses: Course[]) => GetCoursesSuccessValue;
export type GetCoursesFailed = () => GetCoursesFailedValue;

export type GetCurrentCourseValue = {
  type: typeof constants.GET_CURRENT_COURSE;
  pk: number;
};
type GetCurrentCourseSuccessValue = {
  type: typeof constants.GET_CURRENT_COURSE_SUCCESS;
  currentCourse: CourseDetails;
};
type GetCurrentCourseFailedValue = {
  type: typeof constants.GET_CURRENT_COURSE_FAILED;
};

export type GetCurrentCourse = (pk: number) => GetCurrentCourseValue;
export type GetCurrentCourseSuccess = (
  currentCourse: CourseDetails
) => GetCurrentCourseSuccessValue;
export type GetCurrentCourseFailed = () => GetCurrentCourseFailedValue;

export type CreateCourseValue = {
  type: typeof constants.CREATE_COURSE;
  course: CourseDetails;
};
type CreateCourseSuccessValue = {
  type: typeof constants.CREATE_COURSE_SUCCESS;
  course: CourseDetails;
};
type CreateCourseFailedValue = {
  type: typeof constants.CREATE_COURSE_FAILED;
};

export type CreateCourse = (course: CourseDetails) => CreateCourseValue;
export type CreateCourseSuccess = (
  course: CourseDetails
) => CreateCourseSuccessValue;
export type CreateCourseFailed = () => CreateCourseFailedValue;

export type UpdateCourseValue = {
  type: typeof constants.UPDATE_COURSE;
  course: CourseDetails;
};
type UpdateCourseSuccessValue = {
  type: typeof constants.UPDATE_COURSE_SUCCESS;
};
type UpdateCourseFailedValue = {
  type: typeof constants.UPDATE_COURSE_FAILED;
};

export type UpdateCourse = (course: CourseDetails) => UpdateCourseValue;
export type UpdateCourseSuccess = () => UpdateCourseSuccessValue;
export type UpdateCourseFailed = () => UpdateCourseFailedValue;

export type DeleteCourseValue = {
  type: typeof constants.DELETE_COURSE;
  pk: number;
};
type DeleteCourseSuccessValue = {
  type: typeof constants.DELETE_COURSE_SUCCESS;
};
type DeleteCourseFailedValue = {
  type: typeof constants.DELETE_COURSE_FAILED;
};

export type DeleteCourse = (pk: number) => DeleteCourseValue;
export type DeleteCourseSuccess = () => DeleteCourseSuccessValue;
export type DeleteCourseFailed = () => DeleteCourseFailedValue;

export type HideCoursesValue = {
  type: typeof constants.HIDE_COURSES;
  ids: number[];
};
type HideCoursesSuccessValue = {
  type: typeof constants.HIDE_COURSES_SUCCESS;
  ids: number[];
};
type HideCoursesFailedValue = {
  type: typeof constants.HIDE_COURSES_FAILED;
};

export type HideCourses = (ids: number[]) => HideCoursesValue;
export type HideCoursesSuccess = (ids: number[]) => HideCoursesSuccessValue;
export type HideCoursesFailed = () => HideCoursesFailedValue;

export type RevealCoursesValue = {
  type: typeof constants.REVEAL_COURSES;
  ids: number[];
};
type RevealCoursesSuccessValue = {
  type: typeof constants.REVEAL_COURSES_SUCCESS;
  ids: number[];
};
type RevealCoursesFailedValue = {
  type: typeof constants.REVEAL_COURSES_FAILED;
};

export type RevealCourses = (ids: number[]) => RevealCoursesValue;
export type RevealCoursesSuccess = (ids: number[]) => RevealCoursesSuccessValue;
export type RevealCoursesFailed = () => RevealCoursesFailedValue;

export type DeleteCoursesValue = {
  type: typeof constants.DELETE_COURSES;
  ids: number[];
};
type DeleteCoursesSuccessValue = {
  type: typeof constants.DELETE_COURSES_SUCCESS;
  ids: number[];
};
type DeleteCoursesFailedValue = {
  type: typeof constants.DELETE_COURSES_FAILED;
};

export type DeleteCourses = (ids: number[]) => DeleteCoursesValue;
export type DeleteCoursesSuccess = (ids: number[]) => DeleteCoursesSuccessValue;
export type DeleteCoursesFailed = () => DeleteCoursesFailedValue;

export type ActionsReturnValues =
  | GetCoursesValue
  | GetCoursesSuccessValue
  | GetCoursesFailedValue
  | GetCurrentCourseValue
  | GetCurrentCourseSuccessValue
  | GetCurrentCourseFailedValue
  | CreateCourseValue
  | CreateCourseSuccessValue
  | CreateCourseFailedValue
  | UpdateCourseValue
  | UpdateCourseSuccessValue
  | UpdateCourseFailedValue
  | DeleteCourseValue
  | DeleteCourseSuccessValue
  | DeleteCourseFailedValue
  | HideCoursesValue
  | HideCoursesSuccessValue
  | HideCoursesFailedValue
  | RevealCoursesValue
  | RevealCoursesSuccessValue
  | RevealCoursesFailedValue
  | DeleteCoursesValue
  | DeleteCoursesSuccessValue
  | DeleteCoursesFailedValue;
