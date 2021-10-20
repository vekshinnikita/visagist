import React, { FC , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchCourses } from '@/state/courses/courses.actions'
import { selectCourses } from '@/selectors'
import { Link } from "react-router-dom";
import { Course } from "@/typing/models";

interface ProgramProps {
  course: Course
}

const Program: FC<ProgramProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <div className="course-card"
      style={{ backgroundImage: `url(${course.image})` }}>
        <h2>{course.title}</h2>
      </div>
    </Link>
  );
};

const VisagisteCourse: FC = () => {
  const dispatch = useDispatch()
   
  useEffect(() => {
      dispatch(featchCourses())
  }, [])
  const courses = useSelector(selectCourses);

  return (
    <section className="visagiste-course">
      <div className="title after">
        <h2>КУРСЫ ОБУЧЕНИЯ ДЛЯ ВИЗАЖИСТОВ</h2>
      </div>
      <div className="programs">
      {courses.map(course => <Program course={course} key={course.id}/>)}
      </div>
    </section>
  );
};

export default VisagisteCourse;
