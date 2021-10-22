import { ChangeEvent, FC, useEffect, useState } from "react";
import { Review as IReview } from "@/types/models";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface ReviewProps {
  review: IReview;
  index: number;
  deleteReview: () => void;
  updateReview: (review: IReview) => void;
}

export const Review: FC<ReviewProps> = ({
  review,
  index,
  updateReview,
  deleteReview,
}) => {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    setImage(review.image);
  }, [review]);

  const handleDeleteReview = () => {
    if (!window.confirm("Вы действительно хотите удалить этот отзыв?")) return;
    deleteReview();
  };

  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 0) {
        const image = e.target.files[0];
        const render = new FileReader();

        render.onload = (e) => {
          updateReview({
            ...review,
            image: e.target?.result,
          });
        };

        render.readAsDataURL(image);
      }
    }
  };

  return (
    <Draggable draggableId={`${review.id}`} index={index}>
      {(provided) => (
        <div
          className="review"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="image-field">
            <input type="file" onChange={loadImage} />
            <span
              className="loaded-image"
              style={{
                backgroundImage: `url(${image})`,
                zIndex: image ? 1 : "unset",
              }}
            ></span>
            <span
              className="delete-image"
              style={{ display: image ? "flex" : "none" }}
              onClick={() => setImage("")}
            >
              +
            </span>
            <label>Выберите изображение</label>
          </div>
          <div className="delete-action" onClick={handleDeleteReview}>
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      )}
    </Draggable>
  );
};

interface ReviewsProps {
  createReview: () => void;
}

const Reviews: FC<ReviewsProps> = ({ createReview, children }) => {
  return (
    <main className="reviews">
      <div className="add-review" onClick={createReview}>
        +
      </div>
      <div className="list">
        <Droppable droppableId="reviews" direction="horizontal">
          {(provided) => (
            <div
              className="inner-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </main>
  );
};

export default Reviews;
