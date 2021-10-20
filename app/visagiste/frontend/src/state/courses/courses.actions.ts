import * as constants from "./courses.constants";
import * as types from "./courses.types"

export const getCourses: types.GetCourse = (courses) => ({
  type: constants.GET_COURSES,
  courses
});

export const featchCourses: types.FeatchCourse = () => ({
  type: constants.FEATCH_COURSES
})

export const getCourseDetail: types.GetCourseDetail = (courseDetail) => ({
  type: constants.GET_COURSE_DETAIL,
  courseDetail
})

export const featchCourseDetail: types.FeatchCourseDetail = (pk) => ({
  type: constants.FEATCH_COURSE_DETAIL,
  pk
})

