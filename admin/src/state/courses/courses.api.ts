import { api } from "@/utils";
import { CourseDetails } from "@/types/models";

const getCoursesListUrl = () => "/admin/courses/";
const getCoursesDetailsUrl = (pk: number) => `/admin/courses/${pk}/`;

export const getCoursesApi = () =>
  api.get(getCoursesListUrl()).then((response) => response.data);
export const createCourseApi = (course: CourseDetails) =>
  api.post(getCoursesListUrl(), course).then((response) => response.data);
export const getCurrentCourseApi = (pk: number) =>
  api.get(getCoursesDetailsUrl(pk)).then((response) => response.data);
export const deleteCourseApi = (pk: number) =>
  api.delete(getCoursesDetailsUrl(pk)).then((response) => response.data);
export const updateCourseApi = (pk: number, course: CourseDetails) =>
  api.put(getCoursesDetailsUrl(pk), course).then((response) => response.data);

export const hideCoursesApi = (ids: number[]) =>
  api
    .post(getCoursesListUrl() + "hide/", { ids })
    .then((response) => response.data);
export const revealCoursesApi = (ids: number[]) =>
  api
    .post(getCoursesListUrl() + "reveal/", { ids })
    .then((response) => response.data);
export const deleteCoursesApi = (ids: number[]) =>
  api
    .post(getCoursesListUrl() + "delete/", { ids })
    .then((response) => response.data);
