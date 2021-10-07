import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentCourse, updateCourse } from "@/state/courses";
import { selectCurrentCourse } from "@/selectors";
import { CourseDetails } from "@/types/models";
import EditCourseInfoNav from "./EditCourseInfoNav";
import { WidgetContainer } from "./WidgetContainer/WidgetContainer";
import WidgetsNav from "./WidgetsNav";
import Workspace from "./Workspace";

const EditCourseContainer: FC = () => {
  const { pk } = useParams<{ pk: string }>();
  const course = useSelector(selectCurrentCourse);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentCourse(Number(pk)));
  }, [dispatch, pk]);

  return (
    <main className="edit-course">
      <EditCourseInfoNav
        course={course}
        updateCourse={(course: CourseDetails) => dispatch(updateCourse(course))}
      />
      <Workspace>
        {course.widgets?.map((w) => (
          <WidgetContainer widget={w} key={w.id} />
        ))}
      </Workspace>
      <WidgetsNav />
    </main>
  );
};

export default EditCourseContainer;
