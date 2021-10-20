import { Pages } from "./entities";
import { Course, CourseDetails } from './models'

export interface ComponentsState {
  currentPage: Pages;
}

export interface CoursesState {
    courses: Course[];
    courseDetail: CourseDetails;
}


export interface RootState {
  courses: CoursesState;
  components: ComponentsState;
}
