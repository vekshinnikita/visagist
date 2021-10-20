import { CoursesState } from '@/typing/state'
import * as types from './courses.types'
import { Course, CourseDetails } from '@/typing/models'
import * as constants from "./courses.constants";


const initialState: CoursesState = {
    courses: [] as Course[],
    courseDetail: {} as CourseDetails
}

const coursesReducer = (state = initialState, action: types.CoursesAction): CoursesState  => {
    switch (action.type) {
        case constants.GET_COURSES:
            return {...state, courses: action.courses}
        case constants.GET_COURSE_DETAIL:
            return {...state, courseDetail: action.courseDetail}
        default: return state
    }
}
export default coursesReducer;