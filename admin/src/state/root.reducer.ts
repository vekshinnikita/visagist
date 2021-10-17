import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import componentsReducer from "./components/components.reducer";
import coursesReducer from "./courses/courses.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  components: componentsReducer,
});

export default rootReducer;
