import { StudentWork } from "@/types/models";
import * as constants from "./studentsWork.constants";

export type GetStudentsWorkValue = {
  type: typeof constants.GET_STUDENTS_WORK;
};

export type GetStudentsWorkSuccessValue = {
  type: typeof constants.GET_STUDENTS_WORK_SUCCESS;
  studentsWork: StudentWork[];
};

export type GetStudentsWorkFailedValue = {
  type: typeof constants.GET_STUDENTS_WORK_FAILED;
};

export type GetStudentsWork = () => GetStudentsWorkValue;
export type GetStudentsWorkSuccess = (
  studentsWork: StudentWork[]
) => GetStudentsWorkSuccessValue;
export type GetStudentsWorkFailed = () => GetStudentsWorkFailedValue;

export type UpdateStudentWorkValue = {
  type: typeof constants.UPDATE_STUDENT_WORK;
  studentWork: StudentWork;
};

export type UpdateStudentWorkSuccessValue = {
  type: typeof constants.UPDATE_STUDENT_WORK_SUCCESS;
  studentWork: StudentWork;
};

export type UpdateStudentWorkFailedValue = {
  type: typeof constants.UPDATE_STUDENT_WORK_FAILED;
};

export type UpdateStudentWork = (
  studentWork: StudentWork
) => UpdateStudentWorkValue;
export type UpdateStudentWorkSuccess = (
  studentWork: StudentWork
) => UpdateStudentWorkSuccessValue;
export type UpdateStudentWorkFailed = () => UpdateStudentWorkFailedValue;

export type CreateStudentWorkValue = {
  type: typeof constants.CREATE_STUDENT_WORK;
  studentWork: StudentWork;
};

export type CreateStudentWorkSuccessValue = {
  type: typeof constants.CREATE_STUDENT_WORK_SUCCESS;
  studentWork: StudentWork;
};

export type CreateStudentWorkFailedValue = {
  type: typeof constants.CREATE_STUDENT_WORK_FAILED;
};

export type CreateStudentWork = (
  studentWork: StudentWork
) => CreateStudentWorkValue;
export type CreateStudentWorkSuccess = (
  studentWork: StudentWork
) => CreateStudentWorkSuccessValue;
export type CreateStudentWorkFailed = () => CreateStudentWorkFailedValue;

export type DeleteStudentWorkValue = {
  type: typeof constants.DELETE_STUDENT_WORK;
  studentWorkId: number;
};

export type DeleteStudentWorkSuccessValue = {
  type: typeof constants.DELETE_STUDENT_WORK_SUCCESS;
  studentWorkId: number;
};

export type DeleteStudentWorkFailedValue = {
  type: typeof constants.DELETE_STUDENT_WORK_FAILED;
};

export type DeleteStudentWork = (
  studentWorkId: number
) => DeleteStudentWorkValue;
export type DeleteStudentWorkSuccess = (
  studentWorkId: number
) => DeleteStudentWorkSuccessValue;
export type DeleteStudentWorkFailed = () => DeleteStudentWorkFailedValue;

export type MoveStudentWorkValue = {
  type: typeof constants.MOVE_STUDENT_WORK;
  studentWork: StudentWork;
};

export type MoveStudentWorkSuccessValue = {
  type: typeof constants.MOVE_STUDENT_WORK_SUCCESS;
  studentWork: StudentWork;
};

export type MoveStudentWorkFailedValue = {
  type: typeof constants.MOVE_STUDENT_WORK_FAILED;
};

export type MoveStudentWork = (
  studentWork: StudentWork
) => MoveStudentWorkValue;
export type MoveStudentWorkSuccess = (
  studentWork: StudentWork
) => MoveStudentWorkSuccessValue;
export type MoveStudentWorkFailed = () => MoveStudentWorkFailedValue;

export type ActionsReturnValues =
  | GetStudentsWorkValue
  | GetStudentsWorkSuccessValue
  | GetStudentsWorkFailedValue
  | UpdateStudentWorkValue
  | UpdateStudentWorkSuccessValue
  | UpdateStudentWorkFailedValue
  | CreateStudentWorkValue
  | CreateStudentWorkSuccessValue
  | CreateStudentWorkFailedValue
  | DeleteStudentWorkValue
  | DeleteStudentWorkSuccessValue
  | DeleteStudentWorkFailedValue
  | MoveStudentWorkValue
  | MoveStudentWorkSuccessValue
  | MoveStudentWorkFailedValue;
