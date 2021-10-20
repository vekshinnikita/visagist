import { SERVER_URL } from "@/env";
import { axiosAPI } from "@/utils";
import { CourseDetails } from "@/types/models";

const getCoursesListUrl = () => SERVER_URL + "/api/admin/courses/";
const getCoursesDetailsUrl = (pk: number) =>
  SERVER_URL + `/api/admin/courses/${pk}/`;

export const getCoursesApi = () =>
  axiosAPI.get(getCoursesListUrl()).then((response) => response.data);
export const createCourseApi = (course: CourseDetails) =>
  axiosAPI.post(getCoursesListUrl(), course).then((response) => response.data);
export const getCurrentCourseApi = (pk: number) =>
  axiosAPI.get(getCoursesDetailsUrl(pk)).then((response) => response.data);
export const deleteCourseApi = (pk: number) =>
  axiosAPI.delete(getCoursesDetailsUrl(pk)).then((response) => response.data);
export const updateCourseApi = (pk: number, course: CourseDetails) =>
  axiosAPI
    .put(getCoursesDetailsUrl(pk), course)
    .then((response) => response.data);

export const hideCoursesApi = (ids: number[]) =>
  axiosAPI
    .post(getCoursesListUrl() + "hide/", { ids })
    .then((response) => response.data);
export const revealCoursesApi = (ids: number[]) =>
  axiosAPI
    .post(getCoursesListUrl() + "reveal/", { ids })
    .then((response) => response.data);
export const deleteCoursesApi = (ids: number[]) =>
  axiosAPI
    .post(getCoursesListUrl() + "delete/", { ids })
    .then((response) => response.data);
