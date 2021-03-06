import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import {
  deleteReview,
  getReviews,
  updateReview,
  createReview,
  moveReview,
} from "@/state/reviews";
import { selectReviews } from "@/selectors";
import { Review as IReview } from "@/types/models";
import { getIdForNewChild, getItemById, getPositionForNewChild } from "@/utils";
import Reviews, { Review } from "./Reviews";

const ReviewsContainer: FC = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(highlightPage(Pages.REVIEWS));
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(
      moveReview({
        ...getItemById(reviews, Number(draggableId)),
        position: Number(destination.index),
      })
    );
  };

  const handleCreateReview = () => {
    const review: IReview = {
      id: getIdForNewChild(reviews),
      image: "",
      position: getPositionForNewChild(reviews),
    };
    dispatch(createReview(review));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Reviews createReview={handleCreateReview}>
        {reviews.map((r, index) => (
          <Review
            review={r}
            index={index}
            updateReview={(review: IReview) => dispatch(updateReview(review))}
            key={r.id}
            deleteReview={() => dispatch(deleteReview(r.id))}
          />
        ))}
      </Reviews>
    </DragDropContext>
  );
};

export default ReviewsContainer;
