import { combineReducers } from "redux";
import alertReducer from "./alert/alert.reducer";
import authReducer from "./auth/auth.reducer";
import componentsReducer from "./components/components.reducer";
import coursesReducer from "./courses/courses.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  components: componentsReducer,
  alert: alertReducer,
});

export default rootReducer;
