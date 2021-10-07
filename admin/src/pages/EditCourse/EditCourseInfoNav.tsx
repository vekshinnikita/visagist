import { ChangeEvent, FC, useEffect, useState } from "react";
import { CourseDetails } from "@/types/models";
import ImageField from "@/common/components/ImageField";

interface EditCourseInfoNavProps {
  course: CourseDetails;
  updateCourse: (course: CourseDetails) => void;
}

const EditCourseInfoNav: FC<EditCourseInfoNavProps> = ({
  course,
  updateCourse,
}) => {
  const [title, setTitle] = useState(course.title);
  const [position, setPosition] = useState(course.position);
  const [isVisible, setIsVisible] = useState(course.is_visible);
  const [courseImage, setCourseImage] = useState<any>("");

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCourse: CourseDetails = {
      title,
      position: Number(position),
      is_visible: isVisible,
      image: courseImage,
      widgets: course.widgets,
      id: course.id,
    };
    updateCourse(updatedCourse);
  };

  useEffect(() => {
    setTitle(course.title);
    setPosition(course.position);
    setIsVisible(course.is_visible);
    if (course.image) setCourseImage("data:image/jpeg;base64," + course.image);
  }, [course]);

  return (
    <div className="edit-course-info-nav">
      <h3>Редактировать курс</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="base-input"
          placeholder="Название"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="base-input"
          placeholder="Позиция"
          value={position || ""}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
        <div
          className="is-visible"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          <h4>Показывать</h4>
          <span
            className="radio"
            style={{ background: isVisible ? "var(--blue)" : undefined }}
          ></span>
        </div>
        <ImageField value={courseImage} setValue={setCourseImage} />

        <button type="submit" className="button">
          Сохранить
        </button>
        <button type="button" className="button button-red">
          Удалить
        </button>
      </form>
    </div>
  );
};

export default EditCourseInfoNav;
