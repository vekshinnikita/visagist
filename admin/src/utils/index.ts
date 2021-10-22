import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "@/env";
import { Draggable } from "@/types/models";

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const axiosAPI = axios.create({
  headers: {
    Authorization: "Bearer " + getAccessToken(),
  },
});

axiosAPI.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const originalRequest = error.config;
    const refreshUrl = SERVER_URL + "/token/refresh/";

    if (error.response) {
      if (error.response.status === 401 && originalRequest.url === refreshUrl) {
        window.location.href = "/sign_in/";
        return Promise.reject(error);
      }

      if (
        error.response.data.code === "token_not_valid" &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          const tokenParts: { exp: number } = JSON.parse(
            atob(refreshToken.split(".")[1])
          );

          const now: number = Math.ceil(Date.now() / 1000);

          if (tokenParts.exp > now) {
            return axiosAPI
              .post(refreshUrl, { refresh: refreshToken })
              .then((response: AxiosResponse) => {
                setNewHeaders(response);
                originalRequest.headers["Authorization"] =
                  "Bearer " + response.data.access;

                return axiosAPI(originalRequest);
              })
              .catch((error: AxiosError) => {
                console.log(error);
              });
          } else {
            console.log("Refresh token is expired", tokenParts.exp, now);
            window.location.href = "/sign_in/";
          }
        } else {
          console.log("Refresh token not available.");
          window.location.href = "/sign_in/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export const setNewHeaders = (response: AxiosResponse) => {
  axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
};

export const removeHeaders = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axiosAPI.defaults.headers["Authentication"] = undefined;
};

export const getItemsListWithoutSpecificOne = (
  items: { id: number }[],
  itemId: number
): any => items.filter((i) => i.id !== itemId);

export const getItemById = (items: { id: number }[], itemId: number): any => {
  const item = items.find((i) => i.id === itemId);

  if (item) return item;
  throw new Error("Widget not found");
};

const compareByDraggablePosition = (d1: Draggable, d2: Draggable) => {
  if (d1.position > d2.position) return 1;
  if (d1.position < d2.position) return -1;
  return 0;
};

export const sortDraggableByPosition = (draggable: Draggable[]): any =>
  draggable.sort(compareByDraggablePosition);

export const checkDateTimeFormat = (hms: number) =>
  String(hms).length === 1 ? "0" + hms : hms;

export const stringifyDate = (date: Date) => {
  // y-m-dTh:m:s+08:00
  // 2021-10-12T03:47:00+08:00
  const year = checkDateTimeFormat(date.getFullYear());
  const month = checkDateTimeFormat(date.getMonth() + 1);
  const day = checkDateTimeFormat(date.getDate());
  const hours = checkDateTimeFormat(date.getHours());
  const minutes = checkDateTimeFormat(date.getMinutes());
  const seconds = checkDateTimeFormat(date.getSeconds());
  let timezone = `${checkDateTimeFormat(
    -(new Date().getTimezoneOffset() / 60)
  )}:00`;
  timezone = timezone.startsWith("-") ? timezone : "+" + timezone;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
};

export const getPositionForNewChild = (items: Draggable[]) =>
  Math.max(...items.map((i) => i.position), 0) + 1;

export const getIdForNewChild = (items: { id: number }[]) =>
  Math.max(...items.map((i) => i.id), 0) + 1;

export const getFixedDraggableSequence = (
  draggableItems: Draggable[],
  oldPosition: number,
  newPosition: number
) => {
  let moved;
  if (newPosition < oldPosition) {
    moved = draggableItems.filter(
      (d) => d.position >= newPosition && d.position < oldPosition
    );
    moved.map((d) => d.position++);
  } else if (newPosition > oldPosition) {
    moved = draggableItems.filter(
      (d) => d.position <= newPosition && d.position > oldPosition
    );
    moved.map((w) => w.position--);
  } else {
    return draggableItems;
  }

  return moved;
};
