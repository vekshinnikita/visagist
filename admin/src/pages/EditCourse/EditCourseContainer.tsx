import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { deleteCourse, getCurrentCourse, updateCourse } from "@/state/courses";
import { createWidget, moveWidget } from "@/state/widgets";
import { selectCurrentCourse } from "@/selectors";
import { getIdForNewChild } from "@/utils";
import { CourseDetails, Widget } from "@/types/models";
import EditCourseInfoNav from "./EditCourseInfoNav";
import WidgetsNav from "./WidgetsNav";
import Workspace, { WORKSPACE_DROPPABLE_ID } from "./Workspace";
import { getWidgetInitValue } from "./widgets";
import Preview from "./Preview";

const EditCourseContainer: FC = () => {
  const { pk } = useParams<{ pk: string }>();
  const course = useSelector(selectCurrentCourse);
  const dispatch = useDispatch();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    dispatch(getCurrentCourse(Number(pk)));
  }, [dispatch, pk]);

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

    if (source.droppableId === WORKSPACE_DROPPABLE_ID) {
      dispatch(moveWidget(Number(draggableId), Number(destination.index)));
    } else {
      const widgetInitValue: Widget = {
        id: getIdForNewChild(course.widgets),
        is_visible: true,
        position: Number(destination.index),
        ...getWidgetInitValue(draggableId),
      };
      dispatch(createWidget(widgetInitValue));
    }
  };

  return (
    <main className="edit-course">
      <DragDropContext onDragEnd={onDragEnd}>
        <EditCourseInfoNav
          course={course}
          updateCourse={(course: CourseDetails) =>
            dispatch(updateCourse(course))
          }
          deleteCourse={(courseId: number) => dispatch(deleteCourse(courseId))}
        />
        <Workspace widgets={course.widgets} />
        <Preview
          isPreviewOpen={isPreviewOpen}
          close={() => setIsPreviewOpen(false)}
          open={() => setIsPreviewOpen(true)}
        />
        <WidgetsNav />
      </DragDropContext>
    </main>
  );
};

export default EditCourseContainer;
