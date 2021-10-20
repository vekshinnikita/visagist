import { combineReducers } from "redux";
import coursesReducer from './courses/courses.reducer'
import componentsReducer from "./components/componentsReducer";


const rootReducer = combineReducers({
  components: componentsReducer,
  courses: coursesReducer,
});

export default rootReducer;
