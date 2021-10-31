import { ReviewsState } from "@/types";
import * as types from "./studentsWork.types";
import * as constants from "./studentsWork.constants";
import {
  getFixedDraggableSequence,
  getItemById,
  getItemsListWithoutSpecificOne,
  sortDraggableByPosition,
} from "@/utils";
import { StudentWorkState } from "@/types";
import { StudentWork } from "@/types/models";

const initialState: StudentWorkState = {
  studentsWork: [],
  isGetStudentsWorkLoading: false,
  isCreateStudentWorkLoading: false,
  isDeleteStudentWorkLoading: false,
  isUpdateStudentWorkLoading: false,
  isMoveStudentWorkLoading: false,
};

const studentsWorkReducer = (
  state = initialState,
  action: types.ActionsReturnValues
): StudentWorkState => {
  switch (action.type) {
    case constants.GET_STUDENTS_WORK:
      return {
        ...state,
        isGetStudentsWorkLoading: true,
      };
    case constants.GET_STUDENTS_WORK_SUCCESS:
      return {
        ...state,
        studentsWork: action.studentsWork,
        isGetStudentsWorkLoading: false,
      };
    case constants.GET_STUDENTS_WORK_FAILED:
      return {
        ...state,
        isGetStudentsWorkLoading: false,
      };
    case constants.CREATE_STUDENT_WORK:
      return {
        ...state,
        isCreateStudentWorkLoading: true,
      };
    case constants.CREATE_STUDENT_WORK_SUCCESS:
      state.studentsWork.map((r) => r.position++);

      return {
        ...state,
        studentsWork: [action.studentWork, ...state.studentsWork],
        isCreateStudentWorkLoading: false,
      };
    case constants.CREATE_STUDENT_WORK_FAILED:
      return {
        ...state,
        isCreateStudentWorkLoading: false,
      };
    case constants.MOVE_STUDENT_WORK:
      try {
        const studentsWork: StudentWork[] = getItemsListWithoutSpecificOne(
          state.studentsWork,
          action.studentWork.id
        );
        const oldReview: StudentWork = getItemById(
          state.studentsWork,
          action.studentWork.id
        );

        if (oldReview.position === action.studentWork.position) return state;

        const moved: any = getFixedDraggableSequence(
          state.studentsWork,
          oldReview.position,
          action.studentWork.position
        );

        const others = studentsWork.filter(
          (w) => !moved.map((m: { id: number }) => m.id).includes(w.id)
        );

        return {
          ...state,
          studentsWork: sortDraggableByPosition([
            ...moved,
            ...others,
            action.studentWork,
          ]),
          isMoveStudentWorkLoading: true,
        };
      } catch {
        return state;
      }
    case constants.MOVE_STUDENT_WORK_SUCCESS:
      return {
        ...state,
        isMoveStudentWorkLoading: false,
      };
    case constants.MOVE_STUDENT_WORK_FAILED:
      return {
        ...state,
        isMoveStudentWorkLoading: false,
      };
    case constants.UPDATE_STUDENT_WORK:
      return {
        ...state,
        isUpdateStudentWorkLoading: true,
      };
    case constants.UPDATE_STUDENT_WORK_SUCCESS:
      return {
        ...state,
        studentsWork: sortDraggableByPosition([
          ...state.studentsWork.filter((w) => w.id !== action.studentWork.id),
          action.studentWork,
        ]),
        isUpdateStudentWorkLoading: false,
      };
    case constants.UPDATE_STUDENT_WORK_FAILED:
      return {
        ...state,
        isUpdateStudentWorkLoading: false,
      };
    case constants.DELETE_STUDENT_WORK:
      return {
        ...state,
        isDeleteStudentWorkLoading: true,
      };
    case constants.DELETE_STUDENT_WORK_SUCCESS:
      try {
        const deletedStudentWork: StudentWork = getItemById(
          state.studentsWork,
          action.studentWorkId
        );
        const movedReviews = state.studentsWork.filter(
          (r) => r.id !== action.studentWorkId
        );

        const prevStudentsWork = movedReviews.filter(
          (w) => w.position < deletedStudentWork.position
        );
        const nextStudentsWork = movedReviews.filter(
          (w) => w.position >= deletedStudentWork.position
        );

        nextStudentsWork.map((w) => w.position--);

        return {
          ...state,
          studentsWork: [...prevStudentsWork, ...nextStudentsWork],
          isDeleteStudentWorkLoading: false,
        };
      } catch {
        return state;
      }
    case constants.DELETE_STUDENT_WORK_FAILED:
      return {
        ...state,
        isDeleteStudentWorkLoading: false,
      };
    default:
      return state;
  }
};

export default studentsWorkReducer;
