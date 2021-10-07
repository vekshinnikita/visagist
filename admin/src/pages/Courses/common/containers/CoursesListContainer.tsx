import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { highlightCourseSection } from "@/state/components";
import { createCourse, getCourses } from "@/state/courses";
import { CoursesSections } from "@/types/enumerates";
import { CoursesList } from "../components/CoursesList/CoursesList";
import { selectCourses } from "@/selectors";
import { CourseDetails } from "@/types/models";
import { CreateCourseForm } from "../components/CoursesList/CreateCourseForm";

const CoursesListContainer: FC = () => {
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses);

  useEffect(() => {
    dispatch(highlightCourseSection(CoursesSections.COURSES_LIST));
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <section className="courses-list">
      <CreateCourseForm
        createCourse={(course: CourseDetails) => dispatch(createCourse(course))}
      />
      <CoursesList courses={courses} />
    </section>
  );
};

export default CoursesListContainer;
