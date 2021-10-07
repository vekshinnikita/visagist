import * as types from "./courses.types";
import * as constants from "./courses.constants";

export const getCourses: types.GetCourses = () => ({
  type: constants.GET_COURSES,
});
export const getCoursesSuccess: types.GetCourseSuccess = (courses) => ({
  type: constants.GET_COURSES_SUCCESS,
  courses,
});
export const getCoursesFailed: types.GetCoursesFailed = () => ({
  type: constants.GET_COURSES_FAILED,
});

export const getCurrentCourse: types.GetCurrentCourse = (pk) => ({
  type: constants.GET_CURRENT_COURSE,
  pk,
});
export const getCurrentCourseSuccess: types.GetCurrentCourseSuccess = (
  course
) => ({
  type: constants.GET_CURRENT_COURSE_SUCCESS,
  currentCourse: course,
});
export const getCurrentCourseFailed: types.GetCurrentCourseFailed = () => ({
  type: constants.GET_CURRENT_COURSE_FAILED,
});

export const createCourse: types.CreateCourse = (course) => ({
  type: constants.CREATE_COURSE,
  course,
});
export const createCourseSuccess: types.CreateCourseSuccess = (course) => ({
  type: constants.CREATE_COURSE_SUCCESS,
  course,
});
export const createCourseFailed: types.CreateCourseFailed = () => ({
  type: constants.CREATE_COURSE_FAILED,
});

export const updateCourse: types.UpdateCourse = (course) => ({
  type: constants.UPDATE_COURSE,
  course,
});
export const updateCourseSuccess: types.UpdateCourseSuccess = () => ({
  type: constants.UPDATE_COURSE_SUCCESS,
});
export const updateCourseFailed: types.UpdateCourseFailed = () => ({
  type: constants.UPDATE_COURSE_FAILED,
});

export const deleteCourse: types.DeleteCourse = (pk) => ({
  type: constants.DELETE_COURSE,
  pk,
});
export const deleteCourseSuccess: types.DeleteCourseSuccess = () => ({
  type: constants.DELETE_COURSE_SUCCESS,
});
export const deleteCourseFailed: types.DeleteCourseFailed = () => ({
  type: constants.DELETE_COURSE_FAILED,
});

export const hideCourses: types.HideCourses = (ids) => ({
  type: constants.HIDE_COURSES,
  ids,
});
export const hideCoursesSuccess: types.HideCoursesSuccess = (ids) => ({
  type: constants.HIDE_COURSES_SUCCESS,
  ids,
});
export const hideCoursesFailed: types.HideCoursesFailed = () => ({
  type: constants.HIDE_COURSES_FAILED,
});

export const revealCourses: types.RevealCourses = (ids) => ({
  type: constants.REVEAL_COURSES,
  ids,
});
export const revealCoursesSuccess: types.RevealCoursesSuccess = (ids) => ({
  type: constants.REVEAL_COURSES_SUCCESS,
  ids,
});
export const revealCoursesFailed: types.RevealCoursesFailed = () => ({
  type: constants.REVEAL_COURSES_FAILED,
});

export const deleteCourses: types.DeleteCourses = (ids) => ({
  type: constants.DELETE_COURSES,
  ids,
});
export const deleteCoursesSuccess: types.DeleteCoursesSuccess = (ids) => ({
  type: constants.DELETE_COURSES_SUCCESS,
  ids,
});
export const deleteCoursesFailed: types.DeleteCoursesFailed = () => ({
  type: constants.DELETE_COURSES_FAILED,
});
