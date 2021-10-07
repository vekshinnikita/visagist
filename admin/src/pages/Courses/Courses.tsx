import { FC } from "react";
import { Switch, Route } from "react-router";
import CoursesNavbar from "./common/components/CoursesNavbar";
import AnalyticsContainer from "./common/containers/AnalyticsContainer";
import CoursesListContainer from "./common/containers/CoursesListContainer";
import TimetableContainer from "./common/containers/TimetableContainer";

const Courses: FC = () => {
  return (
    <main className="courses">
      <CoursesNavbar />
      <Switch>
        <Route path="/courses/" exact component={CoursesListContainer} />
        <Route
          path="/courses/timetable/"
          exact
          component={TimetableContainer}
        />
        <Route
          path="/courses/analytics/"
          exact
          component={AnalyticsContainer}
        />
      </Switch>
    </main>
  );
};

export default Courses;
