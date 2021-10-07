import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import StudentsWork from "./StudentsWork";

const StudentsWorkContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightPage(Pages.STUDENTS_WORK));
  }, [dispatch]);

  return <StudentsWork />;
};

export default StudentsWorkContainer;
