import { SERVER_URL } from "@/env";
import axios from "axios";

const getCoursesListUrl = () => SERVER_URL + "/api/courses/";
const getCoursesDetailsUrl = (pk: number) => SERVER_URL + `/api/courses/${pk}/`;

export const getCoursesApi = () =>
  axios.get(getCoursesListUrl()).then((response) => response.data);

export const getCourseDetailApi = (pk: number) =>
  axios.get(getCoursesDetailsUrl(pk)).then((response) => response.data);
