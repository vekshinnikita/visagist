import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import Courses from "./Courses";

const CoursesContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightPage(Pages.COURSES));
  }, [dispatch]);

  return <Courses />;
};

export default CoursesContainer;
