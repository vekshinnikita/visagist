import { StudentWork } from "@/types/models";
import { api } from "@/utils";

const getStudentsWorkListUrl = () => "/admin/students_work/";
const getStudentsWorkDetailsUrl = (pk: number) => `/admin/students_work/${pk}/`;

export const getStudentsWorkApi = () =>
  api.get(getStudentsWorkListUrl()).then((response) => response.data);

export const updateStudentWorkApi = (studentWork: StudentWork) =>
  api
    .put(getStudentsWorkDetailsUrl(studentWork.id), studentWork)
    .then((response) => response.data);

export const createStudentWorkApi = (studentWork: StudentWork) =>
  api
    .post(getStudentsWorkListUrl(), studentWork)
    .then((response) => response.data);

export const deleteStudentWorkApi = (studentWorkId: number) =>
  api
    .delete(getStudentsWorkDetailsUrl(studentWorkId))
    .then((response) => response.data);
