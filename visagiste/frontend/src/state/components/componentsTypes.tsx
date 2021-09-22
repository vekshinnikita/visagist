import { Pages } from "@/typing/entities";
import { SET_CURRENT_PAGE } from "./componentsConstants";

export type SetCurrentPageReturnValue = {
  type: typeof SET_CURRENT_PAGE;
  page: Pages;
};

export type SetCurrentPage = (page: Pages) => SetCurrentPageReturnValue;

export type ActionsReturnValues = SetCurrentPageReturnValue;
