import { combineReducers } from "redux";
import componentsReducer from "./components/components.reducer";
import coursesReducer from "./courses/courses.reducer";

const rootReducer = combineReducers({
  courses: coursesReducer,
  components: componentsReducer,
});

export default rootReducer;
