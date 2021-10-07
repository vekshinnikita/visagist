import { ChangeEvent, FC, useState } from "react";
import { useInput } from "@/hooks";
import { CourseDetails } from "@/types/models";
import ImageField from "@/common/components/ImageField";

interface CreateCourseFormProps {
  createCourse: (course: CourseDetails) => void;
}

export const CreateCourseForm: FC<CreateCourseFormProps> = ({
  createCourse,
}) => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput();
  const {
    value: position,
    bind: bindPosition,
    reset: resetPosition,
  } = useInput();
  const [isVisible, setIsVisible] = useState(true);
  const [loadedImage, setLoadedImage] = useState<any>("");

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const course: CourseDetails = {
      title,
      position: Number(position),
      is_visible: isVisible,
      image: loadedImage,
      widgets: [],
      id: 0,
    };
    createCourse(course);

    resetPosition();
    resetTitle();
    setLoadedImage("");
  };

  return (
    <div className="create-course">
      <h2>Создать курс</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="base-input"
          placeholder="Название"
          required
          {...bindTitle}
        />
        <input
          type="number"
          className="base-input"
          placeholder="Позиция"
          required
          {...bindPosition}
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
        <ImageField value={loadedImage} setValue={setLoadedImage} />
        <button type="submit" className="button">
          Создать
        </button>
      </form>
    </div>
  );
};
