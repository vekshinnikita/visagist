import * as constants from "./studentsWork.constants";
import * as types from "./studentsWork.types";

export const getStudentsWork: types.GetStudentsWork = () => ({
  type: constants.GET_STUDENTS_WORK,
});

export const getStudentsWorkSuccess: types.GetStudentsWorkSuccess = (
  studentsWork
) => ({
  type: constants.GET_STUDENTS_WORK_SUCCESS,
  studentsWork,
});

export const getStudentsWorkFailed: types.GetStudentsWorkFailed = () => ({
  type: constants.GET_STUDENTS_WORK_FAILED,
});

export const updateStudentWork: types.UpdateStudentWork = (studentWork) => ({
  type: constants.UPDATE_STUDENT_WORK,
  studentWork,
});

export const updateStudentWorkSuccess: types.UpdateStudentWorkSuccess = (
  studentWork
) => ({
  type: constants.UPDATE_STUDENT_WORK_SUCCESS,
  studentWork,
});

export const updateStudentWorkFailed: types.UpdateStudentWorkFailed = () => ({
  type: constants.UPDATE_STUDENT_WORK_FAILED,
});

export const createStudentWork: types.CreateStudentWork = (studentWork) => ({
  type: constants.CREATE_STUDENT_WORK,
  studentWork,
});

export const createStudentWorkSuccess: types.CreateStudentWorkSuccess = (
  studentWork
) => ({
  type: constants.CREATE_STUDENT_WORK_SUCCESS,
  studentWork,
});

export const createStudentWorkFailed: types.CreateStudentWorkFailed = () => ({
  type: constants.CREATE_STUDENT_WORK_FAILED,
});

export const deleteStudentWork: types.DeleteStudentWork = (studentWorkId) => ({
  type: constants.DELETE_STUDENT_WORK,
  studentWorkId,
});

export const deleteStudentWorkSuccess: types.DeleteStudentWorkSuccess = (
  studentWorkId
) => ({
  type: constants.DELETE_STUDENT_WORK_SUCCESS,
  studentWorkId,
});

export const deleteStudentWorkFailed: types.DeleteStudentWorkFailed = () => ({
  type: constants.DELETE_STUDENT_WORK_FAILED,
});

export const moveStudentWork: types.MoveStudentWork = (studentWork) => ({
  type: constants.MOVE_STUDENT_WORK,
  studentWork,
});

export const moveStudentWorkSuccess: types.MoveStudentWorkSuccess = (
  studentWork
) => ({
  type: constants.MOVE_STUDENT_WORK_SUCCESS,
  studentWork,
});

export const moveStudentWorkFailed: types.MoveStudentWorkFailed = () => ({
  type: constants.MOVE_STUDENT_WORK_FAILED,
});
