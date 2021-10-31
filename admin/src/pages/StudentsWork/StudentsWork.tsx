import { ChangeEvent, FC, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { StudentWork as IStudentWork } from "@/types/models";

interface StudentWorkProps {
  studentWork: IStudentWork;
  index: number;
  deleteStudentWork: () => void;
  updateStudentWork: (studentWork: IStudentWork) => void;
}

export const StudentWork: FC<StudentWorkProps> = ({
  studentWork,
  index,
  deleteStudentWork,
  updateStudentWork,
}) => {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    setImage(studentWork.image);
  }, [studentWork]);

  const handleDeleteReview = () => {
    if (!window.confirm("Вы действительно хотите удалить эту работу студента?"))
      return;
    deleteStudentWork();
  };

  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 0) {
        const image = e.target.files[0];
        const render = new FileReader();

        render.onload = (e) => {
          updateStudentWork({
            ...studentWork,
            image: e.target?.result,
          });
        };

        render.readAsDataURL(image);
      }
    }
  };

  return (
    <Draggable draggableId={`${studentWork.id}`} index={index}>
      {(provided) => (
        <div
          className="student-work"
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

interface StudentsWorkProps {
  createStudentWork: () => void;
}

const StudentsWork: FC<StudentsWorkProps> = ({
  createStudentWork,
  children,
}) => {
  return (
    <main className="students-work">
      <div className="add-student-work" onClick={createStudentWork}>
        +
      </div>
      <div className="list">
        <Droppable droppableId="students-work" direction="horizontal">
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

export default StudentsWork;
