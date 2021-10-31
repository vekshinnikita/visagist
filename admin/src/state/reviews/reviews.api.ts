import { Review } from "@/types/models";
import { api } from "@/utils";

const getReviewsListUrl = () => "/admin/reviews/";
const getReviewsDetailsUrl = (pk: number) => `/admin/reviews/${pk}/`;

export const getReviewsApi = () =>
  api.get(getReviewsListUrl()).then((response) => response.data);

export const updateReviewApi = (review: Review) =>
  api
    .put(getReviewsDetailsUrl(review.id), review)
    .then((response) => response.data);

export const createReviewApi = (review: Review) =>
  api.post(getReviewsListUrl(), review).then((response) => response.data);

export const deleteReviewApi = (reviewId: number) =>
  api.delete(getReviewsDetailsUrl(reviewId)).then((response) => response.data);
