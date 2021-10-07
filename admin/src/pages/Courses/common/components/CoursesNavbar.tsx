import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { CoursesSections } from "@/types/enumerates";
import { useSelector } from "react-redux";
import { selectCurrentCoursesSection } from "@/selectors";

interface HighlightedCourseNavLinkProps extends LinkProps {
  section: CoursesSections;
}

const HighlightedCourseLink: FC<HighlightedCourseNavLinkProps> = ({
  section,
  children,
  ...rest
}) => {
  const currentCoursesSection = useSelector(selectCurrentCoursesSection);

  return (
    <Link
      className={
        currentCoursesSection === section ? "active-courses-section" : undefined
      }
      {...rest}
    >
      {children}
    </Link>
  );
};

const CoursesNavbar: FC = () => {
  return (
    <div className="courses-tabs">
      <HighlightedCourseLink
        to="/courses/"
        section={CoursesSections.COURSES_LIST}
      >
        Список Курсов
      </HighlightedCourseLink>
      <HighlightedCourseLink
        to="/courses/timetable/"
        section={CoursesSections.TIMETABLE}
      >
        Расписание
      </HighlightedCourseLink>
      <HighlightedCourseLink
        to="/courses/analytics/"
        section={CoursesSections.ANALYTICS}
      >
        Аналитика
      </HighlightedCourseLink>
    </div>
  );
};

export default CoursesNavbar;
