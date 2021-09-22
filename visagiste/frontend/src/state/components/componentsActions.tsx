import { SET_CURRENT_PAGE } from "./componentsConstants";
import { SetCurrentPage } from "./componentsTypes";

export const setCurrentPage: SetCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  page: page,
});
