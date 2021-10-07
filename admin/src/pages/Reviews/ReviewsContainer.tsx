import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import Reviews from "./Reviews";

const ReviewsContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightPage(Pages.REVIEWS));
  }, [dispatch]);

  return <Reviews />;
};

export default ReviewsContainer;
