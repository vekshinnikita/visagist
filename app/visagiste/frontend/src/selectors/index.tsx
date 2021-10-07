import { RootState } from "@/typing/state";

export const selectCurrentPage = (state: RootState) =>
  state.components.currentPage;
