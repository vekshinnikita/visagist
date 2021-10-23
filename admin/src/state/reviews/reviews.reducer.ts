import { ReviewsState } from "@/types";
import * as types from "./reviews.types";
import * as constants from "./reviews.constants";
import {
  getFixedDraggableSequence,
  getItemById,
  getItemsListWithoutSpecificOne,
  sortDraggableByPosition,
} from "@/utils";
import { Review } from "@/types/models";

const initialState: ReviewsState = {
  reviews: [],
  isGetReviewsLoading: false,
  isCreateReviewLoading: false,
  isDeleteReviewLoading: false,
  isUpdateReviewLoading: false,
  isMoveReviewLoading: false,
};

const reviewsReducer = (
  state = initialState,
  action: types.ActionsReturnValues
): ReviewsState => {
  switch (action.type) {
    case constants.GET_REVIEWS:
      return {
        ...state,
        isGetReviewsLoading: true,
      };
    case constants.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.reviews,
        isGetReviewsLoading: false,
      };
    case constants.GET_REVIEWS_FAILED:
      return {
        ...state,
        isGetReviewsLoading: false,
      };
    case constants.CREATE_REVIEW:
      return {
        ...state,
        isCreateReviewLoading: true,
      };
    case constants.CREATE_REVIEW_SUCCESS:
      state.reviews.map((r) => r.position++);

      return {
        ...state,
        reviews: [action.review, ...state.reviews],
        isCreateReviewLoading: false,
      };
    case constants.CREATE_REVIEW_FAILED:
      return {
        ...state,
        isCreateReviewLoading: false,
      };
    case constants.MOVE_REVIEW:
      try {
        const reviews: Review[] = getItemsListWithoutSpecificOne(
          state.reviews,
          action.review.id
        );
        const oldReview: Review = getItemById(state.reviews, action.review.id);

        if (oldReview.position === action.review.position) return state;

        const moved: any = getFixedDraggableSequence(
          state.reviews,
          oldReview.position,
          action.review.position
        );

        const others = reviews.filter(
          (r) => !moved.map((m: { id: number }) => m.id).includes(r.id)
        );

        return {
          ...state,
          reviews: sortDraggableByPosition([
            ...moved,
            ...others,
            action.review,
          ]),
          isUpdateReviewLoading: true,
        };
      } catch {
        return state;
      }
    case constants.MOVE_REVIEW_SUCCESS:
      return {
        ...state,
        isUpdateReviewLoading: false,
      };
    case constants.MOVE_REVIEW_FAILED:
      return {
        ...state,
        isUpdateReviewLoading: false,
      };
    case constants.UPDATE_REVIEW:
      return {
        ...state,
        isMoveReviewLoading: true,
      };
    case constants.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [
          ...state.reviews.filter((r) => r.id !== action.review.id),
          action.review,
        ],
        isMoveReviewLoading: false,
      };
    case constants.UPDATE_REVIEW_FAILED:
      return {
        ...state,
        isMoveReviewLoading: false,
      };
    case constants.DELETE_REVIEW:
      return {
        ...state,
        isDeleteReviewLoading: true,
      };
    case constants.DELETE_REVIEW_SUCCESS:
      try {
        const deletedReview: Review = getItemById(
          state.reviews,
          action.reviewId
        );
        const movedReviews = state.reviews.filter(
          (r) => r.id !== action.reviewId
        );

        const prevReviews = movedReviews.filter(
          (w) => w.position < deletedReview.position
        );
        const nextReviews = movedReviews.filter(
          (w) => w.position >= deletedReview.position
        );

        nextReviews.map((w) => w.position--);

        return {
          ...state,
          reviews: [...prevReviews, ...nextReviews],
          isDeleteReviewLoading: false,
        };
      } catch {
        return state;
      }
    case constants.DELETE_REVIEW_FAILED:
      return {
        ...state,
        isDeleteReviewLoading: false,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
