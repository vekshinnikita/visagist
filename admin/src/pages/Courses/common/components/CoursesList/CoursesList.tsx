import { FC, useState } from "react";
import { Course } from "@/types/models";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCourses, hideCourses, revealCourses } from "@/state/courses";

interface CoursesListProps {
  courses: Course[];
}

interface Action {
  index: number;
  title: string;
  action: (ids: number[]) => void;
}

export const CoursesList: FC<CoursesListProps> = ({ courses }) => {
  const dispatch = useDispatch();

  const actions: Action[] = [
    {
      index: 1,
      title: "Скрыть",
      action: (ids) => dispatch(hideCourses(ids)),
    },
    {
      index: 2,
      title: "Сделать видимыми",
      action: (ids) => dispatch(revealCourses(ids)),
    },
    {
      index: 3,
      title: "Удалить",
      action: (ids) => dispatch(deleteCourses(ids)),
    },
  ];

  const [currentAction, setCurrentAction] = useState(actions[0]);
  const [isActionsVisible, setIsActionsVisible] = useState(false);
  const [selectedCoursesIds, setSelectedCoursesIds] = useState([] as number[]);

  const selectAction = (action: Action) => {
    setCurrentAction(action);
    setIsActionsVisible((prev) => !prev);
  };

  const isCourseInSelectedCourses = (course: Course) =>
    selectedCoursesIds.find((id) => id === course.id) !== undefined;

  const selectCourse = (course: Course) => {
    if (!isCourseInSelectedCourses(course))
      setSelectedCoursesIds((prev) => [...prev, course.id]);
    else setSelectedCoursesIds((prev) => prev.filter((id) => id !== course.id));
  };

  const submitAction = () => {
    currentAction.action(selectedCoursesIds);
    setSelectedCoursesIds([]);
  };

  return (
    <div className="courses-list-container">
      <div className="actions">
        <button className="button" onClick={submitAction}>
          Применить
        </button>
        <div className="select">
          <button
            className={
              "option option-current" +
              (isActionsVisible ? " option-current-active" : "")
            }
            onClick={() => setIsActionsVisible((prev) => !prev)}
          >
            {currentAction.title}
          </button>
          <div
            className={"options" + (isActionsVisible ? " options-active" : "")}
          >
            {actions.map((a) => {
              if (a.index !== currentAction.index)
                return (
                  <button
                    className="option"
                    onClick={() => selectAction(a)}
                    key={a.index}
                  >
                    {a.title}
                  </button>
                );
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="list">
        {courses.map((course, index) => (
          <div
            className={
              "course-item" +
              (course.is_visible ? "" : " course-item-invisible")
            }
            data-animation-delay={index / 10}
            key={course.id}
          >
            <Link to={`/course/${course.id}/`}>{course.title}</Link>
            <span
              className="radio"
              onClick={() => selectCourse(course)}
              style={{
                background: isCourseInSelectedCourses(course)
                  ? "var(--blue)"
                  : undefined,
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};
