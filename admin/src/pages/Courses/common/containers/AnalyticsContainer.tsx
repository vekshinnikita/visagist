import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CoursesSections } from "@/types/enumerates";
import { highlightCourseSection } from "@/state/components";
import Analytics from "../components/Analytics";

const AnalyticsContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightCourseSection(CoursesSections.ANALYTICS));
  }, [dispatch]);

  return <Analytics />;
};

export default AnalyticsContainer;
