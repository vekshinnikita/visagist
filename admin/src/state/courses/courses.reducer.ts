import { CoursesState } from "@/types";
import { Course, CourseDetails } from "@/types/models";
import widgetReducer from "../widgets/widget.reducer";
import { ActionsReturnValues } from "./courses.types";
import * as constants from "./courses.constants";

const initialState: CoursesState = {
  currentCourse: {} as CourseDetails,
  courses: [] as Course[],
  getCoursesIsLoading: false,
  getCurrentCourseIsLoading: false,
  createCourseIsLoading: false,
  updateCourseIsLoading: false,
  deleteCourseIsLoading: false,
  bulkActionsIsLoading: false,
};

const coursesReducer = (
  state = initialState,
  action: ActionsReturnValues
): CoursesState => {
  switch (action.type) {
    case constants.GET_COURSES:
      return {
        ...state,
        getCoursesIsLoading: true,
      };
    case constants.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        getCoursesIsLoading: false,
      };
    case constants.GET_COURSES_FAILED:
      return {
        ...state,
        getCoursesIsLoading: false,
      };

    case constants.GET_CURRENT_COURSE:
      return {
        ...state,
        getCurrentCourseIsLoading: true,
      };
    case constants.GET_CURRENT_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.currentCourse,
        getCurrentCourseIsLoading: false,
      };
    case constants.GET_CURRENT_COURSE_FAILED:
      return {
        ...state,
        getCurrentCourseIsLoading: false,
      };

    case constants.CREATE_COURSE:
      return {
        ...state,
        createCourseIsLoading: true,
      };
    case constants.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        createCourseIsLoading: false,
        courses: [...state.courses, action.course],
      };
    case constants.CREATE_COURSE_FAILED:
      return {
        ...state,
        createCourseIsLoading: false,
      };

    case constants.UPDATE_COURSE:
      return {
        ...state,
        updateCourseIsLoading: true,
      };
    case constants.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        updateCourseIsLoading: false,
      };
    case constants.UPDATE_COURSE_FAILED:
      return {
        ...state,
        updateCourseIsLoading: false,
      };

    case constants.DELETE_COURSE:
      return {
        ...state,
        deleteCourseIsLoading: true,
      };
    case constants.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        deleteCourseIsLoading: false,
      };
    case constants.DELETE_COURSE_FAILED:
      return {
        ...state,
        deleteCourseIsLoading: false,
      };
    case constants.HIDE_COURSES:
      return {
        ...state,
        bulkActionsIsLoading: true,
      };
    case constants.HIDE_COURSES_SUCCESS:
      return {
        ...state,
        bulkActionsIsLoading: false,
        courses: state.courses.map((course) =>
          action.ids.find((id) => id === course.id) !== undefined
            ? { ...course, is_visible: false }
            : course
        ),
      };
    case constants.HIDE_COURSES_FAILED:
      return {
        ...state,
        bulkActionsIsLoading: false,
      };
    case constants.REVEAL_COURSES:
      return {
        ...state,
        bulkActionsIsLoading: true,
      };
    case constants.REVEAL_COURSES_SUCCESS:
      return {
        ...state,
        bulkActionsIsLoading: false,
        courses: state.courses.map((course) =>
          action.ids.find((id) => id === course.id) !== undefined
            ? { ...course, is_visible: true }
            : course
        ),
      };
    case constants.REVEAL_COURSES_FAILED:
      return {
        ...state,
        bulkActionsIsLoading: false,
      };
    case constants.DELETE_COURSES:
      return {
        ...state,
        bulkActionsIsLoading: true,
      };
    case constants.DELETE_COURSES_SUCCESS:
      return {
        ...state,
        bulkActionsIsLoading: false,
        courses: state.courses.filter(
          (course) => action.ids.find((id) => id === course.id) === undefined
        ),
      };
    case constants.DELETE_COURSES_FAILED:
      return {
        ...state,
        bulkActionsIsLoading: false,
      };

    default:
      return {
        ...state,
        currentCourse: widgetReducer(state.currentCourse, action),
      };
  }
};

export default coursesReducer;
