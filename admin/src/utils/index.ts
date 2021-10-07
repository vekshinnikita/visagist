// import axios, { AxiosResponse, AxiosError } from "axios";
// import { SERVER_URL } from "@/env";
import axios from "axios";
import { Draggable, Widget } from "@/types/models";

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const axiosAPI = axios;

// export const axiosAPI = axios.create({
//   headers: {
//     Authorization: "Bearer " + getAccessToken(),
//   },
// });

// axiosAPI.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     const originalRequest = error.config;
//     const refreshUrl = SERVER_URL + "/api/auth/token/refresh/";

//     if (error.response) {
//       if (error.response.status === 401 && originalRequest.url === refreshUrl) {
//         window.location.href = "/sign_in/";
//         return Promise.reject(error);
//       }

//       if (
//         error.response.data.code === "token_not_valid" &&
//         error.response.status === 401 &&
//         error.response.statusText === "Unauthorized"
//       ) {
//         const refreshToken = getRefreshToken();

//         if (refreshToken) {
//           const tokenParts: { exp: number } = JSON.parse(
//             atob(refreshToken.split(".")[1])
//           );

//           const now: number = Math.ceil(Date.now() / 1000);

//           if (tokenParts.exp > now) {
//             return axiosAPI
//               .post(refreshUrl, { refresh: refreshToken })
//               .then((response: AxiosResponse) => {
//                 setNewHeaders(response);
//                 originalRequest.headers["Authorization"] =
//                   "Bearer " + response.data.access;

//                 return axiosAPI(originalRequest);
//               })
//               .catch((error: AxiosError) => {
//                 console.log(error);
//               });
//           } else {
//             console.log("Refresh token is expired", tokenParts.exp, now);
//             window.location.href = "/sign_in/";
//           }
//         } else {
//           console.log("Refresh token not available.");
//           window.location.href = "/sign_in/";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export const setNewHeaders = (response: AxiosResponse) => {
//   axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
//   localStorage.setItem("access_token", response.data.access);
//   localStorage.setItem("refresh_token", response.data.refresh);
// };

// export const removeHeaders = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
//   axiosAPI.defaults.headers["Authentication"] = undefined;
// };

export const getWidgetsListWithoutSpecificOne = (
  widgets: Widget[],
  widgetId: number
) => widgets.filter((w) => w.id !== widgetId);

export const getWidget = (widgets: Widget[], widgetId: number) => {
  const widget = widgets.find((w) => w.id === widgetId);

  if (widget) return widget;
  throw new Error("Widget not found");
};

const compareByDraggablePosition = (w1: Draggable, w2: Draggable) => {
  if (w1.position > w2.position) return 1;
  if (w1.position < w2.position) return -1;
  return 0;
};

export const sortDraggableByPosition = (draggable: Draggable[]): any =>
  draggable.sort(compareByDraggablePosition);
