import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CoursesSections } from "@/types/enumerates";
import { highlightCourseSection } from "@/state/components";
import Timetable from "../components/Timetable";

const TimetableContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightCourseSection(CoursesSections.TIMETABLE));
  }, [dispatch]);

  return <Timetable />;
};

export default TimetableContainer;
