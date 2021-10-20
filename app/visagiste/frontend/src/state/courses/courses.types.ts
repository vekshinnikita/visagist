import * as constants from "./courses.constants";
import { Course, CourseDetails } from "@/typing/models";
 
export type GetCourse = (courses: Course[]) => GetCourseValue;
export type FeatchCourse = () => FeatchCourseValue

export type GetCourseDetail = (courseDetail: CourseDetails) => GetCourseDetailValue
export type FeatchCourseDetail = (pk: number) => FeatchCourseDetailValue

export type GetCourseDetailValueSaga = {
  type: typeof constants.GET_COURSE_DETAIL;
  pk: number;
};

type GetCourseDetailValue = {
  type: typeof constants.GET_COURSE_DETAIL;
  courseDetail: CourseDetails;
}

type GetCourseValue = {
  type: typeof constants.GET_COURSES;
  courses: Course[];
};

type FeatchCourseValue = {
  type: typeof constants.FEATCH_COURSES;
};

type FeatchCourseDetailValue = {
  type: typeof constants.FEATCH_COURSE_DETAIL;
  pk: number;
};





export type CoursesAction =
  | GetCourseDetailValue
  | GetCourseValue
  | FeatchCourseValue

