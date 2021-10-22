import * as constants from "./reviews.constants";
import * as types from "./reviews.types";

export const getReviews: types.GetReviews = () => ({
  type: constants.GET_REVIEWS,
});

export const getReviewsSuccess: types.GetReviewsSuccess = (reviews) => ({
  type: constants.GET_REVIEWS_SUCCESS,
  reviews,
});

export const getReviewsFailed: types.GetReviewsFailed = () => ({
  type: constants.GET_REVIEWS_FAILED,
});

export const updateReview: types.UpdateReview = (review) => ({
  type: constants.UPDATE_REVIEW,
  review,
});

export const updateReviewSuccess: types.UpdateReviewSuccess = (review) => ({
  type: constants.UPDATE_REVIEW_SUCCESS,
  review,
});

export const updateReviewFailed: types.UpdateReviewFailed = () => ({
  type: constants.UPDATE_REVIEW_FAILED,
});

export const createReview: types.CreateReview = (review) => ({
  type: constants.CREATE_REVIEW,
  review,
});

export const createReviewSuccess: types.CreateReviewSuccess = (review) => ({
  type: constants.CREATE_REVIEW_SUCCESS,
  review,
});

export const createReviewFailed: types.CreateReviewFailed = () => ({
  type: constants.CREATE_REVIEW_FAILED,
});

export const deleteReview: types.DeleteReview = (reviewId) => ({
  type: constants.DELETE_REVIEW,
  reviewId,
});

export const deleteReviewSuccess: types.DeleteReviewSuccess = (reviewId) => ({
  type: constants.DELETE_REVIEW_SUCCESS,
  reviewId,
});

export const deleteReviewFailed: types.DeleteReviewFailed = () => ({
  type: constants.DELETE_REVIEW_FAILED,
});
