import { combineReducers } from "redux";
import componentsReducer from "./components/componentsReducer";

const rootReducer = combineReducers({
  components: componentsReducer,
});

export default rootReducer;
