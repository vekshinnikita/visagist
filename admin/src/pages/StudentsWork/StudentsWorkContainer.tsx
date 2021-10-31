import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import {
  deleteStudentWork,
  getStudentsWork,
  updateStudentWork,
  createStudentWork,
  moveStudentWork,
} from "@/state/studentsWork";
import { selectStudentsWork } from "@/selectors";
import { StudentWork as IStudentWork } from "@/types/models";
import { getIdForNewChild, getItemById, getPositionForNewChild } from "@/utils";
import StudentsWork, { StudentWork } from "./StudentsWork";

const StudentsWorkContainer: FC = () => {
  const dispatch = useDispatch();
  const studentsWork = useSelector(selectStudentsWork);

  useEffect(() => {
    dispatch(getStudentsWork());
    dispatch(highlightPage(Pages.STUDENTS_WORK));
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
      moveStudentWork({
        ...getItemById(studentsWork, Number(draggableId)),
        position: Number(destination.index),
      })
    );
  };

  const handleCreateReview = () => {
    const studentWork: IStudentWork = {
      id: getIdForNewChild(studentsWork),
      image: "",
      position: getPositionForNewChild(studentsWork),
    };
    dispatch(createStudentWork(studentWork));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StudentsWork createStudentWork={handleCreateReview}>
        {studentsWork.map((w, index) => (
          <StudentWork
            studentWork={w}
            index={index}
            updateStudentWork={(studentWork: IStudentWork) =>
              dispatch(updateStudentWork(studentWork))
            }
            key={w.id}
            deleteStudentWork={() => dispatch(deleteStudentWork(w.id))}
          />
        ))}
      </StudentsWork>
    </DragDropContext>
  );
};

export default StudentsWorkContainer;
