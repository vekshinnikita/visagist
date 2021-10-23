import { Review } from "@/types/models";
import * as constants from "./reviews.constants";

export type GetReviewsValue = {
  type: typeof constants.GET_REVIEWS;
};

export type GetReviewsSuccessValue = {
  type: typeof constants.GET_REVIEWS_SUCCESS;
  reviews: Review[];
};

export type GetReviewsFailedValue = {
  type: typeof constants.GET_REVIEWS_FAILED;
};

export type GetReviews = () => GetReviewsValue;
export type GetReviewsSuccess = (reviews: Review[]) => GetReviewsSuccessValue;
export type GetReviewsFailed = () => GetReviewsFailedValue;

export type UpdateReviewValue = {
  type: typeof constants.UPDATE_REVIEW;
  review: Review;
};

export type UpdateReviewSuccessValue = {
  type: typeof constants.UPDATE_REVIEW_SUCCESS;
  review: Review;
};

export type UpdateReviewFailedValue = {
  type: typeof constants.UPDATE_REVIEW_FAILED;
};

export type UpdateReview = (review: Review) => UpdateReviewValue;
export type UpdateReviewSuccess = (review: Review) => UpdateReviewSuccessValue;
export type UpdateReviewFailed = () => UpdateReviewFailedValue;

export type CreateReviewValue = {
  type: typeof constants.CREATE_REVIEW;
  review: Review;
};

export type CreateReviewSuccessValue = {
  type: typeof constants.CREATE_REVIEW_SUCCESS;
  review: Review;
};

export type CreateReviewFailedValue = {
  type: typeof constants.CREATE_REVIEW_FAILED;
};

export type CreateReview = (review: Review) => CreateReviewValue;
export type CreateReviewSuccess = (review: Review) => CreateReviewSuccessValue;
export type CreateReviewFailed = () => CreateReviewFailedValue;

export type DeleteReviewValue = {
  type: typeof constants.DELETE_REVIEW;
  reviewId: number;
};

export type DeleteReviewSuccessValue = {
  type: typeof constants.DELETE_REVIEW_SUCCESS;
  reviewId: number;
};

export type DeleteReviewFailedValue = {
  type: typeof constants.DELETE_REVIEW_FAILED;
};

export type DeleteReview = (reviewId: number) => DeleteReviewValue;
export type DeleteReviewSuccess = (
  reviewId: number
) => DeleteReviewSuccessValue;
export type DeleteReviewFailed = () => DeleteReviewFailedValue;

export type MoveReviewValue = {
  type: typeof constants.MOVE_REVIEW;
  review: Review;
};

export type MoveReviewSuccessValue = {
  type: typeof constants.MOVE_REVIEW_SUCCESS;
  review: Review;
};

export type MoveReviewFailedValue = {
  type: typeof constants.MOVE_REVIEW_FAILED;
};

export type MoveReview = (review: Review) => MoveReviewValue;
export type MoveReviewSuccess = (review: Review) => MoveReviewSuccessValue;
export type MoveReviewFailed = () => MoveReviewFailedValue;

export type ActionsReturnValues =
  | GetReviewsValue
  | GetReviewsSuccessValue
  | GetReviewsFailedValue
  | UpdateReviewValue
  | UpdateReviewSuccessValue
  | UpdateReviewFailedValue
  | CreateReviewValue
  | CreateReviewSuccessValue
  | CreateReviewFailedValue
  | DeleteReviewValue
  | DeleteReviewSuccessValue
  | DeleteReviewFailedValue
  | MoveReviewValue
  | MoveReviewSuccessValue
  | MoveReviewFailedValue;
