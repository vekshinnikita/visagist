import { Pages } from "./entities";

export interface ComponentsState {
  currentPage: Pages;
}

export interface RootState {
  components: ComponentsState;
}
