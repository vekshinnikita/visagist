import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getCurrentCourse, updateCourse } from "@/state/courses";
import { createWidget, moveWidget } from "@/state/widgets";
import { selectCurrentCourse } from "@/selectors";
import { getIdForNewChild } from "@/utils";
import { CourseDetails, Widget } from "@/types/models";
import EditCourseInfoNav from "./EditCourseInfoNav";
import WidgetsNav from "./WidgetsNav";
import Workspace, { WORKSPACE_DROPPABLE_ID } from "./Workspace";
import { getWidgetInitValue } from "./widgets";

const EditCourseContainer: FC = () => {
  const { pk } = useParams<{ pk: string }>();
  const course = useSelector(selectCurrentCourse);
  const dispatch = useDispatch();

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
        />
        <Workspace widgets={course.widgets} />
        <WidgetsNav />
      </DragDropContext>
    </main>
  );
};

export default EditCourseContainer;
