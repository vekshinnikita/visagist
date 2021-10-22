import { SERVER_URL } from "@/env";
import { Review } from "@/types/models";
import { axiosAPI } from "@/utils";

const getReviewsListUrl = () => SERVER_URL + "/api/admin/reviews/";
const getReviewsDetailsUrl = (pk: number) =>
  SERVER_URL + `/api/admin/reviews/${pk}/`;

export const getReviewsApi = () =>
  axiosAPI.get(getReviewsListUrl()).then((response) => response.data);

export const updateReviewApi = (review: Review) =>
  axiosAPI
    .put(getReviewsDetailsUrl(review.id), review)
    .then((response) => response.data);

export const createReviewApi = (review: Review) =>
  axiosAPI.post(getReviewsListUrl(), review).then((response) => response.data);

export const deleteReviewApi = (reviewId: number) =>
  axiosAPI
    .delete(getReviewsDetailsUrl(reviewId))
    .then((response) => response.data);
